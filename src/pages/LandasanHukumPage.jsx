import React from 'react';
import './StaticPages.css';

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
            
            <div className="law-list" style={{ marginTop: '30px' }}>
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
