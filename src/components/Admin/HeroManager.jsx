import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ImageUpload from './FileUploader';

function HeroManager() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState({ title: '', subtitle: '', image_url: '', order_index: 0 });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) console.error('Error fetching slides:', error);
    else setSlides(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentSlide.id) {
      const { error } = await supabase
        .from('hero_slides')
        .update(currentSlide)
        .eq('id', currentSlide.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('hero_slides')
        .insert([currentSlide]);
      if (error) alert(error.message);
    }
    setIsEditing(false);
    setCurrentSlide({ title: '', subtitle: '', image_url: '', order_index: 0 });
    fetchSlides();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus slide ini?')) {
      const { error } = await supabase.from('hero_slides').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchSlides();
    }
  };

  if (loading) return <p>Loading slides...</p>;

  return (
    <div className="admin-module">
      <div className="admin-module-header">
        <h3>Hero Carousel Content</h3>
        <button className="admin-add-btn" onClick={() => { setIsEditing(true); setCurrentSlide({ title: '', subtitle: '', image_url: '', order_index: 0 }); }}>+ Tambah Slide</button>
      </div>

      {isEditing && (
        <form className="admin-edit-form" onSubmit={handleSubmit}>
          <h4>{currentSlide.id ? 'Edit Slide' : 'Tambah Slide Baru'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Title</label>
              <input value={currentSlide.title} onChange={e => setCurrentSlide({...currentSlide, title: e.target.value})} required />
            </div>
            <div className="admin-form-group">
              <label>Subtitle</label>
              <input value={currentSlide.subtitle} onChange={e => setCurrentSlide({...currentSlide, subtitle: e.target.value})} />
            </div>
            <div className="admin-form-group">
              <label>Image Content</label>
              <ImageUpload 
                bucket="hero-images" 
                currentImageUrl={currentSlide.image_url} 
                onUploadSuccess={(url) => setCurrentSlide({...currentSlide, image_url: url})} 
              />
              <input 
                type="text" 
                placeholder="Or paste external URL here..."
                value={currentSlide.image_url} 
                onChange={e => setCurrentSlide({...currentSlide, image_url: e.target.value})} 
              />
            </div>
            <div className="admin-form-group">
              <label>Order Index</label>
              <input type="number" value={currentSlide.order_index} onChange={e => setCurrentSlide({...currentSlide, order_index: parseInt(e.target.value)})} />
            </div>
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-save-btn">Simpan</button>
            <button type="button" className="admin-cancel-btn" onClick={() => setIsEditing(false)}>Batal</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Image</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slides.map(slide => (
              <tr key={slide.id}>
                <td>{slide.order_index}</td>
                <td><img src={slide.image_url} alt="" style={{ width: '80px', borderRadius: '4px' }} /></td>
                <td>{slide.title}</td>
                <td>{slide.subtitle}</td>
                <td>
                  <button className="admin-action-edit" onClick={() => { setCurrentSlide(slide); setIsEditing(true); }}>Edit</button>
                  <button className="admin-action-delete" onClick={() => handleDelete(slide.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HeroManager;
