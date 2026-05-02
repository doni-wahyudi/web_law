import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ImageUpload from './FileUploader';

function ReviewManager() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReview, setCurrentReview] = useState({
    name: '', role: '', text: '', rating: 5, image_url: ''
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching reviews:', error);
    else setReviews(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentReview.id) {
      const { error } = await supabase
        .from('reviews')
        .update(currentReview)
        .eq('id', currentReview.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('reviews')
        .insert([currentReview]);
      if (error) alert(error.message);
    }
    setIsEditing(false);
    setCurrentReview({ name: '', role: '', text: '', rating: 5, image_url: '' });
    fetchReviews();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus review ini?')) {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchReviews();
    }
  };

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className="admin-module">
      <div className="admin-module-header">
        <h3>Manajemen Testimonial</h3>
        <button className="admin-add-btn" onClick={() => { setIsEditing(true); setCurrentReview({ name: '', role: '', text: '', rating: 5, image_url: '' }); }}>+ Tambah Review</button>
      </div>

      {isEditing && (
        <form className="admin-edit-form" onSubmit={handleSubmit}>
          <h4>{currentReview.id ? 'Edit Review' : 'Tambah Review Baru'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Nama Klien</label>
              <input value={currentReview.name} onChange={e => setCurrentReview({...currentReview, name: e.target.value})} required />
            </div>
            <div className="admin-form-group">
              <label>Role / Pekerjaan</label>
              <input value={currentReview.role} onChange={e => setCurrentReview({...currentReview, role: e.target.value})} />
            </div>
            <div className="admin-form-group">
              <label>Rating (1-5)</label>
              <input type="number" min="1" max="5" value={currentReview.rating} onChange={e => setCurrentReview({...currentReview, rating: parseInt(e.target.value)})} />
            </div>
            <div className="admin-form-group">
              <label>Avatar Klien</label>
              <ImageUpload 
                bucket="review-avatars" 
                currentImageUrl={currentReview.image_url} 
                onUploadSuccess={(url) => setCurrentReview({...currentReview, image_url: url})} 
              />
              <input 
                type="text" 
                placeholder="Atau tempel URL eksternal..."
                value={currentReview.image_url} 
                onChange={e => setCurrentReview({...currentReview, image_url: e.target.value})} 
              />
            </div>
            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Isi Testimonial</label>
              <textarea value={currentReview.text} onChange={e => setCurrentReview({...currentReview, text: e.target.value})} rows="3" required></textarea>
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
              <th>Client</th>
              <th>Review</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={review.image_url || 'https://via.placeholder.com/40'} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    <div>
                      <strong>{review.name}</strong><br/>
                      <small>{review.role}</small>
                    </div>
                  </div>
                </td>
                <td>{review.text.substring(0, 60)}...</td>
                <td>{'⭐'.repeat(review.rating)}</td>
                <td>
                  <button className="admin-action-edit" onClick={() => { setCurrentReview(review); setIsEditing(true); }}>Edit</button>
                  <button className="admin-action-delete" onClick={() => handleDelete(review.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewManager;
