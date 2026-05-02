import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

function ServiceManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState({
    title: '', description: '', icon_name: 'FaFileContract', order_index: 0
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('law_services')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) console.error('Error fetching services:', error);
    else setServices(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentService.id) {
      const { error } = await supabase
        .from('law_services')
        .update(currentService)
        .eq('id', currentService.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('law_services')
        .insert([currentService]);
      if (error) alert(error.message);
    }
    setIsEditing(false);
    setCurrentService({ title: '', description: '', icon_name: 'FaFileContract', order_index: 0 });
    fetchServices();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus layanan ini?')) {
      const { error } = await supabase.from('law_services').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchServices();
    }
  };

  if (loading) return <p>Loading services...</p>;

  return (
    <div className="admin-module">
      <div className="admin-module-header">
        <h3>Manajemen Layanan Hukum</h3>
        <button className="admin-add-btn" onClick={() => { setIsEditing(true); setCurrentService({ title: '', description: '', icon_name: 'FaFileContract', order_index: 0 }); }}>+ Tambah Layanan</button>
      </div>

      {isEditing && (
        <form className="admin-edit-form" onSubmit={handleSubmit}>
          <h4>{currentService.id ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Nama Layanan</label>
              <input value={currentService.title} onChange={e => setCurrentService({...currentService, title: e.target.value})} required />
            </div>
            <div className="admin-form-group">
              <label>Icon Class (React Icons)</label>
              <input value={currentService.icon_name} onChange={e => setCurrentService({...currentService, icon_name: e.target.value})} placeholder="e.g. FaFileContract, FaStore" />
            </div>
            <div className="admin-form-group">
              <label>Order Index</label>
              <input type="number" value={currentService.order_index} onChange={e => setCurrentService({...currentService, order_index: parseInt(e.target.value)})} />
            </div>
            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Deskripsi Singkat</label>
              <textarea value={currentService.description} onChange={e => setCurrentService({...currentService, description: e.target.value})} rows="2"></textarea>
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
              <th>Icon</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.order_index}</td>
                <td><code style={{ background: '#f0f4f8', padding: '4px 8px', borderRadius: '4px' }}>{service.icon_name}</code></td>
                <td><strong>{service.title}</strong></td>
                <td>{service.description}</td>
                <td>
                  <button className="admin-action-edit" onClick={() => { setCurrentService(service); setIsEditing(true); }}>Edit</button>
                  <button className="admin-action-delete" onClick={() => handleDelete(service.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceManager;
