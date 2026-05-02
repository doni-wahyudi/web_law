import logo from '../assets/tanyaadvokat.id_logo.png';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaMoneyBillWave, FaUserTie, FaLightbulb, FaFolder, FaGavel, FaBook } from 'react-icons/fa';
import { navLinks, pricingPlans, teamMembers } from '../data/content';
import WhatsAppModal from './WhatsAppModal';
import './Header.css';

const getIcon = (label) => {
  switch (label.toLowerCase()) {
    case 'beranda': return <FaHome className="nav-icon" />;
    case 'biaya layanan': return <FaMoneyBillWave className="nav-icon" />;
    case 'mitra advokat': return <FaUserTie className="nav-icon" />;
    case 'tips advokat': return <FaLightbulb className="nav-icon" />;
    case 'dokumentasi kegiatan hukum': return <FaFolder className="nav-icon" />;
    case 'bantuan hukum': return <FaGavel className="nav-icon" />;
    case 'peraturan perundang-undangan': return <FaBook className="nav-icon" />;
    case 'tentang advokat': return <FaBook className="nav-icon" />;
    case 'layanan advokat': return <FaGavel className="nav-icon" />;
    case 'layanan kami': return <FaShieldAlt className="nav-icon" />;
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
    setSelectedKeperluan(planTitle.startsWith('Konsultasi') ? planTitle : `Paket ${planTitle}`);
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
            Tanya<span className="header__logo-accent">Advokat.id</span>
          </span>
        </Link>

        <nav className={`header__nav ${isOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map((link) => {
            const hasSubmenu = !!(link.subLinks || link.dynamicSub);
            const isActive = location.pathname === link.path || 
              (link.subLinks && link.subLinks.some(sub => location.pathname === sub.path)) ||
              (link.dynamicSub === 'teamMembers' && location.pathname.startsWith('/advokat')) ||
              (link.label === 'Layanan Advokat' && ['/layanan-kami', '/umkm-go', '/peraturan-hukum', '/dokumentasi'].includes(location.pathname));

            if (hasSubmenu) {
              return (
                <div key={link.label} className={`header__link-wrapper ${isActive ? 'header__link--active' : ''}`}>
                  {link.path === '#' ? (
                    <div className="header__link">
                      {getIcon(link.label)}
                      <span>{link.label}</span>
                    </div>
                  ) : (
                    <Link to={link.path} className="header__link">
                      {getIcon(link.label)}
                      <span>{link.label}</span>
                    </Link>
                  )}
                  <div className="header__submenu">
                    {link.subLinks && link.subLinks.map((sub) => (
                      <Link key={sub.path} to={sub.path} className="header__submenu-link">{sub.label}</Link>
                    ))}
                    {link.dynamicSub === 'teamMembers' && teamMembers.map((member, i) => (
                      <Link 
                        key={i} 
                        to={`/advokat/${member.id}`} 
                        className="header__submenu-link"
                      >
                        {member.name}
                      </Link>
                    ))}
                    {link.dynamicSub === 'pricingPlans' && pricingPlans.map((plan, i) => (
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

      {/* Backdrop Overlay for Mobile */}
      <div 
        className={`header__overlay ${isOpen ? 'header__overlay--open' : ''}`} 
        onClick={() => setIsOpen(false)}
      ></div>

      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultKeperluan={selectedKeperluan} 
      />
    </header>
  );
};

export default Header;
