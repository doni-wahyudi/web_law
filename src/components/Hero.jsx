import heroImg from '../assets/hero.png';
import heroImg2 from '../assets/hero_2.jpeg';
import heroImg3 from '../assets/hero_3.jpeg';
import { FaWhatsapp } from 'react-icons/fa';
import { heroStats, siteConfig } from '../data/content';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            Punya Masalah<br />
            <span className="hero__title-accent">Hukum?</span>
          </h1>
          <h2 className="hero__subtitle">Cerita Aja Dulu</h2>
          <p className="hero__desc">
            Konsultasikan permasalahan hukum Anda dengan tim advokat profesional kami. 
            Kami siap membantu memberikan solusi terbaik untuk Anda.
          </p>

          <div className="hero__stats">
            {heroStats.map((stat, index) => (
              <div key={index} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/6281368936945?text=${encodeURIComponent('Halo TanyaAdvokat, saya ingin berkonsultasi mengenai masalah hukum saya.')}`}
            className="hero__cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
            Konsultasi Via Chat
          </a>
        </div>

        <div className="hero__image-container">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            className="hero__slider"
          >
            <SwiperSlide>
              <img src={heroImg} alt="Tim TanyaAdvokat" className="hero__main-img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={heroImg2} alt="Tim TanyaAdvokat" className="hero__main-img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={heroImg3} alt="Tim TanyaAdvokat" className="hero__main-img" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>


      {/* Decorative elements */}
      <div className="hero__decoration hero__decoration--1"></div>
      <div className="hero__decoration hero__decoration--2"></div>
    </section>
  );
}

export default Hero;
