import heroImg2 from '../assets/hero/hero_2.png';
import heroImg3 from '../assets/hero/hero_3.png';
import heroImg4 from '../assets/hero/hero_4.png';
import heroImg5 from '../assets/hero/hero_5.png';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import WhatsAppModal from './WhatsAppModal';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Hero.css';
import { teamMembers } from '../data/content';
import { FaPhoneAlt, FaClock, FaArrowRight, FaCheckCircle, FaBalanceScale } from 'react-icons/fa';

function Hero() {
  const [slides, setSlides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);


  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data, error } = await supabase
          .from('hero_slides')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setSlides(data);
        }
      } catch (err) {
        console.error('Error fetching hero slides:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const defaultImages = [heroImg2, heroImg3, heroImg4, heroImg5];

  // Team members for the hero list – use their actual role from data
  const heroTeam = teamMembers.slice(0, 4);

  return (
    <section className="hero" id="hero">
      {/* Background Slider */}
      <div className="hero__background">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="hero__bg-slider"
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
        >
          {slides.length > 0 ? (
            slides.map((slide, index) => (
              <SwiperSlide key={slide.id || index}>
                <div className="hero__bg-img" style={{ backgroundImage: `url(${slide.image_url})` }}></div>
              </SwiperSlide>
            ))
          ) : (
            defaultImages.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="hero__bg-img" style={{ backgroundImage: `url(${img})` }}></div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>

      <div className="hero__content">
        <div className="hero__tagline-wrapper">
          <FaBalanceScale className="hero__tagline-icon" />
          <span className="hero__tagline">Punya Masalah Hukum?</span>
        </div>

        <h1 className="hero__title">
          Cerita <span className="hero__title-italic">Aja</span> Dulu!
        </h1>

        <p className="hero__desc">
          Di tanyaadvokat.id, 1000+ klien telah mempercayakan konsultasi online bersama tim advokat senior kami.
        </p>

        <div className="hero__response-pill">
          <FaClock className="hero__response-icon" />
          <span>Estimasi respons profesional dalam 5 menit.</span>
        </div>

        <div className="hero__team-list">
          {heroTeam.map((member) => (
            <div
              key={member.id}
              className="hero__team-item"
            >
              <div className="hero__team-avatar">
                <img src={member.image} alt={member.name} style={{ objectPosition: member.objectPosition }} />
              </div>
              <div className="hero__team-info">
                <h4 className="hero__team-name">{member.name}</h4>
                <span className="hero__team-role">{member.role}</span>
                <span className="hero__team-org">{member.organization}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="hero__actions">
          <button onClick={() => setIsModalOpen(true)} className="hero__cta-primary">
            MULAI KONSULTASI <FaArrowRight className="hero__cta-icon" />
          </button>
          <a href="/biaya-layanan" className="hero__cta-secondary">
            LIHAT SKEMA BIAYA
          </a>
        </div>
      </div>

      {/* Hero Stats Bar */}
      <div className="hero__stats-bar">
        <div className="container hero__stats-inner">
          <div className="hero__stat-item">
            <span className="hero__stat-number">8+</span>
            <span className="hero__stat-text">TAHUN PENGALAMAN</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat-item">
            <span className="hero__stat-number">250+</span>
            <span className="hero__stat-text">KLIEN NASIONAL & MULTINASIONAL</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat-item">
            <span className="hero__stat-number">1000+</span>
            <span className="hero__stat-text">LAYANAN LEGAL</span>
          </div>
        </div>
      </div>

      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultKeperluan="Konsultasi Hukum" 
      />
    </section>
  );
}

export default Hero;
