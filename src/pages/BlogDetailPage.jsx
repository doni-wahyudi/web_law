import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaArrowLeft } from 'react-icons/fa';
import { blogPosts } from '../data/content';
import WhatsAppModal from '../components/WhatsAppModal';
import './BlogDetailPage.css';

function BlogDetailPage() {
  const { id } = useParams();
  
  // Find the post. We use parseInt because the URL parameter is a string, but the ID in data might be a number.
  const post = blogPosts.find(p => p.id === parseInt(id));
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <section className="blog-detail-header">
        <div className="container">
          <Link to="/blog" className="blog-detail__back-link">
            <FaArrowLeft /> Kembali ke Daftar Artikel
          </Link>
          
          <div className="blog-detail__meta">
            <span className="blog-detail__category">
              <FaTag /> {post.category}
            </span>
            <span className="blog-detail__date">
              <FaCalendarAlt /> {post.date}
            </span>
          </div>
          
          <h1 className="blog-detail__title">{post.title}</h1>
        </div>
      </section>

      <section className="blog-detail-content">
        <div className="container blog-detail__container">
          {post.image && (
            <div className="blog-detail__hero-image">
              <img src={post.image} alt={post.title} />
            </div>
          )}
          
          <div 
            className="blog-detail__body" 
            dangerouslySetInnerHTML={{ __html: post.content || '<p>Konten artikel sedang dalam persiapan.</p>' }} 
          />
          
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
