import heroImg from '../assets/hero.png';
import { FaWhatsapp } from 'react-icons/fa';
import { heroStats, siteConfig } from '../data/content';
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
            href={siteConfig.whatsappLink}
            className="hero__cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
            Konsultasi Via Chat
          </a>
        </div>

        <div className="hero__image-container">
          <img src={heroImg} alt="Tim TanyaAdvokat" className="hero__main-img" />
        </div>
      </div>


      {/* Decorative elements */}
      <div className="hero__decoration hero__decoration--1"></div>
      <div className="hero__decoration hero__decoration--2"></div>
    </section>
  );
}

export default Hero;
