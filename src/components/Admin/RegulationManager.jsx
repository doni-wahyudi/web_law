import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import FileUploader from './FileUploader';

function RegulationManager() {
  const [regulations, setRegulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReg, setCurrentReg] = useState({ title: '', category: '', year: '', file_url: '' });

  useEffect(() => {
    fetchRegulations();
  }, []);

  const fetchRegulations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('regulations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching regulations:', error);
    else setRegulations(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentReg.id) {
      const { error } = await supabase.from('regulations').update(currentReg).eq('id', currentReg.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('regulations').insert([currentReg]);
      if (error) alert(error.message);
    }
    setIsEditing(false);
    setCurrentReg({ title: '', category: '', year: '', file_url: '' });
    fetchRegulations();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus peraturan ini?')) {
      const { error } = await supabase.from('regulations').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchRegulations();
    }
  };

  if (loading) return <p>Loading regulations...</p>;

  return (
    <div className="admin-module">
      <div className="admin-module-header">
        <h3>Manajemen Peraturan Perundang-undangan</h3>
        <button className="admin-add-btn" onClick={() => { setIsEditing(true); setCurrentReg({ title: '', category: '', year: '', file_url: '' }); }}>+ Tambah Peraturan</button>
      </div>

      {isEditing && (
        <form className="admin-edit-form" onSubmit={handleSubmit}>
          <h4>{currentReg.id ? 'Edit Peraturan' : 'Tambah Peraturan Baru'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Judul Peraturan</label>
              <input value={currentReg.title} onChange={e => setCurrentReg({...currentReg, title: e.target.value})} required />
            </div>
            <div className="admin-form-group">
              <label>Kategori</label>
              <input value={currentReg.category} onChange={e => setCurrentReg({...currentReg, category: e.target.value})} placeholder="e.g. Undang-Undang" />
            </div>
            <div className="admin-form-group">
              <label>Tahun</label>
              <input value={currentReg.year} onChange={e => setCurrentReg({...currentReg, year: e.target.value})} placeholder="e.g. 2024" />
            </div>
            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>File Dokumen (PDF)</label>
              <FileUploader 
                bucket="regulation-files" 
                currentValue={currentReg.file_url} 
                accept="application/pdf"
                onUploadSuccess={(url) => setCurrentReg({...currentReg, file_url: url})} 
              />
              <input 
                type="text" 
                placeholder="Or paste external link here..."
                value={currentReg.file_url} 
                onChange={e => setCurrentReg({...currentReg, file_url: e.target.value})} 
              />
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
              <th>Year</th>
              <th>Title</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {regulations.map(reg => (
              <tr key={reg.id}>
                <td>{reg.year}</td>
                <td><strong>{reg.title}</strong></td>
                <td><span className="expertise-tag">{reg.category}</span></td>
                <td>
                  <button className="admin-action-edit" onClick={() => { setCurrentReg(reg); setIsEditing(true); }}>Edit</button>
                  <button className="admin-action-delete" onClick={() => handleDelete(reg.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegulationManager;
