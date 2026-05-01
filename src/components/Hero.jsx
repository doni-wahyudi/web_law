// import heroImg1 from '../assets/hero/hero.png';
import heroImg2 from '../assets/hero/hero_2.png';
import heroImg3 from '../assets/hero/hero_3.png';
import heroImg4 from '../assets/hero/hero_4.png';
import heroImg5 from '../assets/hero/hero_5.png';
import { useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { heroStats } from '../data/content';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import WhatsAppModal from './WhatsAppModal';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Hero.css';

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        >
          {/* <SwiperSlide>
            <div className="hero__bg-img" style={{ backgroundImage: `url(${heroImg1})` }}></div>
          </SwiperSlide> */}
          <SwiperSlide>
            <div className="hero__bg-img" style={{ backgroundImage: `url(${heroImg2})` }}></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero__bg-img" style={{ backgroundImage: `url(${heroImg3})` }}></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero__bg-img" style={{ backgroundImage: `url(${heroImg4})` }}></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero__bg-img" style={{ backgroundImage: `url(${heroImg5})` }}></div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="hero__content">
        <div className="container hero__content-inner">
          <span className="hero__tagline">Punya Masalah Hukum?</span>
          <h1 className="hero__title">
            Cerita <span className="hero__title-italic">Aja</span> Dulu!
          </h1>
          <p className="hero__desc">
            Konsultasikan <strong>permasalahan hukum Anda</strong> dengan tim mitra advokat profesional kami.
            Kami siap membantu memberikan <strong>solusi terbaik dan terpercaya</strong> untuk Anda.
          </p>

          <div className="hero__stats">
            {heroStats.map((stat, index) => (
              <div key={index} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setIsModalOpen(true)} className="hero__cta">
            Konsultasi Sekarang
            <span className="hero__cta-glow"></span>
          </button>
        </div>
      </div>

      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultKeperluan="Konsultasi Hukum" 
      />

      {/* Decorative elements */}
      <div className="hero__decoration hero__decoration--1"></div>
      <div className="hero__decoration hero__decoration--2"></div>
    </section>
  );
}

export default Hero;
