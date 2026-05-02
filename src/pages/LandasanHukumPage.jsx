import React from 'react';
import './StaticPages.css';

import certificateImg from '../assets/surat pencatatan tanyaadvokat.webp';

function LandasanHukumPage() {
  return (
    <div className="static-page">
      <section className="page-banner">
        <div className="container">
          <h1>Landasan Hukum</h1>
          <p>Payung hukum operasional TanyaAdvokat.id</p>
        </div>
      </section>
      
      <section className="static-content section-padding">
        <div className="container">
          <div className="content-card">
            <p>TanyaAdvokat.id beroperasi di bawah naungan <strong>PT Swara Naraya Indonesia</strong>, dengan landasan hukum yang kuat sesuai dengan peraturan perundang-undangan yang berlaku di Republik Indonesia.</p>
            
            <div className="certificate-section" style={{ marginTop: '40px', textAlign: 'center', background: '#f8f9fa', padding: '30px', borderRadius: '12px', border: '1px solid #eee' }}>
              <h2 className="certificate-title" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', color: 'var(--color-primary)', marginBottom: '15px' }}>Surat Pencatatan Penciptaan Nomor 001168162</h2>
              <p style={{ maxWidth: '700px', margin: '0 auto 25px', color: '#555', lineHeight: '1.6' }}>
                Menjadi landasan hukum kuat website ini berjalan dengan harapan dapat bermanfaat untuk banyak orang yang membutuhkan bantuan hukum.
              </p>
              <div className="certificate-image-wrapper" style={{ maxWidth: '800px', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={certificateImg} alt="Surat Pencatatan Penciptaan" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>

            <div className="law-list" style={{ marginTop: '50px' }}>
              <div className="law-item">
                <h3>Undang-Undang No. 18 Tahun 2003 tentang Advokat</h3>
                <p>Mengatur mengenai profesi advokat sebagai penegak hukum yang bebas dan mandiri.</p>
              </div>
              <div className="law-item">
                <h3>Undang-Undang No. 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik (ITE)</h3>
                <p>Menjadi landasan dalam penyelenggaraan sistem elektronik dan layanan online kami.</p>
              </div>
              <div className="law-item">
                <h3>Peraturan Pemerintah mengenai Perizinan Berusaha Berbasis Risiko (OSS)</h3>
                <p>Legalitas PT Swara Naraya Indonesia sebagai penyelenggara layanan jasa hukum dan platform digital.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandasanHukumPage;
