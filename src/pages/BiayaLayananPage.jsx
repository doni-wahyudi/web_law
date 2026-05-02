import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { pricingPlans as staticPlans } from '../data/content';
import { supabase } from '../lib/supabase';
import WhatsAppModal from '../components/WhatsAppModal';
import './BiayaLayanan.css';

function BiayaLayananPage() {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeperluan, setSelectedKeperluan] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data, error } = await supabase
          .from('pricing_plans')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setPlans(data);
        } else {
          setPlans(staticPlans);
        }
      } catch (err) {
        console.error('Error fetching plans:', err);
        setPlans(staticPlans);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleChoosePlan = (planTitle) => {
    setSelectedKeperluan(`Paket ${planTitle}`);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <h1>Biaya Layanan</h1>
          <p>Pilih paket layanan hukum yang sesuai dengan kebutuhan Anda</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing">
        <div className="container">
          <div className="pricing__grid">
            {plans.map((plan, index) => (
              <div
                key={plan.id || index}
                className={`pricing__card ${plan.is_popular || plan.popular ? 'pricing__card--popular' : ''}`}
              >
                {(plan.is_popular || plan.popular) && (
                  <div className="pricing__badge">Paling Populer</div>
                )}
                <h3 className="pricing__title">{plan.title}</h3>
                <div className="pricing__price">
                  {(plan.original_price || plan.originalPrice) && (
                    <span className="pricing__original-amount">{plan.original_price || plan.originalPrice}</span>
                  )}
                  <span className="pricing__amount">{plan.price}</span>
                  <span className="pricing__period">{plan.period}</span>
                </div>
                <ul className="pricing__features">
                  {plan.features?.map((feature, i) => (
                    <li key={i}>
                      <FaCheck className="pricing__check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleChoosePlan(plan.title)}
                  className={`pricing__cta ${plan.is_popular || plan.popular ? 'pricing__cta--primary' : 'pricing__cta--outline'}`}
                  style={{ width: '100%', cursor: 'pointer' }}
                >
                  Pilih Paket
                </button>
              </div>
            ))}
          </div>
          <div className="pricing__free-cta">
            <button
              onClick={() => {
                setSelectedKeperluan('Konsultasi Gratis (Jumat)');
                setIsModalOpen(true);
              }}
              className="pricing__free-btn"
            >
              Konsultasi Gratis Sekarang
            </button>
            <p className="pricing__free-info">Tersedia setiap hari Jumat, pukul 10.00 - 18.00 WIB</p>
          </div>

          {/* Additional Info */}
          <div className="pricing__info">
            <h3>Informasi Tambahan</h3>
            <div className="pricing__info-grid">
              <div className="pricing__info-card">
                <h4>Konsultasi Gratis</h4>
                <p>Dapatkan konsultasi awal gratis selama 15 menit untuk mengetahui langkah hukum terbaik untuk kasus Anda.</p>
              </div>
              <div className="pricing__info-card">
                <h4>Pembayaran Fleksibel</h4>
                <p>Kami menyediakan opsi pembayaran yang fleksibel, termasuk cicilan untuk kasus-kasus tertentu.</p>
              </div>
              <div className="pricing__info-card">
                <h4>Garansi Kepuasan</h4>
                <p>Jika Anda tidak puas dengan layanan konsultasi, kami memberikan jaminan pengembalian dana.</p>
              </div>
            </div>
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

export default BiayaLayananPage;
