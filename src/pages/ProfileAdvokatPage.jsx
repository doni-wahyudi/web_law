import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLinkedin, FaWhatsapp, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { teamMembers as staticMembers } from '../data/content';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import WhatsAppModal from '../components/WhatsAppModal';
import { CardSkeleton } from '../components/Skeleton/Skeleton';
import './ProfileAdvokat.css';

function ProfileAdvokatPage() {
  const [profiles, setProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeperluan, setSelectedKeperluan] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setProfiles(data);
        } else {
          setProfiles(staticMembers);
        }
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setProfiles(staticMembers);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleContactClick = (name) => {
    setSelectedKeperluan(`Konsultasi dengan ${name}`);
    setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Daftar Mitra Advokat Profesional | TanyaAdvokat.id</title>
        <meta name="description" content="Kenali tim mitra advokat profesional kami yang siap membantu menyelesaikan berbagai permasalahan hukum Anda dengan keahlian lintas bidang." />
      </Helmet>
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <h1>Mitra Advokat</h1>
          <p>Kenali lebih dekat tim mitra advokat profesional kami</p>
        </div>
      </section>

      {/* Profiles */}
      <section className="profiles">
        <div className="container">
          <div className="profiles__grid">
            {loading ? (
              Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)
            ) : (
              profiles.map((profile, index) => (
                <div key={profile.id || index} className="profiles__card">
                  <div className="profiles__photo">
                    {profile.image_url || profile.image ? (
                      <img src={profile.image_url || profile.image} alt={profile.name} className="profiles__img" loading="lazy" />
                    ) : (
                      <div className="profiles__photo-placeholder">
                        <div className="profiles__silhouette">
                          <div className="profiles__sil-head"></div>
                          <div className="profiles__sil-body"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="profiles__content">
                    <h3 className="profiles__name">{profile.name}</h3>
                    <span className="profiles__role-badge">{profile.role}</span>
                    <p className="profiles__bio">{profile.bio_summary || profile.about || profile.bio}</p>
                    <div className="profiles__details">
                      <div className="profiles__detail">
                        <span className="profiles__detail-label">Spesialisasi</span>
                        <span className="profiles__detail-value">{profile.expertise?.slice(0, 5).join(', ') || profile.role}</span>
                      </div>
                      <div className="profiles__detail">
                        <span className="profiles__detail-label">Pendidikan</span>
                        <span className="profiles__detail-value">{profile.education || 'S1 Ilmu Hukum'}</span>
                      </div>
                      <div className="profiles__detail">
                        <span className="profiles__detail-label">Pengalaman</span>
                        <span className="profiles__detail-value">{profile.experience}</span>
                      </div>
                    </div>
                    <div className="profiles__actions">
                      <Link to={`/advokat/${profile.id}`} className="profiles__link profiles__link--profile"><FaUser /> Lihat Profil</Link>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); handleContactClick(profile.name); }}
                        className="profiles__link profiles__link--whatsapp"
                      >
                        <FaWhatsapp /> WhatsApp
                      </a>
                      {profile.socials?.linkedin && profile.socials.linkedin !== '#' && (
                        <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="profiles__link profiles__link--linkedin"><FaLinkedin /> LinkedIn</a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultKeperluan={selectedKeperluan} 
      />
    </>
  );
}

export default ProfileAdvokatPage;
