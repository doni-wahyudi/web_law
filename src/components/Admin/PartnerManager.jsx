import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import FileUploader from './FileUploader';

function PartnerManager() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPartner, setCurrentPartner] = useState({ name: '', logo_url: '', order_index: 0 });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) console.error('Error fetching partners:', error);
    else setPartners(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentPartner.id) {
      const { error } = await supabase.from('partners').update(currentPartner).eq('id', currentPartner.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('partners').insert([currentPartner]);
      if (error) alert(error.message);
    }
    setIsEditing(false);
    setCurrentPartner({ name: '', logo_url: '', order_index: 0 });
    fetchPartners();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus mitra ini?')) {
      const { error } = await supabase.from('partners').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchPartners();
    }
  };

  if (loading) return <p>Loading partners...</p>;

  return (
    <div className="admin-module">
      <div className="admin-module-header">
        <h3>Manajemen Mitra Kerjasama</h3>
        <button className="admin-add-btn" onClick={() => { setIsEditing(true); setCurrentPartner({ name: '', logo_url: '', order_index: 0 }); }}>+ Tambah Mitra</button>
      </div>

      {isEditing && (
        <form className="admin-edit-form" onSubmit={handleSubmit}>
          <h4>{currentPartner.id ? 'Edit Mitra' : 'Tambah Mitra Baru'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Nama Mitra</label>
              <input value={currentPartner.name} onChange={e => setCurrentPartner({...currentPartner, name: e.target.value})} required />
            </div>
            <div className="admin-form-group">
              <label>Logo Mitra</label>
              <FileUploader 
                bucket="partner-logos" 
                currentValue={currentPartner.logo_url} 
                onUploadSuccess={(url) => setCurrentPartner({...currentPartner, logo_url: url})} 
              />
              <input 
                type="text" 
                placeholder="Or paste external URL here..."
                value={currentPartner.logo_url} 
                onChange={e => setCurrentPartner({...currentPartner, logo_url: e.target.value})} 
              />
            </div>
            <div className="admin-form-group">
              <label>Order Index</label>
              <input type="number" value={currentPartner.order_index} onChange={e => setCurrentPartner({...currentPartner, order_index: parseInt(e.target.value)})} />
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
              <th>Logo</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map(partner => (
              <tr key={partner.id}>
                <td>{partner.order_index}</td>
                <td><img src={partner.logo_url} alt="" style={{ height: '40px', objectFit: 'contain' }} /></td>
                <td><strong>{partner.name}</strong></td>
                <td>
                  <button className="admin-action-edit" onClick={() => { setCurrentPartner(partner); setIsEditing(true); }}>Edit</button>
                  <button className="admin-action-delete" onClick={() => handleDelete(partner.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PartnerManager;
