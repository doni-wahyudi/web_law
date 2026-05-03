import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ImageUpload from './FileUploader';

function TeamManager() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState({
    name: '', role: '', image_url: '', bio_summary: '', bio_detailed: '', experience: '',
    location: 'Jakarta', organization: 'TanyaAdvokat.id', perhimpunan: 'Peradi', 
    expertise: '', education: '', socials: { linkedin: '#', instagram: '#' }, order_index: 0
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) console.error('Error fetching members:', error);
    else setMembers(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Process expertise from comma-separated string to array
    const expertiseArray = typeof currentMember.expertise === 'string' 
      ? currentMember.expertise.split(',').map(item => item.trim()).filter(item => item !== '')
      : currentMember.expertise;

    const memberToSave = {
      ...currentMember,
      expertise: expertiseArray
    };

    if (currentMember.id) {
      const { error } = await supabase
        .from('team_members')
        .update(memberToSave)
        .eq('id', currentMember.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('team_members')
        .insert([memberToSave]);
      if (error) alert(error.message);
    }
    setIsEditing(false);
    resetForm();
    fetchMembers();
  };

  const resetForm = () => {
    setCurrentMember({
      name: '', role: '', image_url: '', bio_summary: '', bio_detailed: '', experience: '',
      location: 'Jakarta', organization: 'TanyaAdvokat.id', perhimpunan: 'Peradi', 
      expertise: '', education: '', socials: { linkedin: '#', instagram: '#' }, order_index: 0
    });
  };

  const handleEdit = (member) => {
    setCurrentMember({
      ...member,
      expertise: member.expertise ? member.expertise.join(', ') : '',
      // Support old 'about' field if migrating
      bio_summary: member.bio_summary || member.about || '',
      bio_detailed: member.bio_detailed || member.about || ''
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus anggota tim ini?')) {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchMembers();
    }
  };

  if (loading) return <p>Loading team members...</p>;

  return (
    <div className="admin-module">
      <div className="admin-module-header">
        <h3>Manajemen Tim Mitra</h3>
        <button className="admin-add-btn" onClick={() => { setIsEditing(true); resetForm(); }}>+ Tambah Anggota</button>
      </div>

      {isEditing && (
        <form className="admin-edit-form" onSubmit={handleSubmit}>
          <h4>{currentMember.id ? 'Edit Anggota' : 'Tambah Anggota Baru'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Nama Lengkap</label>
              <input value={currentMember.name} onChange={e => setCurrentMember({...currentMember, name: e.target.value})} required />
            </div>
            <div className="admin-form-group">
              <label>Role / Jabatan</label>
              <input value={currentMember.role} onChange={e => setCurrentMember({...currentMember, role: e.target.value})} required />
            </div>
            <div className="admin-form-group">
              <label>Foto Profil</label>
              <ImageUpload 
                bucket="team-images" 
                currentImageUrl={currentMember.image_url} 
                onUploadSuccess={(url) => setCurrentMember({...currentMember, image_url: url})} 
              />
              <input 
                type="text" 
                placeholder="Atau tempel URL eksternal..."
                value={currentMember.image_url} 
                onChange={e => setCurrentMember({...currentMember, image_url: e.target.value})} 
              />
            </div>
            <div className="admin-form-group">
              <label>Pengalaman (Tahun/Deskripsi)</label>
              <input value={currentMember.experience} onChange={e => setCurrentMember({...currentMember, experience: e.target.value})} placeholder="e.g. > 7 Tahun" />
            </div>
            <div className="admin-form-group">
              <label>Lokasi</label>
              <input value={currentMember.location} onChange={e => setCurrentMember({...currentMember, location: e.target.value})} />
            </div>
            <div className="admin-form-group">
              <label>Perhimpunan (e.g. Peradi)</label>
              <input value={currentMember.perhimpunan} onChange={e => setCurrentMember({...currentMember, perhimpunan: e.target.value})} />
            </div>
            <div className="admin-form-group">
              <label>Kantor / Organisasi</label>
              <input value={currentMember.organization} onChange={e => setCurrentMember({...currentMember, organization: e.target.value})} />
            </div>
            <div className="admin-form-group">
              <label>Pendidikan</label>
              <input value={currentMember.education} onChange={e => setCurrentMember({...currentMember, education: e.target.value})} />
            </div>
            <div className="admin-form-group">
              <label>LinkedIn URL</label>
              <input 
                value={currentMember.socials?.linkedin || ''} 
                onChange={e => setCurrentMember({
                  ...currentMember, 
                  socials: { ...currentMember.socials, linkedin: e.target.value }
                })} 
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Spesialisasi (Pisahkan dengan koma)</label>
              <input value={currentMember.expertise} onChange={e => setCurrentMember({...currentMember, expertise: e.target.value})} placeholder="Pidana, Perdata, Bisnis..." />
            </div>
            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Bio Singkat (Muncul di Card/List)</label>
              <textarea value={currentMember.bio_summary} onChange={e => setCurrentMember({...currentMember, bio_summary: e.target.value})} rows="2" placeholder="Bio singkat untuk tampilan kartu..."></textarea>
            </div>
            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Profil Lengkap (Muncul di Halaman Detail)</label>
              <textarea value={currentMember.bio_detailed} onChange={e => setCurrentMember({...currentMember, bio_detailed: e.target.value})} rows="6" placeholder="Deskripsi lengkap mengenai latar belakang dan pengalaman..."></textarea>
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
              <th>Photo</th>
              <th>Name</th>
              <th>Role</th>
              <th>Expertise</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>{member.order_index}</td>
                <td><img src={member.image_url} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} /></td>
                <td><strong>{member.name}</strong></td>
                <td>{member.role}</td>
                <td>{member.expertise?.slice(0, 2).join(', ')}...</td>
                <td>
                  <button className="admin-action-edit" onClick={() => handleEdit(member)}>Edit</button>
                  <button className="admin-action-delete" onClick={() => handleDelete(member.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamManager;
