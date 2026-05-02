import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaTag, FaArrowRight, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts as staticPosts } from '../data/content';
import { supabase } from '../lib/supabase';
import { CardSkeleton } from '../components/Skeleton/Skeleton';
import './Blog.css';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('published_at', { ascending: false });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(staticPosts);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        setPosts(staticPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Tips Advokat & Artikel Hukum | TanyaAdvokat.id</title>
        <meta name="description" content="Baca artikel, berita, dan tips hukum terbaru dari tim advokat profesional TanyaAdvokat.id untuk membantu Anda memahami hukum di Indonesia." />
        <meta property="og:title" content="Tips Advokat & Artikel Hukum - TanyaAdvokat.id" />
        <meta property="og:description" content="Kumpulan panduan dan wawasan hukum terbaru untuk masyarakat dan UMKM." />
      </Helmet>

      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <h1>Tips Advokat</h1>
          <p>Artikel dan tips hukum dari tim advokat profesional kami</p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="blog-search" style={{ padding: '40px 0 20px' }}>
        <div className="container">
          <div className="search-container" style={{
            maxWidth: '600px',
            margin: '0 auto',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <FaSearch style={{
              position: 'absolute',
              left: '15px',
              color: '#94a3b8'
            }} />
            <input
              type="text"
              placeholder="Cari artikel atau tips hukum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px 14px 45px',
                borderRadius: '50px',
                border: '2px solid #e2e8f0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog">
        <div className="container">
          <div className="blog__grid">
            {loading ? (
              // Show 6 skeletons while loading
              Array(6).fill(0).map((_, i) => <CardSkeleton key={i} />)
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <article key={post.id || index} className="blog__card">
                  <div className="blog__thumbnail">
                    {post.image_url || post.image ? (
                      <img src={post.image_url || post.image} alt={post.title} className="blog__img" loading="lazy" />
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
                      <FaCalendarAlt /> {post.published_at ? new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : post.date}
                    </div>
                    <h3 className="blog__title">{post.title}</h3>
                    <p className="blog__excerpt">{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="blog__read-more">
                      Baca Selengkapnya <FaArrowRight />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '60px 0' }}>
                <p style={{ fontSize: '1.2rem', color: '#64748b' }}>Tidak ada artikel yang ditemukan untuk "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ 
                    marginTop: '20px', 
                    color: 'var(--color-primary)', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontWeight: '600',
                    textDecoration: 'underline'
                  }}
                >
                  Lihat Semua Artikel
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogPage;
