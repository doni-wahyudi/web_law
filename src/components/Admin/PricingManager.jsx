import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

function PricingManager() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({
    title: '', price: '', original_price: '', period: 'Per Sesi',
    features: '', is_popular: false, order_index: 0
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) console.error('Error fetching plans:', error);
    else setPlans(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Process features from comma-separated string to array
    const featuresArray = typeof currentPlan.features === 'string' 
      ? currentPlan.features.split(',').map(item => item.trim()).filter(item => item !== '')
      : currentPlan.features;

    const planToSave = {
      ...currentPlan,
      features: featuresArray
    };

    if (currentPlan.id) {
      const { error } = await supabase
        .from('pricing_plans')
        .update(planToSave)
        .eq('id', currentPlan.id);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase
        .from('pricing_plans')
        .insert([planToSave]);
      if (error) alert(error.message);
    }
    setIsEditing(false);
    resetForm();
    fetchPlans();
  };

  const resetForm = () => {
    setCurrentPlan({
      title: '', price: '', original_price: '', period: 'Per Sesi',
      features: '', is_popular: false, order_index: 0
    });
  };

  const handleEdit = (plan) => {
    setCurrentPlan({
      ...plan,
      features: plan.features ? plan.features.join(', ') : ''
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus paket harga ini?')) {
      const { error } = await supabase.from('pricing_plans').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchPlans();
    }
  };

  if (loading) return <p>Loading pricing plans...</p>;

  return (
    <div className="admin-module">
      <div className="admin-module-header">
        <h3>Manajemen Biaya Layanan</h3>
        <button className="admin-add-btn" onClick={() => { setIsEditing(true); resetForm(); }}>+ Tambah Paket</button>
      </div>

      {isEditing && (
        <form className="admin-edit-form" onSubmit={handleSubmit}>
          <h4>{currentPlan.id ? 'Edit Paket' : 'Tambah Paket Baru'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Nama Paket</label>
              <input value={currentPlan.title} onChange={e => setCurrentPlan({...currentPlan, title: e.target.value})} required placeholder="e.g. Konsultasi Chat" />
            </div>
            <div className="admin-form-group">
              <label>Harga (Display Text)</label>
              <input value={currentPlan.price} onChange={e => setCurrentPlan({...currentPlan, price: e.target.value})} required placeholder="e.g. Rp 50.000" />
            </div>
            <div className="admin-form-group">
              <label>Harga Asal (Coret)</label>
              <input value={currentPlan.original_price} onChange={e => setCurrentPlan({...currentPlan, original_price: e.target.value})} placeholder="e.g. Rp 100.000" />
            </div>
            <div className="admin-form-group">
              <label>Periode</label>
              <input value={currentPlan.period} onChange={e => setCurrentPlan({...currentPlan, period: e.target.value})} placeholder="e.g. Per Sesi / 30 Menit" />
            </div>
            <div className="admin-form-group">
              <label>Order Index</label>
              <input type="number" value={currentPlan.order_index} onChange={e => setCurrentPlan({...currentPlan, order_index: parseInt(e.target.value)})} />
            </div>
            <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '30px' }}>
              <input type="checkbox" checked={currentPlan.is_popular} onChange={e => setCurrentPlan({...currentPlan, is_popular: e.target.checked})} id="is_popular" />
              <label htmlFor="is_popular" style={{ marginBottom: 0 }}>Tandai sebagai Paket Populer</label>
            </div>
            <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
              <label>Fitur (Pisahkan dengan koma)</label>
              <textarea value={currentPlan.features} onChange={e => setCurrentPlan({...currentPlan, features: e.target.value})} rows="4" placeholder="Fitur 1, Fitur 2, Fitur 3..."></textarea>
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
              <th>Title</th>
              <th>Price</th>
              <th>Period</th>
              <th>Popular</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.order_index}</td>
                <td><strong>{plan.title}</strong></td>
                <td>{plan.price}</td>
                <td>{plan.period}</td>
                <td>{plan.is_popular ? <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>Yes</span> : 'No'}</td>
                <td>
                  <button className="admin-action-edit" onClick={() => handleEdit(plan)}>Edit</button>
                  <button className="admin-action-delete" onClick={() => handleDelete(plan.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PricingManager;
