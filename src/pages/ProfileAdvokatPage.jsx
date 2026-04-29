import React, { useState } from 'react';
import { FaEnvelope, FaLinkedin, FaWhatsapp, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { teamMembers } from '../data/content';
import WhatsAppModal from '../components/WhatsAppModal';
import './ProfileAdvokat.css';

const extendedProfiles = teamMembers.map((member) => {
  return {
    ...member,
    education: member.education || 'S1 Ilmu Hukum',
    license: 'Terverifikasi PERADI',
    bio: member.about
  };
});


function ProfileAdvokatPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeperluan, setSelectedKeperluan] = useState('');

  const handleContactClick = (name) => {
    setSelectedKeperluan(`Konsultasi dengan ${name}`);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <h1>Profile Advokat</h1>
          <p>Kenali lebih dekat tim advokat profesional kami</p>
        </div>
      </section>

      {/* Profiles */}
      <section className="profiles">
        <div className="container">
          <div className="profiles__grid">
            {extendedProfiles.map((profile, index) => (
              <div key={index} className="profiles__card">
                <div className="profiles__photo">
                  {profile.image ? (
                    <img src={profile.image} alt={profile.name} className="profiles__img" />
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
                  <p className="profiles__bio">{profile.bio}</p>
                  <div className="profiles__details">
                    <div className="profiles__detail">
                      <span className="profiles__detail-label">Spesialisasi</span>
                      <span className="profiles__detail-value">{profile.specialty || profile.role}</span>

                    </div>
                    <div className="profiles__detail">
                      <span className="profiles__detail-label">Pendidikan</span>
                      <span className="profiles__detail-value">{profile.education}</span>
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
                    {profile.socials.linkedin && profile.socials.linkedin !== '#' && (
                      <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="profiles__link profiles__link--linkedin"><FaLinkedin /> LinkedIn</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
