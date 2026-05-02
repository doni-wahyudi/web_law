import React, { useState, useEffect } from 'react';
import { FaDownload, FaSearch, FaFilePdf, FaBook } from 'react-icons/fa';
import { peraturanHukum as staticRegs } from '../data/content';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import './PeraturanPage.css';

function PeraturanPage() {
  const [peraturanList, setPeraturanList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegs = async () => {
      try {
        const { data, error } = await supabase
          .from('regulations')
          .select('*')
          .order('year', { ascending: false });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setPeraturanList(data);
        } else {
          setPeraturanList(staticRegs);
        }
      } catch (err) {
        console.error('Error fetching regulations:', err);
        setPeraturanList(staticRegs);
      } finally {
        setLoading(false);
      }
    };

    fetchRegs();
  }, []);

  // Get unique categories
  const categories = ['Semua', ...new Set(peraturanList.map(item => item.category))];

  // Filter items
  const filteredItems = peraturanList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Pusat Peraturan Perundang-undangan Indonesia | TanyaAdvokat.id</title>
        <meta name="description" content="Unduh dan pelajari kumpulan peraturan perundang-undangan terbaru di Indonesia untuk mendukung pemahaman hukum Anda." />
      </Helmet>
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
              {filteredItems.map((item, index) => (
                <div key={item.id || index} className="peraturan__card">
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
                    <a href={item.file_url || item.file} target="_blank" rel="noopener noreferrer" className="peraturan__download-btn">
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
