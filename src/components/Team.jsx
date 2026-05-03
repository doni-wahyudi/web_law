import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaWhatsapp, FaMapMarkerAlt, FaBalanceScale, FaBriefcase, FaBullseye, FaCheck } from 'react-icons/fa';
import { teamMembers as staticMembers } from '../data/content';
import { supabase } from '../lib/supabase';
import WhatsAppModal from './WhatsAppModal';
import './Team.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


function Team() {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeperluan, setSelectedKeperluan] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const swiperRef = useRef(null);


  const pauseSlider = () => swiperRef.current?.autoplay?.stop();
  const resumeSlider = () => swiperRef.current?.autoplay?.start();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          setMembers(data);
        } else {
          // Fallback to static data if DB is empty
          setMembers(staticMembers);
        }
      } catch (err) {
        console.error('Error fetching team members:', err);
        setMembers(staticMembers);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleContactClick = (name) => {
    setSelectedKeperluan(`Konsultasi dengan ${name}`);
    setIsModalOpen(true);
  };

  return (
    <section className="team" id="team">
      <div className="container team__container">
        <div className="team__left">
          <div className="team__subtitle-wrapper">
            <div className="team__subtitle-line"></div>
            <span className="team__subtitle">Anggota Tim</span>
          </div>
          <h2 className="team__title">MITRA TANYAADVOKAT.ID</h2>

          <div className="team__intro-box">
            <p className="team__intro-text">
              Tim <span className="team__highlight">Mitra Advokat</span> kami didukung oleh tim <strong>profesional hukum berpengalaman</strong> dengan spesialisasi lintas bidang yang mampu menangani berbagai <strong>kompleksitas permasalahan hukum</strong>.
            </p>
            <p className="team__intro-text">
              Dengan pendekatan yang <strong>profesional, responsif, dan berbasis analisis mendalam</strong>, kami berdedikasi untuk menghadirkan pelayanan terbaik serta menumbuhkan <strong>kepercayaan yang kokoh</strong> dan berkelanjutan bersama setiap klien.
            </p>
          </div>

          <Link to="/profile-advokat" className="team__btn-more">Lihat lainnya</Link>
        </div>

        <div className="team__right">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1.2}
            loop={false}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 2.2 },
            }}
            className="team__slider"
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
          >
            {members.map((member, index) => (
              <SwiperSlide key={member.id || index}>
                <div
                  className="team__card"
                  onMouseEnter={pauseSlider}
                  onMouseLeave={resumeSlider}
                >
                  <div className="team__photo">
                    {member.image_url || member.image ? (
                      <img
                        src={member.image_url || member.image}
                        alt={member.name}
                        className="team__img"
                        loading="lazy"
                        style={{ objectPosition: member.objectPosition || 'center center' }}
                      />
                    ) : (
                      <div className="team__photo-placeholder"></div>
                    )}
                  </div>
                  <div className="team__info">
                    <h3 className="team__name">{member.name}</h3>
                    <span className="team__role">{member.role}</span>

                    <div className="team__details">
                      <div className="team__socials">
                        <a href={member.socials?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="team__social-icon" aria-label="LinkedIn">
                          <FaLinkedinIn />
                        </a>
                        <a
                          href="#"
                          onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleContactClick(member.name); }}
                          className="team__social-icon"
                          aria-label="WhatsApp"
                        >
                          <FaWhatsapp />
                        </a>
                      </div>
                      <div className="team__meta">
                        <div className="team__meta-item">
                          <FaMapMarkerAlt className="team__meta-icon" />
                          <span>{member.location}</span>
                        </div>
                        <div className="team__meta-item">
                          <FaBalanceScale className="team__meta-icon" />
                          <span>{member.perhimpunan || member.organization || 'Peradi'}</span>
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
                          {member.expertise?.slice(0, 5).map((item, idx) => (
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
