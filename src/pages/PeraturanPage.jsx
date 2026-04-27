import { useState } from 'react';
import { FaDownload, FaSearch, FaFilePdf, FaBook } from 'react-icons/fa';
import { peraturanHukum } from '../data/content';
import './PeraturanPage.css';

function PeraturanPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Get unique categories
  const categories = ['Semua', ...new Set(peraturanHukum.map(item => item.category))];

  // Filter items
  const filteredItems = peraturanHukum.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Kumpulan Peraturan Hukum</h1>
          <p>Pusat unduhan dan dokumentasi peraturan perundang-undangan di Indonesia</p>
        </div>
      </section>

      <section className="peraturan-hukum">
        <div className="container">
          <div className="peraturan__controls">
            <div className="peraturan__search">
              <FaSearch className="peraturan__search-icon" />
              <input 
                type="text" 
                placeholder="Cari undang-undang atau peraturan..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="peraturan__filters">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`peraturan__filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div className="peraturan__grid">
              {filteredItems.map((item) => (
                <div key={item.id} className="peraturan__card">
                  <div className="peraturan__card-icon">
                    <FaBook />
                  </div>
                  <div className="peraturan__card-content">
                    <span className="peraturan__badge">{item.category}</span>
                    <span className="peraturan__year">Tahun {item.year}</span>
                    <h3 className="peraturan__title">{item.title}</h3>
                    <p className="peraturan__desc">{item.description}</p>
                  </div>
                  <div className="peraturan__card-footer">
                    <a href={item.file} download className="peraturan__download-btn">
                      <FaDownload /> Unduh PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="peraturan__empty">
              <FaFilePdf className="peraturan__empty-icon" />
              <h3>Dokumen tidak ditemukan</h3>
              <p>Maaf, kami tidak menemukan peraturan yang sesuai dengan pencarian Anda.</p>
              <button className="peraturan__reset-btn" onClick={() => { setSearchTerm(''); setSelectedCategory('Semua'); }}>
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default PeraturanPage;
