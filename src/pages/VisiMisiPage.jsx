import React from 'react';
import './StaticPages.css';

function VisiMisiPage() {
  return (
    <div className="static-page">
      <section className="page-banner">
        <div className="container">
          <h1>Visi & Misi</h1>
          <p>Mengenal lebih jauh tujuan dan cita-cita kami</p>
        </div>
      </section>
      
      <section className="static-content section-padding">
        <div className="container">
          <div className="content-card">
            <h2>Visi</h2>
            <p>Menjadi platform konsultasi hukum online terdepan yang memberikan akses hukum yang adil, transparan, dan profesional bagi seluruh masyarakat Indonesia.</p>
            
            <h2 style={{ marginTop: '40px' }}>Misi</h2>
            <ul className="misi-list">
              <li>Memberikan pelayanan konsultasi hukum yang responsif dan berkualitas tinggi.</li>
              <li>Mengedukasi masyarakat mengenai pentingnya pemahaman hukum dalam kehidupan sehari-hari.</li>
              <li>Memanfaatkan teknologi informasi untuk mempermudah akses masyarakat terhadap keadilan.</li>
              <li>Menjalin kemitraan yang solid dengan para advokat profesional di seluruh Indonesia.</li>
              <li>Menjaga integritas dan etika profesi dalam setiap pendampingan hukum.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VisiMisiPage;
