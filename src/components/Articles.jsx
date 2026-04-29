import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { blogPosts } from '../data/content';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Articles.css';

function Articles() {
  return (
    <section className="articles">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">Tips Advokat & Artikel</h2>
          <p className="section-subtitle">
            Dapatkan informasi dan wawasan hukum terbaru dari tim advokat profesional kami
          </p>
        </div>

        <div className="articles__carousel">
          <button className="articles__nav-btn articles__nav-prev" aria-label="Previous">
            <FaArrowLeft />
          </button>
          <button className="articles__nav-btn articles__nav-next" aria-label="Next">
            <FaArrowRight />
          </button>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            navigation={{
              prevEl: '.articles__nav-prev',
              nextEl: '.articles__nav-next',
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: '40px' }}
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <article className="articles__card" style={{ height: '100%' }}>
                  <div className="articles__thumbnail">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="articles__img" />
                    ) : (
                      <div className="articles__thumbnail-placeholder">
                        <span className="articles__thumbnail-icon">📄</span>
                      </div>
                    )}

                    <span className="articles__category">
                      <FaTag /> {post.category}
                    </span>
                  </div>
                  <div className="articles__content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="articles__date">
                      <FaCalendarAlt /> {post.date}
                    </div>
                    <h3 className="articles__title">{post.title}</h3>
                    <p className="articles__excerpt" style={{ flexGrow: 1 }}>{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="articles__read-more" style={{ marginTop: 'auto' }}>
                      Baca Selengkapnya <FaArrowRight />
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="articles__cta-wrapper">
          <Link to="/blog" className="articles__view-all">
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Articles;
