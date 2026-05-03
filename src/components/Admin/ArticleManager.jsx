import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ImageUpload from './FileUploader';

function ArticleManager() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({
    title: '', slug: '', excerpt: '', content: '', image_url: '', 
    category: 'Tips Hukum', author: 'Admin', keywords: '',
    published_at: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) console.error('Error fetching articles:', error);
    else setArticles(data);
    setLoading(false);
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleToSave = {
      ...currentArticle,
      slug: currentArticle.slug || generateSlug(currentArticle.title),
      published_at: new Date(currentArticle.published_at).toISOString()
    };

    if (currentArticle.id) {
      const { error } = await supabase
        .from('articles')
        .update(articleToSave)
        .eq('id', currentArticle.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('articles')
        .insert([articleToSave]);
      if (error) alert(error.message);
    }
    setIsEditing(false);
    resetForm();
    fetchArticles();
  };

  const resetForm = () => {
    setCurrentArticle({ 
      title: '', slug: '', excerpt: '', content: '', image_url: '', 
      category: 'Tips Hukum', author: 'Admin', keywords: '',
      published_at: new Date().toISOString().split('T')[0] 
    });
  };

  const handleEdit = (article) => {
    setCurrentArticle({
      ...article,
      published_at: article.published_at ? new Date(article.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      keywords: article.keywords || ''
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus artikel ini?')) {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchArticles();
    }
  };

  if (loading) return <p>Loading articles...</p>;

  return (
    <div className="admin-module">
      <div className="admin-module-header">
        <h3>Manajemen Artikel & Tips</h3>
        <button className="admin-add-btn" onClick={() => { setIsEditing(true); resetForm(); }}>+ Tambah Artikel</button>
      </div>

      {isEditing && (
        <form className="admin-edit-form" onSubmit={handleSubmit}>
          <h4>{currentArticle.id ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h4>
          <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="admin-form-group">
              <label>Judul Artikel</label>
              <input 
                value={currentArticle.title} 
                onChange={e => {
                  const title = e.target.value;
                  setCurrentArticle({...currentArticle, title, slug: generateSlug(title)});
                }} 
                required 
              />
            </div>
            <div className="admin-form-group">
              <label>Slug (URL Friendly)</label>
              <input value={currentArticle.slug} onChange={e => setCurrentArticle({...currentArticle, slug: e.target.value})} required />
            </div>
            <div className="admin-form-grid" style={{ padding: 0 }}>
              <div className="admin-form-group">
                <label>Kategori</label>
                <input 
                  value={currentArticle.category} 
                  onChange={e => setCurrentArticle({...currentArticle, category: e.target.value})} 
                  placeholder="e.g. Tips Hukum, Berita, UMKM..."
                />
              </div>
              <div className="admin-form-group">
                <label>Tanggal Terbit</label>
                <input 
                  type="date" 
                  value={currentArticle.published_at} 
                  onChange={e => setCurrentArticle({...currentArticle, published_at: e.target.value})} 
                />
              </div>
              <div className="admin-form-group">
                <label>Penulis</label>
                <input value={currentArticle.author} onChange={e => setCurrentArticle({...currentArticle, author: e.target.value})} />
              </div>
            </div>
            <div className="admin-form-group">
              <label>SEO Keywords (Pisahkan dengan koma)</label>
              <input 
                value={currentArticle.keywords} 
                onChange={e => setCurrentArticle({...currentArticle, keywords: e.target.value})} 
                placeholder="hukum, perceraian, advokat, jakarta..."
              />
            </div>
            <div className="admin-form-group">
              <label>Thumbnail Image</label>
              <ImageUpload 
                bucket="article-images" 
                currentImageUrl={currentArticle.image_url} 
                onUploadSuccess={(url) => setCurrentArticle({...currentArticle, image_url: url})} 
              />
              <input 
                type="text" 
                placeholder="Or paste external URL here..."
                value={currentArticle.image_url} 
                onChange={e => setCurrentArticle({...currentArticle, image_url: e.target.value})} 
              />
            </div>
            <div className="admin-form-group">
              <label>Ringkasan (Excerpt)</label>
              <textarea value={currentArticle.excerpt} onChange={e => setCurrentArticle({...currentArticle, excerpt: e.target.value})} rows="2"></textarea>
            </div>
            <div className="admin-form-group">
              <label>Konten (Markdown/HTML supported)</label>
              <textarea value={currentArticle.content} onChange={e => setCurrentArticle({...currentArticle, content: e.target.value})} rows="10" required></textarea>
            </div>
          </div>
          <div className="admin-form-actions">
            <button type="submit" className="admin-save-btn">Simpan & Terbitkan</button>
            <button type="button" className="admin-cancel-btn" onClick={() => setIsEditing(false)}>Batal</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id}>
                <td><img src={article.image_url} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                <td><strong>{article.title}</strong></td>
                <td><span className="expertise-tag" style={{ background: '#edf2f7' }}>{article.category}</span></td>
                <td>{article.author}</td>
                <td>{new Date(article.published_at).toLocaleDateString()}</td>
                <td>
                  <button className="admin-action-edit" onClick={() => handleEdit(article)}>Edit</button>
                  <button className="admin-action-delete" onClick={() => handleDelete(article.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ArticleManager;
