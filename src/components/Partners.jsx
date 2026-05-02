import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { partners as staticPartners } from '../data/content';
import { supabase } from '../lib/supabase';
import 'swiper/css';
import 'swiper/css/navigation';
import './Partners.css';

function Partners() {
  const [partnerList, setPartnerList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setPartnerList(data);
        } else {
          setPartnerList(staticPartners);
        }
      } catch (err) {
        console.error('Error fetching partners:', err);
        setPartnerList(staticPartners);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);
  return (
    <section className="partners" id="partners">
      <div className="container">
        <h2 className="section-title">Mitra Kerjasama</h2>
        <p className="section-subtitle">
          Jaringan kerjasama kami dengan berbagai institusi hukum terkemuka
        </p>

        <div className="partners__carousel">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={5}
            slidesPerView={4}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 20 },
              480: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 30 },
              1024: { slidesPerView: 5, spaceBetween: 40 },
            }}
          >
            {partnerList.map((partner, index) => (
              <SwiperSlide key={partner.id || index}>
                <div className="partners__item">
                  <img src={partner.logo_url || partner.logo} alt={partner.name} className="partners__logo-img" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Partners;
