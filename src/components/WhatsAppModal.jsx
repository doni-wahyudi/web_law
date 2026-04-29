import React, { useState, useEffect } from 'react';
import { FaTimes, FaWhatsapp } from 'react-icons/fa';
import './WhatsAppModal.css';

function WhatsAppModal({ isOpen, onClose, defaultKeperluan }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    keperluan: defaultKeperluan || 'Konsultasi Hukum',
    description: ''
  });

  useEffect(() => {
    if (defaultKeperluan) {
      setFormData(prev => ({ ...prev, keperluan: defaultKeperluan }));
    }
  }, [defaultKeperluan, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Mohon lengkapi nama dan nomor telepon Anda.');
      return;
    }

    const message = `Halo TanyaAdvokat, saya ${formData.name}.
No. Telp: ${formData.phone}.
Keperluan: ${formData.keperluan}.
${formData.description ? `Catatan Tambahan: ${formData.description}` : ''}`;

    const waLink = `https://wa.me/6281368936945?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
    onClose();
  };

  return (
    <div className="wa-modal-overlay" onClick={onClose}>
      <div className="wa-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="wa-modal-close" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        
        <div className="wa-modal-header">
          <div className="wa-modal-icon">
            <FaWhatsapp />
          </div>
          <h3>Formulir Konsultasi</h3>
          <p>Silakan lengkapi data Anda sebelum diarahkan ke WhatsApp kami.</p>
        </div>

        <form className="wa-modal-form" onSubmit={handleSubmit}>
          <div className="wa-form-group">
            <label htmlFor="wa-name">Nama Lengkap*</label>
            <input
              id="wa-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div className="wa-form-group">
            <label htmlFor="wa-phone">Nomor WhatsApp*</label>
            <input
              id="wa-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Contoh: 08123456789"
              required
            />
          </div>

          <div className="wa-form-group">
            <label htmlFor="wa-keperluan">Keperluan</label>
            <input
              id="wa-keperluan"
              type="text"
              name="keperluan"
              value={formData.keperluan}
              onChange={handleChange}
              placeholder="Keperluan konsultasi"
              required
            />
          </div>

          <div className="wa-form-group">
            <label htmlFor="wa-desc">Deskripsi Singkat (Opsional)</label>
            <textarea
              id="wa-desc"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ceritakan gambaran singkat masalah hukum Anda..."
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="wa-modal-submit">
            <FaWhatsapp /> Hubungi via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

export default WhatsAppModal;
