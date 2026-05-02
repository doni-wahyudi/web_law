import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaTag, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { blogPosts as staticPosts } from '../data/content';
import { supabase } from '../lib/supabase';
import './Blog.css';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
            {posts.map((post, index) => (
              <article key={post.id || index} className="blog__card">
                <div className="blog__thumbnail">
                  {post.image_url || post.image ? (
                    <img src={post.image_url || post.image} alt={post.title} className="blog__img" />
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogPage;
