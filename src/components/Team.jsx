import React, { useState } from 'react';
import { FaLinkedinIn, FaWhatsapp, FaMapMarkerAlt, FaBalanceScale, FaBriefcase, FaBullseye, FaCheck } from 'react-icons/fa';
import { teamMembers } from '../data/content';
import WhatsAppModal from './WhatsAppModal';
import './Team.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeperluan, setSelectedKeperluan] = useState('');

  const handleContactClick = (name) => {
    setSelectedKeperluan(`Konsultasi dengan ${name}`);
    setIsModalOpen(true);
  };

  return (
    <section className="team" id="team">
      <div className="container team__container">
        <div className="team__left">
          <h2 className="section-title team__title">Tim Mitra <span style={{ color: 'var(--color-accent)' }}>TanyaAdvokat.id</span></h2>
          <div className="team__intro-box">
            <p className="team__intro-text">
              Tim <span style={{ color: 'var(--color-accent)' }}>Mitra Advokat</span> kami didukung oleh tim <strong>profesional hukum berpengalaman</strong> dengan spesialisasi lintas bidang yang mampu menangani berbagai <strong>kompleksitas permasalahan hukum</strong>. 
            </p>
            <p className="team__intro-text">
              Dengan pendekatan yang <strong>profesional, responsif, dan berbasis analisis mendalam</strong>, kami berdedikasi untuk menghadirkan pelayanan terbaik serta menumbuhkan <strong>kepercayaan yang kokoh</strong> dan berkelanjutan bersama setiap klien.
            </p>
          </div>
        </div>

        <div className="team__right">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="team__slider"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="team__card">
                  <div className="team__photo">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="team__img" 
                        style={{ objectPosition: member.objectPosition || 'center center' }}
                      />
                    ) : (
                      <div className="team__photo-placeholder">
                        <div className="team__silhouette">
                          <div className="team__silhouette-head"></div>
                          <div className="team__silhouette-body"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="team__info">
                    <h3 className="team__name">{member.name}</h3>
                    <span className="team__role">{member.role}</span>
                    
                    <div className="team__socials">
                      <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="team__social-icon" aria-label="LinkedIn">
                        <FaLinkedinIn />
                      </a>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); handleContactClick(member.name); }}
                        className="team__social-icon"
                        aria-label="WhatsApp"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>

                    <div className="team__details">
                      <div className="team__meta">
                        <div className="team__meta-item">
                          <FaMapMarkerAlt className="team__meta-icon" />
                          <span>{member.location}</span>
                        </div>
                        <div className="team__meta-item">
                          <FaBalanceScale className="team__meta-icon" />
                          <span>{member.organization}</span>
                        </div>
                        <div className="team__meta-item">
                          <FaBriefcase className="team__meta-icon" />
                          <span>{member.experience}</span>
                        </div>
                      </div>

                      <div className="team__expertise">
                        <div className="team__section-title">
                          <FaBullseye className="team__section-icon" />
                          <span>Bidang Keahlian:</span>
                        </div>
                        <ul className="team__expertise-list">
                          {member.expertise.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="team__expertise-item">
                              <FaCheck className="team__check-icon" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultKeperluan={selectedKeperluan} 
      />
    </section>
  );
}

export default Team;
