import logo from '../assets/tanyaadvokat.id_logo.png';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaMoneyBillWave, FaUserTie, FaLightbulb, FaFolder, FaGavel } from 'react-icons/fa';
import { navLinks } from '../data/content';
import './Header.css';

const getIcon = (label) => {
  switch (label.toLowerCase()) {
    case 'beranda': return <FaHome className="nav-icon" />;
    case 'biaya layanan': return <FaMoneyBillWave className="nav-icon" />;
    case 'profile advokat': return <FaUserTie className="nav-icon" />;
    case 'tips advokat': return <FaLightbulb className="nav-icon" />;
    case 'dokumentasi': return <FaFolder className="nav-icon" />;
    case 'bantuan hukum': return <FaGavel className="nav-icon" />;
    default: return null;
  }
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          <img src={logo} alt="TanyaAdvokat Logo" className="header__logo-img" />
          <span className="header__logo-text">
            Tanya<span className="header__logo-accent">Advokat</span>
          </span>
        </Link>

        <nav className={`header__nav ${isOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`header__link ${location.pathname === link.path ? 'header__link--active' : ''}`}
            >
              {getIcon(link.label)}
              <span>{link.label}</span>
            </Link>
          ))}

          <a
            href="https://wa.me/6281368936945"
            className="header__cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Konsultasi Sekarang
          </a>
        </nav>

        <button
          className="header__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}

export default Header;
