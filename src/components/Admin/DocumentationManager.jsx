import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import FileUploader from './FileUploader';

function DocumentationManager() {
  const [docs, setDocs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDoc, setCurrentDoc] = useState({ title: '', image_url: '', event_date: '', category_id: '' });

  useEffect(() => {
    fetchDocs();
    fetchCategories();
  }, []);

  const fetchDocs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('documentation')
      .select('*, documentation_categories(name)')
      .order('event_date', { ascending: false });
    
    if (error) console.error('Error fetching documentation:', error);
    else setDocs(data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('documentation_categories')
      .select('*')
      .order('order_index', { ascending: true });
    if (!error) setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docToSave = { ...currentDoc };
    delete docToSave.documentation_categories; // Remove joined data if editing

    if (currentDoc.id) {
      const { error } = await supabase.from('documentation').update(docToSave).eq('id', currentDoc.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('documentation').insert([docToSave]);
      if (error) alert(error.message);
    }
    setIsEditing(false);
    setCurrentDoc({ title: '', image_url: '', event_date: '', category_id: '' });
    fetchDocs();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus dokumentasi ini?')) {
      const { error } = await supabase.from('documentation').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchDocs();
    }
  };

  if (loading) return <p>Loading documentation...</p>;

  return (
    <div className="admin-module">
      <div className="admin-module-header">
        <h3>Manajemen Dokumentasi Kegiatan</h3>
        <button className="admin-add-btn" onClick={() => { setIsEditing(true); setCurrentDoc({ title: '', image_url: '', event_date: '', category_id: '' }); }}>+ Tambah Dokumentasi</button>
      </div>

      {isEditing && (
        <form className="admin-edit-form" onSubmit={handleSubmit}>
          <h4>{currentDoc.id ? 'Edit Dokumentasi' : 'Tambah Dokumentasi Baru'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Judul / Nama Kegiatan</label>
              <input value={currentDoc.title} onChange={e => setCurrentDoc({...currentDoc, title: e.target.value})} required />
            </div>
            <div className="admin-form-group">
              <label>Kategori</label>
              <select 
                value={currentDoc.category_id || ''} 
                onChange={e => setCurrentDoc({...currentDoc, category_id: e.target.value})}
                required
              >
                <option value="">-- Pilih Kategori --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label>Foto Dokumentasi</label>
              <FileUploader 
                bucket="documentation-images" 
                currentValue={currentDoc.image_url} 
                onUploadSuccess={(url) => setCurrentDoc({...currentDoc, image_url: url})} 
              />
              <input 
                type="text" 
                placeholder="Or paste external URL here..."
                value={currentDoc.image_url} 
                onChange={e => setCurrentDoc({...currentDoc, image_url: e.target.value})} 
              />
            </div>
            <div className="admin-form-group">
              <label>Tanggal Kegiatan</label>
              <input type="date" value={currentDoc.event_date} onChange={e => setCurrentDoc({...currentDoc, event_date: e.target.value})} required />
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
              <th>Date</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map(doc => (
              <tr key={doc.id}>
                <td>{doc.event_date}</td>
                <td><img src={doc.image_url} alt="" style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                <td><strong>{doc.title}</strong></td>
                <td>{doc.documentation_categories?.name || '-'}</td>
                <td>
                  <button className="admin-action-edit" onClick={() => { setCurrentDoc(doc); setIsEditing(true); }}>Edit</button>
                  <button className="admin-action-delete" onClick={() => handleDelete(doc.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default DocumentationManager;
