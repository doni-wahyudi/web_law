import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { FaHeartBroken, FaScroll, FaBriefcase, FaShieldAlt, FaMapMarkedAlt, FaUsers, FaFileContract, FaStore } from 'react-icons/fa';
import { services as staticServices } from '../data/content';
import { supabase } from '../lib/supabase';
import WhatsAppModal from './WhatsAppModal';
import './Services.css';

const iconMap = {
  'heart-crack': FaHeartBroken,
  'scroll': FaScroll,
  'briefcase': FaBriefcase,
  'shield': FaShieldAlt,
  'map': FaMapMarkedAlt,
  'users': FaUsers,
  'file-text': FaFileContract,
  'building': FaStore,
  'FaHeartBroken': FaHeartBroken,
  'FaScroll': FaScroll,
  'FaBriefcase': FaBriefcase,
  'FaShieldAlt': FaShieldAlt,
  'FaMapMarkedAlt': FaMapMarkedAlt,
  'FaUsers': FaUsers,
  'FaFileContract': FaFileContract,
  'FaStore': FaStore
};

function Services() {
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
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setServiceList(data);
        } else {
          setServiceList(staticServices);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setServiceList(staticServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleCardClick = (title) => {
    setSelectedKeperluan(`Konsultasi Layanan ${title}`);
    setIsModalOpen(true);
  };

  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Layanan Kami</h2>
        <p className="section-subtitle">
          TanyaAdvokat.id berkomitmen memperjuangkan <strong>keadilan (justice)</strong> dan <strong>kesetaraan (equality)</strong> melalui tim advokat senior yang berintegritas. Dengan pendekatan <strong>berbasis analisis mendalam</strong>, kami menghadirkan solusi hukum yang <strong>setara, transparan, dan tanpa diskriminasi</strong> guna memberikan kepastian serta ketenangan pikiran bagi Anda dan bisnis Anda.
        </p>

        <div className="services__grid">
          {serviceList.map((service, index) => {
            const IconComponent = iconMap[service.icon_name] || iconMap[service.icon] || FaIcons[service.icon_name] || FaBriefcase;
            return (
              <div
                key={service.id || index}
                className="services__card"
                onClick={() => handleCardClick(service.title)}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div>
                  <div className="services__icon">
                    <IconComponent />
                  </div>
                  <h3 className="services__title">{service.title}</h3>
                  <p className="services__desc">{service.description}</p>
                </div>
                <div className="services__cta-text" style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Konsultasi Sekarang <span style={{ fontSize: '1.2rem', color: 'var(--color-accent)' }}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultKeperluan={selectedKeperluan} 
      />
    </section>
  );
}

export default Services;
