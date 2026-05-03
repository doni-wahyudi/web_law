import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaArrowLeft } from 'react-icons/fa';
import { blogPosts as staticPosts } from '../data/content';
import { supabase } from '../lib/supabase';
import { Helmet } from 'react-helmet-async';
import WhatsAppModal from '../components/WhatsAppModal';
import './BlogDetailPage.css';

function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Try UUID or ID
        let { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error || !data) {
          const staticMatch = staticPosts.find(p => p.id.toString() === id);
          setPost(staticMatch);
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        const staticMatch = staticPosts.find(p => p.id.toString() === id);
        setPost(staticMatch);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div style={{ padding: '100px 0', textAlign: 'center' }}>Loading...</div>;

  if (!post) {
    return (
      <section className="blog-detail blog-detail--not-found">
        <div className="container">
          <h2>Artikel Tidak Ditemukan</h2>
          <p>Maaf, artikel yang Anda cari tidak ada atau telah dipindahkan.</p>
          <Link to="/blog" className="blog-detail__back-btn">
            <FaArrowLeft /> Kembali ke Tips Advokat
          </Link>
        </div>
      </section>
    );
  }

  const formatContent = (content) => {
    if (!content) return '<p>Konten artikel sedang dalam persiapan.</p>';
    
    // If it already looks like HTML, return as is
    if (content.trim().startsWith('<') && content.trim().endsWith('>')) {
      return content;
    }

    // Otherwise, treat as Markdown/Plaintext
    let formatted = content
      .split(/\n\s*\n/) // Split by double newlines into paragraphs
      .map(para => {
        const lineBreaks = para.trim().replace(/\n/g, '<br />');
        return `<p>${lineBreaks}</p>`;
      })
      .join('');

    // Handle Bold: **text**
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle Italic: *text*
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

    return formatted;
  };

  return (
    <>
      <Helmet>
        <title>{`${post.title} | TanyaAdvokat.id`}</title>
        <meta name="description" content={post.excerpt} />
        {post.keywords && <meta name="keywords" content={post.keywords} />}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.image_url && <meta property="og:image" content={post.image_url} />}
        <meta property="og:type" content="article" />
      </Helmet>
      <section className="blog-detail-header">
        <div className="container blog-detail__container">
          <Link to="/blog" className="blog-detail__back-link">
            <FaArrowLeft /> Kembali ke Daftar Artikel
          </Link>
          
          <div className="blog-detail__meta">
            <span className="blog-detail__category">
              <FaTag /> {post.category}
            </span>
            <span className="blog-detail__date">
              <FaCalendarAlt /> {post.published_at ? new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : post.date}
            </span>
          </div>
          
          <h1 className="blog-detail__title">{post.title}</h1>
        </div>
      </section>

      <section className="blog-detail-content">
        <div className="container blog-detail__container">
          {(post.image_url || post.image) && (
            <div className="blog-detail__hero-image">
              <img src={post.image_url || post.image} alt={post.title} />
            </div>
          )}
          
          <div 
            className="blog-detail__body" 
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} 
          />

          {post.keywords && (
            <div className="blog-detail__keywords-section">
              <span className="blog-detail__keywords-label">Topik terkait:</span>
              <div className="blog-detail__keywords-list">
                {post.keywords.split(',').map((kw, i) => (
                  <span key={i} className="blog-detail__keyword-tag">#{kw.trim()}</span>
                ))}
              </div>
            </div>
          )}
          
          <div className="blog-detail__footer">
            <p className="blog-detail__disclaimer">
              <strong>Disclaimer:</strong> Artikel ini hanya ditujukan sebagai informasi umum dan bukan merupakan pendapat hukum (legal opinion) yang mengikat. Untuk permasalahan hukum spesifik, silakan berkonsultasi langsung dengan tim advokat kami.
            </p>
            <div className="blog-detail__cta">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary"
                style={{ border: 'none', cursor: 'pointer' }}
              >
                Konsultasikan Masalah Anda
              </button>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultKeperluan={`Konsultasi Artikel: ${post.title}`} 
      />
    </>
  );
}

export default BlogDetailPage;
