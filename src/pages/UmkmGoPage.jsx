import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { layananKamiServices } from '../data/content';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import WhatsAppModal from '../components/WhatsAppModal';
import Skeleton from '../components/Skeleton/Skeleton';
import bannerImg from '../assets/bantuan_hukum_hero.webp';
import './UmkmGo.css';

const iconMap = {
  'shield': <FaIcons.FaShieldAlt className="product-icon" />,
  'building': <FaIcons.FaBuilding className="product-icon" />,
  'file-text': <FaIcons.FaFileAlt className="product-icon" />,
  'map': <FaIcons.FaMapMarkedAlt className="product-icon" />,
  'scroll': <FaIcons.FaScroll className="product-icon" />,
  'users': <FaIcons.FaUsers className="product-icon" />,
  'heart-crack': <FaIcons.FaHeartBroken className="product-icon" />,
  'FaFileContract': <FaIcons.FaFileContract className="product-icon" />,
  'FaStore': <FaIcons.FaStore className="product-icon" />,
  'FaIdCard': <FaIcons.FaIdCard className="product-icon" />,
  'FaSearchPlus': <FaIcons.FaSearchPlus className="product-icon" />,
  'FaGavel': <FaIcons.FaGavel className="product-icon" />,
  'FaHandsHelping': <FaIcons.FaHandsHelping className="product-icon" />,
  'FaFolderPlus': <FaIcons.FaFolderPlus className="product-icon" />
};

function UmkmGoPage() {
  const [serviceList, setServiceList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeperluan, setSelectedKeperluan] = useState('');
  const [loading, setLoading] = useState(true);

  const DEFAULT_SERVICES = [
    { title: 'Pembuatan Surat Perjanjian', description: 'Penyusunan draf surat perjanjian profesional untuk berbagai kebutuhan hukum Anda.', icon: 'file-text' },
    { title: 'Pembentukan PT UMKM', description: 'Layanan pengurusan pendirian badan hukum PT khusus untuk pelaku UMKM.', icon: 'building' },
    { title: 'Pembuatan Surat Kuasa', description: 'Penyusunan surat kuasa khusus untuk berbagai keperluan pendampingan hukum.', icon: 'file-text' },
    { title: 'Analisis Kasus Hukum', description: 'Analisis mendalam terhadap permasalahan hukum Anda untuk menentukan strategi terbaik.', icon: 'shield' },
    { title: 'Pembuatan Legal Opinion', description: 'Pemberian pendapat hukum tertulis secara komprehensif berdasarkan peraturan yang berlaku.', icon: 'scroll' },
    { title: 'Bantuan Hukum Probono', description: 'Layanan bantuan hukum cuma-cuma bagi masyarakat yang kurang mampu.', icon: 'users' }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('law_services')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setServiceList(data);
        } else {
          setServiceList(DEFAULT_SERVICES); 
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setServiceList(DEFAULT_SERVICES);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleCtaClick = (keperluan) => {
    setSelectedKeperluan(keperluan);
    setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Bantuan Hukum & Legalitas UMKM | TanyaAdvokat.id</title>
        <meta name="description" content="Layanan bantuan hukum profesional untuk UMKM, pendirian PT, yayasan, pendaftaran HAKI, dan penyusunan kontrak bisnis di Indonesia." />
      </Helmet>
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
            <img src={bannerImg} alt="Bantuan Hukum" className="bantuan-banner__img" loading="lazy" />
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
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="bantuan-services__card" style={{ display: 'flex', gap: '20px' }}>
                  <Skeleton type="circle" width="50px" height="50px" style={{ flexShrink: 0 }} />
                  <div style={{ flexGrow: 1 }}>
                    <Skeleton type="title" width="60%" />
                    <Skeleton type="text" />
                    <Skeleton type="text" width="40%" />
                  </div>
                </div>
              ))
            ) : (
              serviceList.map((service, index) => {
                const iconKey = service.icon_name || service.icon;
                const IconComponent = iconMap[iconKey] || (FaIcons[iconKey] ? React.createElement(FaIcons[iconKey], { className: "product-icon" }) : <FaFolderPlus className="product-icon" />);

                return (
                  <div
                    key={service.id || index}
                    className={`bantuan-services__card ${service.is_centered ? 'card--centered' : ''} ${service.is_wide ? 'card--wide' : ''}`}
                  >
                    <div className="bantuan-services__left">
                      {IconComponent}
                    </div>
                    <div className="bantuan-services__right">
                      <h3 className="bantuan-services__title">{service.title}</h3>
                      <p className="bantuan-services__desc">{service.description || service.desc}</p>
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
              })
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button
              onClick={() => {
                setSelectedKeperluan('Bantuan Hukum lainnya');
                setIsModalOpen(true);
              }}
              style={{
                display: 'inline-block',
                background: 'var(--color-primary)',
                color: 'var(--color-white)',
                padding: '16px 40px',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '1.1rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(0, 109, 78, 0.3)',
                transition: 'all var(--transition-normal)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--color-accent)';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--color-primary)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Bantuan Hukum Lainnya
            </button>
            <p style={{ marginTop: '15px', color: '#666', fontSize: '0.95rem' }}>
              Tidak menemukan layanan yang sesuai? Konsultasikan kebutuhan spesifik Anda dengan kami.
            </p>
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
