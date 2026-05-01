import React, { useState } from 'react';
import { FaFileContract, FaStore, FaIdCard, FaSearchPlus, FaGavel, FaHandsHelping, FaFolderPlus } from 'react-icons/fa';
import WhatsAppModal from '../components/WhatsAppModal';
import bannerImg from '../assets/bantuan_hukum_hero.png';
import './UmkmGo.css';

const services = [
  {
    title: 'Pembentukan Surat Perjanjian',
    desc: 'Pembuatan naskah perjanjian hukum yang mengikat dan sah.',
    icon: <FaFileContract className="product-icon" />,
    text: 'Halo TanyaAdvokat, saya ingin berkonsultasi mengenai Pembuatan Surat Perjanjian.'
  },
  {
    title: 'Pembentukan PT UMKM',
    desc: 'Pendirian PT Perorangan atau Umum khusus pelaku UMKM.',
    icon: <FaStore className="product-icon" />,
    text: 'Halo TanyaAdvokat, saya ingin menanyakan syarat dan proses Pembentukan PT UMKM.'
  },
  {
    title: 'Pembuatan Surat Kuasa',
    desc: 'Pemberian kuasa hukum formal untuk keperluan legalitas.',
    icon: <FaIdCard className="product-icon" />,
    text: 'Halo TanyaAdvokat, saya memerlukan bantuan untuk Pembuatan Surat Kuasa.'
  },
  {
    title: 'Analisis Konsultasi Hukum',
    desc: 'Bedah kasus mendalam dan solusi mitigasi sengketa.',
    icon: <FaSearchPlus className="product-icon" />,
    text: 'Halo TanyaAdvokat, saya butuh Analisis dan Konsultasi Hukum untuk kasus saya.'
  },
  {
    title: 'Pembuatan Legal Opinion',
    desc: 'Pendapat hukum komprehensif tertulis dari advokat.',
    icon: <FaGavel className="product-icon" />,
    text: 'Halo TanyaAdvokat, saya ingin mengajukan Pembuatan Legal Opinion resmi.'
  },
  {
    title: 'Bantuan Hukum Probono',
    desc: 'Layanan advokasi tanpa biaya bagi masyarakat rentan.',
    icon: <FaHandsHelping className="product-icon" />,
    text: 'Halo TanyaAdvokat, saya ingin mengajukan permohonan Bantuan Hukum Probono (Gratis).'
  },
  {
    title: 'Bantuan Hukum Lainnya',
    desc: 'Pendampingan urusan legalitas administratif lainnya.',
    icon: <FaFolderPlus className="product-icon" />,
    text: 'Halo TanyaAdvokat, saya butuh Bantuan Hukum terkait permasalahan lainnya.',
    isCentered: true
  }
];

function UmkmGoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeperluan, setSelectedKeperluan] = useState('');

  const handleCtaClick = (keperluan) => {
    setSelectedKeperluan(keperluan);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Banner */}
      <section className="bantuan-banner">
        <div className="container assistance-inner">
          <div className="bantuan-banner__content">
            <h1 className="narration">tanya advokat hadir untuk anda dalam meringankan permasalahan hukum</h1>
            <p className="explanation">
               butuh bantuan hukum lebih detail terkait pembentukan pt umkm dan berkas bantuan hukum lainnya? konsultasikan segera secara cepat, mudah, dan terjangkau
            </p>
            <button
              onClick={() => handleCtaClick('Bantuan Hukum')}
              className="bantuan-banner__cta"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Konsultasi Gratis
            </button>
          </div>
          <div className="bantuan-banner__image-wrapper">
            <img src={bannerImg} alt="Bantuan Hukum" className="bantuan-banner__img" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bantuan-services">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Layanan Bantuan Hukum</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '40px' }}>
            Pilihan solusi tepat dalam menangani segala kebutuhan hukum Anda
          </p>

          <div className="bantuan-services__grid">
            {services.map((service, index) => {
              return (
                <div
                  key={index}
                  className={`bantuan-services__card ${service.isCentered ? 'card--centered' : ''}`}
                >
                  <div className="bantuan-services__left">
                    {service.icon}
                  </div>
                  <div className="bantuan-services__right">
                    <h3 className="bantuan-services__title">{service.title}</h3>
                    <p className="bantuan-services__desc">{service.desc}</p>
                    <button
                      onClick={() => handleCtaClick(service.title)}
                      className="bantuan-services__btn"
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      Ajukan Sekarang
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultKeperluan={selectedKeperluan} 
      />
    </>
  );
}

export default UmkmGoPage;
