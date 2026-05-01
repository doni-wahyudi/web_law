import React from 'react';
import './StaticPages.css';

function SopPelayananPage() {
  return (
    <div className="static-page">
      <section className="page-banner">
        <div className="container">
          <h1>SOP Pelayanan</h1>
          <p>Standar Operasional Prosedur untuk kepuasan klien</p>
        </div>
      </section>
      
      <section className="static-content section-padding">
        <div className="container">
          <div className="content-card">
            <div className="sop-steps">
              <div className="sop-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Penerimaan Konsultasi</h3>
                  <p>Klien menghubungi melalui formulir atau WhatsApp resmi untuk menyampaikan pokok permasalahan hukum.</p>
                </div>
              </div>
              <div className="sop-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Verifikasi & Identifikasi Kasus</h3>
                  <p>Tim admin melakukan verifikasi awal dan meneruskan kepada mitra advokat yang sesuai dengan bidang keahliannya.</p>
                </div>
              </div>
              <div className="sop-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Konsultasi Mendalam</h3>
                  <p>Advokat memberikan penjelasan hukum, analisis risiko, dan opsi solusi kepada klien secara profesional.</p>
                </div>
              </div>
              <div className="sop-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Tindak Lanjut (Opsional)</h3>
                  <p>Jika diperlukan pendampingan lebih lanjut (litigasi/non-litigasi), akan dibuat kesepakatan tertulis mengenai jasa hukum.</p>
                </div>
              </div>
              <div className="sop-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Penyelesaian & Arsip</h3>
                  <p>Pendokumentasian hasil konsultasi untuk memastikan kualitas layanan dan kerahasiaan data klien tetap terjaga.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SopPelayananPage;
