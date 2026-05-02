import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { FaFileContract, FaStore, FaIdCard, FaSearchPlus, FaGavel, FaHandsHelping, FaFolderPlus } from 'react-icons/fa';
import { supabase } from '../lib/supabase';
import WhatsAppModal from '../components/WhatsAppModal';
import bannerImg from '../assets/bantuan_hukum_hero.png';
import './UmkmGo.css';

const iconMap = {
  'FaFileContract': <FaFileContract className="product-icon" />,
  'FaStore': <FaStore className="product-icon" />,
  'FaIdCard': <FaIdCard className="product-icon" />,
  'FaSearchPlus': <FaSearchPlus className="product-icon" />,
  'FaGavel': <FaGavel className="product-icon" />,
  'FaHandsHelping': <FaHandsHelping className="product-icon" />,
  'FaFolderPlus': <FaFolderPlus className="product-icon" />
};

function UmkmGoPage() {
  const [serviceList, setServiceList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeperluan, setSelectedKeperluan] = useState('');
  const [loading, setLoading] = useState(true);

  const DEFAULT_SERVICES = [
    { title: 'Pendirian PT UMKM', desc: 'Layanan pengurusan pendirian badan hukum PT khusus untuk pelaku UMKM.', icon: 'FaStore' },
    { title: 'Pembuatan Akta', desc: 'Pengurusan akta notaris untuk berbagai kebutuhan legalitas bisnis.', icon: 'FaFileContract' },
    { title: 'Legalitas Yayasan', desc: 'Pengurusan izin dan akta pendirian yayasan atau organisasi sosial.', icon: 'FaHandsHelping' },
    { title: 'Pendaftaran Hak Cipta', desc: 'Perlindungan karya intelektual melalui pendaftaran resmi HAKI.', icon: 'FaSearchPlus' },
    { title: 'Penyusunan Kontrak', desc: 'Pembuatan draf kontrak bisnis profesional dan berkekuatan hukum.', icon: 'FaFolderPlus' }
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
            {serviceList.map((service, index) => {
              const iconKey = service.icon_name || service.icon;
              const IconComponent = iconMap[iconKey] || (FaIcons[iconKey] ? React.createElement(FaIcons[iconKey], { className: "product-icon" }) : <FaFolderPlus className="product-icon" />);

              return (
                <div
                  key={service.id || index}
                  className={`bantuan-services__card ${service.is_centered ? 'card--centered' : ''}`}
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
