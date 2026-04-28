import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { partners } from '../data/content';
import 'swiper/css';
import 'swiper/css/navigation';
import './Partners.css';

function Partners() {
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
            spaceBetween={30}
            slidesPerView={4}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 2 },
              580: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index}>
                <div className="partners__item">
                  <img src={partner.logo} alt={partner.name} className="partners__logo-img" />
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
