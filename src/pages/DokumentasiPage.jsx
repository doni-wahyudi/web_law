import { useState } from 'react';
import { dokumentasiItems } from '../data/content';
import './Dokumentasi.css';

const categories = ['Semua', ...new Set(dokumentasiItems.map(item => item.category))];

function DokumentasiPage() {
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filtered = activeFilter === 'Semua'
    ? dokumentasiItems
    : dokumentasiItems.filter(item => item.category === activeFilter);

  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <h1>Dokumentasi</h1>
          <p>Dokumentasi kegiatan dan acara TanyaAdvokat</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="dokumentasi">
        <div className="container">
          {/* Filter Buttons */}
          <div className="dokumentasi__filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`dokumentasi__filter ${activeFilter === cat ? 'dokumentasi__filter--active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="dokumentasi__grid">
            {filtered.map((item, index) => (
              <div key={index} className="dokumentasi__card">
                <div className="dokumentasi__image">
                  <div className="dokumentasi__image-placeholder">
                    <span className="dokumentasi__image-icon">📸</span>
                  </div>
                  <div className="dokumentasi__overlay">
                    <span className="dokumentasi__category-badge">{item.category}</span>
                    <h3 className="dokumentasi__title">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default DokumentasiPage;
