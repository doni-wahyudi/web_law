import logo from '../assets/tanyaadvokat.id_logo.png';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaMoneyBillWave, FaUserTie, FaLightbulb, FaFolder, FaGavel, FaBook } from 'react-icons/fa';
import { navLinks, pricingPlans, teamMembers, services } from '../data/content';
import WhatsAppModal from './WhatsAppModal';
import './Header.css';

const getIcon = (label) => {
  switch (label.toLowerCase()) {
    case 'beranda': return <FaHome className="nav-icon" />;
    case 'biaya layanan': return <FaMoneyBillWave className="nav-icon" />;
    case 'profile advokat': return <FaUserTie className="nav-icon" />;
    case 'tips advokat': return <FaLightbulb className="nav-icon" />;
    case 'dokumentasi': return <FaFolder className="nav-icon" />;
    case 'bantuan hukum': return <FaGavel className="nav-icon" />;
    case 'peraturan hukum': return <FaBook className="nav-icon" />;
    default: return null;
  }
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeperluan, setSelectedKeperluan] = useState('');

  const handleSubmenuClick = (e, planTitle) => {
    e.preventDefault();
    setSelectedKeperluan(`Paket ${planTitle}`);
    setIsModalOpen(true);
  };

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
          {navLinks.map((link) => {
            if (link.label.toLowerCase() === 'biaya layanan') {
              return (
                <div key={link.path} className={`header__link-wrapper ${location.pathname === link.path ? 'header__link--active' : ''}`}>
                  <Link
                    to={link.path}
                    className="header__link"
                  >
                    {getIcon(link.label)}
                    <span>{link.label}</span>
                  </Link>
                  <div className="header__submenu">
                    {pricingPlans.map((plan, i) => (
                      <a
                        key={i}
                        href="#"
                        onClick={(e) => handleSubmenuClick(e, plan.title)}
                        className="header__submenu-link"
                      >
                        {plan.title}
                      </a>
                    ))}
                  </div>
                </div>
              );
            }

            if (link.label.toLowerCase() === 'profile advokat') {
              return (
                <div key={link.path} className={`header__link-wrapper ${location.pathname.startsWith('/advokat') || location.pathname === link.path ? 'header__link--active' : ''}`}>
                  <Link
                    to={link.path}
                    className="header__link"
                  >
                    {getIcon(link.label)}
                    <span>{link.label}</span>
                  </Link>
                  <div className="header__submenu">
                    {teamMembers.map((member, i) => (
                      <a
                        key={i}
                        href="#"
                        onClick={(e) => handleSubmenuClick(e, `Konsultasi dengan ${member.name}`)}
                        className="header__submenu-link"
                      >
                        {member.name}
                      </a>
                    ))}
                  </div>
                </div>
              );
            }

            if (link.label.toLowerCase() === 'bantuan hukum') {
              return (
                <div key={link.path} className={`header__link-wrapper ${location.pathname === link.path ? 'header__link--active' : ''}`}>
                  <Link
                    to={link.path}
                    className="header__link"
                  >
                    {getIcon(link.label)}
                    <span>{link.label}</span>
                  </Link>
                  <div className="header__submenu">
                    {services.map((service, i) => (
                      <a
                        key={i}
                        href="#"
                        onClick={(e) => handleSubmenuClick(e, service.title)}
                        className="header__submenu-link"
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`header__link ${location.pathname === link.path ? 'header__link--active' : ''}`}
              >
                {getIcon(link.label)}
                <span>{link.label}</span>
              </Link>
            );
          })}

        </nav>

        <button
          className="header__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultKeperluan={selectedKeperluan} 
      />
    </header>
  );
}

export default Header;
