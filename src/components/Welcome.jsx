import React from 'react';
import './Welcome.css';

function Welcome() {
  return (
    <section className="welcome">
      <div className="container">
        <div className="welcome__card">
          <h2 className="welcome__title">Selamat Datang di <span className="welcome__brand">TanyaAdvokat.id</span></h2>
          <div className="welcome__line"></div>
          <p className="welcome__text">
            Solusi hukum <strong>modern dan terpercaya</strong> dalam genggaman Anda. Kami hadir untuk menjembatani 
            kebutuhan masyarakat akan <strong>keadilan</strong> dengan layanan konsultasi hukum yang <strong>transparan, profesional, dan mudah diakses</strong> kapan saja dan di mana saja.
          </p>
          <p className="welcome__text">
            Bersama tim <strong>mitra advokat berpengalaman</strong>, kami berkomitmen untuk memberikan 
            pendampingan terbaik bagi setiap permasalahan hukum Anda. Mari berdiskusi dan temukan 
            <strong>solusi hukum yang tepat</strong> bersama kami.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
