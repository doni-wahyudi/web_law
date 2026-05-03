import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { layananKamiServices } from '../data/content';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import WhatsAppModal from '../components/WhatsAppModal';
import Skeleton from '../components/Skeleton/Skeleton';
import bannerImg from '../assets/layanan_kami_hero.png';
import './LayananKami.css';

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

function LayananKamiPage() {
  const [serviceList, setServiceList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeperluan, setSelectedKeperluan] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('law_services')
          .select('*')
          .eq('show_on_home', true)
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        const filtered = data ? data.filter(s => s.show_on_home !== false) : [];
        if (filtered.length > 0) {
          setServiceList(filtered);
        } else {
          setServiceList(layananKamiServices);
        }
      } catch (err) {
        console.error('Error loading services:', err);
        setServiceList(layananKamiServices);
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
        <title>Layanan Kami | TanyaAdvokat.id</title>
        <meta name="description" content="Layanan hukum profesional dan terpercaya untuk berbagai kebutuhan hukum Anda, mulai dari pidana, perdata, hingga hukum perusahaan." />
      </Helmet>
      {/* Banner */}
      <section className="layanan-kami-banner">
        <div className="container layanan-inner">
          <div className="layanan-kami-banner__content">
            <h1 className="narration">Layanan Hukum Profesional Untuk Kepastian Hukum Anda</h1>
            <p className="explanation">
               Kami hadir memberikan solusi hukum yang tepat, transparan, dan berkeadilan bagi setiap permasalahan hukum yang Anda hadapi.
            </p>
            <button
              onClick={() => handleCtaClick('Layanan Kami')}
              className="layanan-kami-banner__cta"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Konsultasi Sekarang
            </button>
          </div>
          <div className="layanan-kami-banner__image-wrapper">
            <img src={bannerImg} alt="Layanan Kami" className="layanan-kami-banner__img" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="layanan-kami-services">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Bidang Layanan Kami</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '40px' }}>
            Berbagai keahlian hukum untuk mendampingi setiap langkah Anda
          </p>

          <div className="layanan-kami-services__grid">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="layanan-kami-services__card" style={{ display: 'flex', gap: '20px' }}>
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
                const IconComponent = iconMap[iconKey] || (FaIcons[iconKey] ? React.createElement(FaIcons[iconKey], { className: "product-icon" }) : <FaIcons.FaFolderPlus className="product-icon" />);

                return (
                  <div
                    key={service.id || index}
                    className={`layanan-kami-services__card ${service.is_wide ? 'card--wide' : ''}`}
                  >
                    <div className="layanan-kami-services__left">
                      {IconComponent}
                    </div>
                    <div className="layanan-kami-services__right">
                      <h3 className="layanan-kami-services__title">{service.title}</h3>
                      <p className="layanan-kami-services__desc">{service.description || service.desc}</p>
                      <button
                        onClick={() => handleCtaClick(service.title)}
                        className="layanan-kami-services__btn"
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

export default LayananKamiPage;
