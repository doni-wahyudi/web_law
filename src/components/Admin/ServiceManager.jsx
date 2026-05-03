import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import * as FaIcons from 'react-icons/fa';

const COMMON_ICONS = [
  'FaBalanceScale', 'FaGavel', 'FaFileContract', 'FaBuilding', 'FaStore', 
  'FaBriefcase', 'FaShieldAlt', 'FaUsers', 'FaMapMarkedAlt', 'FaScroll', 
  'FaHeartBroken', 'FaIdCard', 'FaSearchPlus', 'FaHandsHelping', 'FaFolderPlus',
  'FaUserShield', 'FaRegHandshake', 'FaGlobe', 'FaChartLine', 'FaLaptopCode'
];

function ServiceManager({ type = 'home' }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState({
    title: '', description: '', icon_name: 'FaFileContract', 
    order_index: 0, 
    show_on_home: type === 'home', 
    show_on_bantuan: type === 'bantuan'
  });

  useEffect(() => {
    fetchServices();
  }, [type]);

  const fetchServices = async () => {
    setLoading(true);
    let query = supabase
      .from('law_services')
      .select('*')
      .order('order_index', { ascending: true });
    
    // Filter by type if specified
    if (type === 'home') {
      query = query.eq('show_on_home', true);
    } else if (type === 'bantuan') {
      query = query.eq('show_on_bantuan', true);
    }

    const { data, error } = await query;
    
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
    resetForm();
    fetchServices();
  };

  const resetForm = () => {
    setCurrentService({ 
      title: '', description: '', icon_name: 'FaFileContract', 
      order_index: 0, 
      show_on_home: type === 'home', 
      show_on_bantuan: type === 'bantuan' 
    });
  };

  const handleEdit = (service) => {
    setCurrentService({
      ...service,
      show_on_home: service.show_on_home ?? true,
      show_on_bantuan: service.show_on_bantuan ?? true
    });
    setIsEditing(true);
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
        <h3>{type === 'home' ? 'Manajemen Layanan Kami' : 'Manajemen Bantuan Hukum'}</h3>
        <button className="admin-add-btn" onClick={() => { setIsEditing(true); resetForm(); }}>+ Tambah Layanan</button>
      </div>

      {isEditing && (
        <form className="admin-edit-form" onSubmit={handleSubmit}>
          <h4>{currentService.id ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Nama Layanan</label>
              <input value={currentService.title} onChange={e => setCurrentService({...currentService, title: e.target.value})} required />
            </div>
            
            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Pilih Icon</label>
              <div className="admin-icon-grid">
                {COMMON_ICONS.map(iconName => {
                  const Icon = FaIcons[iconName];
                  return (
                    <div 
                      key={iconName} 
                      className={`admin-icon-item ${currentService.icon_name === iconName ? 'selected' : ''}`}
                      onClick={() => setCurrentService({...currentService, icon_name: iconName})}
                      title={iconName}
                    >
                      <Icon />
                    </div>
                  );
                })}
              </div>
              <input 
                style={{ marginTop: '10px' }}
                value={currentService.icon_name} 
                onChange={e => setCurrentService({...currentService, icon_name: e.target.value})} 
                placeholder="Atau ketik nama React Icon (e.g. FaBalanceScale)" 
              />
            </div>

            <div className="admin-form-group">
              <label>Order Index (Urutan)</label>
              <input type="number" value={currentService.order_index} onChange={e => setCurrentService({...currentService, order_index: parseInt(e.target.value)})} />
            </div>

            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Deskripsi Layanan</label>
              <textarea value={currentService.description} onChange={e => setCurrentService({...currentService, description: e.target.value})} rows="3"></textarea>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => {
              const Icon = FaIcons[service.icon_name] || FaIcons.FaBriefcase;
              return (
                <tr key={service.id}>
                  <td>{service.order_index}</td>
                  <td>
                    <div style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                      <Icon />
                    </div>
                  </td>
                  <td><strong>{service.title}</strong></td>
                  <td>
                    <button className="admin-action-edit" onClick={() => handleEdit(service)}>Edit</button>
                    <button className="admin-action-delete" onClick={() => handleDelete(service.id)}>Hapus</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceManager;
