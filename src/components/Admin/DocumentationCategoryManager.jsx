import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

function DocumentationCategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ name: '', order_index: 0 });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('documentation_categories')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Error fetching categories:', error);
      // If table doesn't exist, we might need to handle it or show a setup guide
    } else {
      setCategories(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentCategory.id) {
      const { error } = await supabase
        .from('documentation_categories')
        .update(currentCategory)
        .eq('id', currentCategory.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('documentation_categories')
        .insert([currentCategory]);
      if (error) alert(error.message);
    }
    setIsEditing(false);
    setCurrentCategory({ name: '', order_index: 0 });
    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus kategori ini?')) {
      const { error } = await supabase
        .from('documentation_categories')
        .delete()
        .eq('id', id);
      if (error) alert(error.message);
      else fetchCategories();
    }
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="admin-module">
      <div className="admin-module-header">
        <h3>Manajemen Kategori Dokumentasi</h3>
        <button className="admin-add-btn" onClick={() => { setIsEditing(true); setCurrentCategory({ name: '', order_index: categories.length }); }}>+ Tambah Kategori</button>
      </div>

      {isEditing && (
        <form className="admin-edit-form" onSubmit={handleSubmit}>
          <h4>{currentCategory.id ? 'Edit Kategori' : 'Tambah Kategori Baru'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Nama Kategori</label>
              <input value={currentCategory.name} onChange={e => setCurrentCategory({...currentCategory, name: e.target.value})} required />
            </div>
            <div className="admin-form-group">
              <label>Urutan (Order Index)</label>
              <input type="number" value={currentCategory.order_index} onChange={e => setCurrentCategory({...currentCategory, order_index: parseInt(e.target.value)})} required />
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
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <td>{cat.order_index}</td>
                <td><strong>{cat.name}</strong></td>
                <td>
                  <button className="admin-action-edit" onClick={() => { setCurrentCategory(cat); setIsEditing(true); }}>Edit</button>
                  <button className="admin-action-delete" onClick={() => handleDelete(cat.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocumentationCategoryManager;
