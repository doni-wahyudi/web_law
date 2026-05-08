import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import modalBg from '../assets/welcome_modal_bg.png';
import WhatsAppModal from './WhatsAppModal';
import './Welcome.css'; // We'll share some styles but add modal specific ones

function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWAModalOpen, setIsWAModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setIsOpen(false);

  const handleStartConsultation = () => {
    setIsOpen(false);
    setIsWAModalOpen(true);
  };

  return (
    <>
      {isOpen && (
        <div className="welcome-modal-overlay" onClick={closeModal}>
          <div className="welcome-modal-container" onClick={e => e.stopPropagation()}>
            <button className="welcome-modal-close" onClick={closeModal} aria-label="Close">
              <FaTimes />
            </button>
            
            <div className="welcome-modal-banner">
              <img src={modalBg} alt="Welcome" />
              <div className="welcome-modal-banner-overlay"></div>
            </div>

            <div className="welcome-modal-content">
              <div className="welcome-modal-header">
                <span className="welcome-modal-tag">Official Welcome</span>
                <h2 className="welcome__title">Selamat Datang di <span className="welcome__brand">TanyaAdvokat.id</span></h2>
                <div className="welcome__line"></div>
              </div>
              
              <div className="welcome-modal-body">
                <p className="welcome__text">
                  Solusi hukum <strong>modern dan terpercaya</strong> dalam genggaman Anda. Kami hadir untuk menjembatani 
                  kebutuhan masyarakat akan <strong>keadilan</strong> dengan layanan konsultasi hukum yang <strong>transparan, profesional, dan mudah diakses</strong>.
                </p>
                <p className="welcome__text">
                  Mari berdiskusi dan temukan <strong>solusi hukum yang tepat</strong> bersama mitra advokat berpengalaman kami.
                </p>
              </div>

              <div className="welcome-modal-footer">
                <button className="welcome-modal-btn" onClick={handleStartConsultation}>
                  Mulai Konsultasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <WhatsAppModal 
        isOpen={isWAModalOpen} 
        onClose={() => setIsWAModalOpen(false)} 
        defaultKeperluan="Konsultasi Hukum" 
      />
    </>
  );
}

export default WelcomeModal;
