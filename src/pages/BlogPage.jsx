import { FaCalendarAlt, FaTag, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/content';
import './Blog.css';

function BlogPage() {
  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <h1>Tips Advokat</h1>
          <p>Artikel dan tips hukum dari tim advokat profesional kami</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog">
        <div className="container">
          <div className="blog__grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog__card">
                <div className="blog__thumbnail">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="blog__img" />
                  ) : (
                    <div className="blog__thumbnail-placeholder">
                      <span className="blog__thumbnail-icon">📄</span>
                    </div>
                  )}

                  <span className="blog__category">
                    <FaTag /> {post.category}
                  </span>
                </div>
                <div className="blog__content">
                  <div className="blog__date">
                    <FaCalendarAlt /> {post.date}
                  </div>
                  <h3 className="blog__title">{post.title}</h3>
                  <p className="blog__excerpt">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="blog__read-more">
                    Baca Selengkapnya <FaArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogPage;
