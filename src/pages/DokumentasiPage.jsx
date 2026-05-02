import React, { useState, useEffect } from 'react';
import { dokumentasiItems as staticDocs } from '../data/content';
import { supabase } from '../lib/supabase';
import './Dokumentasi.css';

function DokumentasiPage() {
  const [docs, setDocs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);

  // Default filters as requested
  const DEFAULT_CATEGORIES = [
    { name: 'Semua' },
    { name: 'Bankum Probono' },
    { name: 'UMKM' },
    { name: 'Pengadilan/ Penanganan Perkara' },
    { name: 'Sosialisasi Hukum' },
    { name: 'Kegiatan Hukum Lainnya' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const { data: catData, error: catError } = await supabase
          .from('documentation_categories')
          .select('*')
          .order('order_index', { ascending: true });

        if (!catError && catData && catData.length > 0) {
          setCategories([{ name: 'Semua' }, ...catData]);
        } else {
          setCategories(DEFAULT_CATEGORIES);
        }

        // Fetch documentation
        const { data, error } = await supabase
          .from('documentation')
          .select('*, documentation_categories(name)')
          .order('event_date', { ascending: false });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setDocs(data);
        } else {
          // Fallback to static data if DB is empty
          setDocs(staticDocs);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setDocs(staticDocs);
        setCategories(DEFAULT_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = activeFilter === 'Semua'
    ? docs
    : docs.filter(item => {
        const itemCategory = item.documentation_categories?.name || item.category || '';
        return itemCategory.toLowerCase() === activeFilter.toLowerCase();
      });

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
                key={cat.name}
                className={`dokumentasi__filter ${activeFilter === cat.name ? 'dokumentasi__filter--active' : ''}`}
                onClick={() => setActiveFilter(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="dokumentasi__grid">
            {filtered.map((item, index) => (
              <div key={item.id || index} className="dokumentasi__card">
                <div className="dokumentasi__image">
                  <img src={item.image_url || item.image} alt={item.title} className="dokumentasi__img" />
                </div>
                <div className="dokumentasi__caption" style={{ padding: '15px', fontSize: '0.95rem', fontWeight: '600', textAlign: 'center', background: '#fff', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                  {item.title}
                </div>
              </div>
            ))}
            {filtered.length === 0 && !loading && (
              <div className="no-results" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#666' }}>
                Belum ada dokumentasi untuk kategori ini.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}


export default DokumentasiPage;
