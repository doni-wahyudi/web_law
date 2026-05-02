import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaIdCard, FaBalanceScale, FaArrowLeft } from 'react-icons/fa';
import { teamMembers as staticMembers } from '../data/content';
import { supabase } from '../lib/supabase';
import WhatsAppModal from '../components/WhatsAppModal';
import './ProfileDetailPage.css';

function ProfileDetailPage() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        // Try UUID first
        let { data, error } = await supabase
          .from('team_members')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error || !data) {
          // If not found by UUID, maybe it's static data? 
          // We'll search in static data as fallback
          const staticMatch = staticMembers.find(m => m.id.toString() === id);
          if (staticMatch) {
            setMember(staticMatch);
          }
        } else {
          setMember(data);
        }
      } catch (err) {
        console.error('Error fetching member:', err);
        const staticMatch = staticMembers.find(m => m.id.toString() === id);
        setMember(staticMatch);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) return <div style={{ padding: '100px 0', textAlign: 'center' }}>Loading...</div>;

  if (!member) {
    return (
      <section className="profile-detail profile-detail--not-found">
        <div className="container">
          <h2>Profil Tidak Ditemukan</h2>
          <p>Maaf, profil advokat yang Anda cari tidak tersedia.</p>
          <Link to="/profil-advokat" className="profile-detail__back-btn">
            <FaArrowLeft /> Kembali ke Daftar Mitra Advokat
          </Link>
        </div>
      </section>
    );
  }

  const education = member.education || 'S1 Ilmu Hukum';

  return (
    <>
      <section className="profile-detail-header">
        <div className="container">
          <Link to="/profil-advokat" className="profile-detail__back-link">
            <FaArrowLeft /> Kembali ke Daftar Advokat
          </Link>
        </div>
      </section>

      <section className="profile-detail-content">
        <div className="container profile-detail__container">
          <div className="profile-detail__left">
            <div className="profile-detail__image-wrapper">
              {member.image_url || member.image ? (
                <img 
                  src={member.image_url || member.image} 
                  alt={member.name} 
                  style={{ objectPosition: member.objectPosition || 'center top' }}
                />
              ) : (
                <div className="profile-detail__placeholder">📸</div>
              )}
            </div>
            
            <div className="profile-detail__actions">
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="btn btn-primary-solid"
                style={{ border: 'none', width: '100%', cursor: 'pointer' }}
              >
                Konsultasi Sekarang
              </button>
            </div>
          </div>

          <div className="profile-detail__right">
            <span className="profile-detail__badge">{member.role}</span>
            <h1 className="profile-detail__name">{member.name}</h1>
            
            <div className="profile-detail__quick-info">
              <div className="quick-info-item">
                <FaMapMarkerAlt /> <span>{member.location}</span>
              </div>
              <div className="quick-info-item">
                <FaBalanceScale /> <span>{member.organization || 'Peradi'}</span>
              </div>
              <div className="quick-info-item">
                <FaBriefcase /> <span>{member.experience}</span>
              </div>
              <div className="quick-info-item">
                <FaGraduationCap /> <span>{education}</span>
              </div>
            </div>

            <div className="profile-detail__section">
              <h3 className="section-title-small">Tentang Konsultasi Hukum</h3>
              {member.detailed_bio && member.detailed_bio.length > 0 ? (
                member.detailed_bio.map((para, index) => (
                  <p key={index} className="profile-detail__text">{para}</p>
                ))
              ) : (
                <p className="profile-detail__text">{member.about}</p>
              )}
            </div>

            <div className="profile-detail__section">
              <h3 className="section-title-small">Bidang Keahlian & Spesialisasi</h3>
              <div className="profile-detail__expertise-grid">
                {member.expertise && member.expertise.map((exp, idx) => (
                  <div key={idx} className="expertise-tag">{exp}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultKeperluan={`Konsultasi dengan ${member.name}`} 
      />
    </>
  );
}

export default ProfileDetailPage;
