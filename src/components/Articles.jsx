import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaArrowRight } from 'react-icons/fa';
import { blogPosts } from '../data/content';
import './Articles.css';

function Articles() {
  // Show only top 3 articles on the home page
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="articles">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">Tips Advokat & Artikel</h2>
          <p className="section-subtitle">
            Dapatkan informasi dan wawasan hukum terbaru dari tim advokat profesional kami
          </p>
        </div>

        <div className="articles__grid">
          {featuredPosts.map((post) => (
            <article key={post.id} className="articles__card">
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
              <div className="articles__content">
                <div className="articles__date">
                  <FaCalendarAlt /> {post.date}
                </div>
                <h3 className="articles__title">{post.title}</h3>
                <p className="articles__excerpt">{post.excerpt}</p>
                <Link to="/blog" className="articles__read-more">
                  Baca Selengkapnya <FaArrowRight />
                </Link>
              </div>
            </article>
          ))}
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
