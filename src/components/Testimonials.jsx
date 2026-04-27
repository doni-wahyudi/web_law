import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { testimonials } from '../data/content';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Testimonials.css';

function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">Apa Kata Klien Kami</h2>
        <p className="section-subtitle">
          Testimoni dari klien yang telah menggunakan layanan kami
        </p>

        <div className="testimonials__slider-wrapper">
          <button className="testimonials__nav-btn testimonials__nav-prev" aria-label="Previous">
            <FaArrowLeft />
          </button>

          <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: '.testimonials__nav-prev',
            nextEl: '.testimonials__nav-next',
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonials__slider"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="testimonials__card">
                <div className="testimonials__quote-icon">
                  <FaQuoteLeft />
                </div>
                <p className="testimonials__text">{item.text}</p>
                <div className="testimonials__author">
                  <div className="testimonials__avatar">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="testimonials__name">{item.name}</h4>
                    <span className="testimonials__role">{item.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          </Swiper>

          <button className="testimonials__nav-btn testimonials__nav-next" aria-label="Next">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
