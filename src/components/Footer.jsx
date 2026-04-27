import logo from '../assets/tanyaadvokat.id_logo.png';
import { FaInstagram, FaTiktok, FaFacebookF, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { siteConfig, navLinks } from '../data/content';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        {/* Column 1: Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <img src={logo} alt="TanyaAdvokat Logo" className="footer__logo-img" />
            <span className="footer__logo-text">
              Tanya<span className="footer__logo-accent">Advokat</span>
            </span>
          </div>


          <p className="footer__desc">
            Platform konsultasi hukum online terpercaya di Indonesia.
            Solusi hukum profesional untuk semua kebutuhan Anda.
          </p>
          <div className="footer__socials">
            <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href={siteConfig.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Column 2: Contact */}
        <div className="footer__col">
          <h4 className="footer__heading">Kontak Kami</h4>
          <ul className="footer__contact-list">
            <li>
              <FaMapMarkerAlt />
              <span>{siteConfig.address}</span>
            </li>
            <li>
              <FaWhatsapp />
              <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <FaEnvelope />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Navigation */}
        <div className="footer__col">
          <h4 className="footer__heading">Navigasi</h4>
          <ul className="footer__nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {siteConfig.company}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
