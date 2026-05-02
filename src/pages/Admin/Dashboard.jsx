import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import HeroManager from '../../components/Admin/HeroManager';
import TeamManager from '../../components/Admin/TeamManager';
import PricingManager from '../../components/Admin/PricingManager';
import ServiceManager from '../../components/Admin/ServiceManager';
import ArticleManager from '../../components/Admin/ArticleManager';
import ReviewManager from '../../components/Admin/ReviewManager';
import PartnerManager from '../../components/Admin/PartnerManager';
import RegulationManager from '../../components/Admin/RegulationManager';
import DocumentationManager from '../../components/Admin/DocumentationManager';
import DocumentationCategoryManager from '../../components/Admin/DocumentationCategoryManager';
import './Admin.css';

function Dashboard() {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin');
      } else {
        setSession(session);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin');
      } else {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroManager />;
      case 'team':
        return <TeamManager />;
      case 'articles':
        return <ArticleManager />;
      case 'services':
        return <ServiceManager />;
      case 'pricing':
        return <PricingManager />;
      case 'reviews':
        return <ReviewManager />;
      case 'partners':
        return <PartnerManager />;
      case 'regulations':
        return <RegulationManager />;
      case 'documentation':
        return <DocumentationManager />;
      case 'documentation-categories':
        return <DocumentationCategoryManager />;
      default:
        return <HeroManager />;
    }
  };

  if (!session) return null;

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h3>Admin Panel</h3>
          <p>{session.user.email}</p>
        </div>
        
        <nav className="admin-nav">
          <button onClick={() => setActiveTab('hero')} className={activeTab === 'hero' ? 'active' : ''}>Hero CMS</button>
          <button onClick={() => setActiveTab('team')} className={activeTab === 'team' ? 'active' : ''}>Tim Mitra</button>
          <button onClick={() => setActiveTab('articles')} className={activeTab === 'articles' ? 'active' : ''}>Articles</button>
          <button onClick={() => setActiveTab('services')} className={activeTab === 'services' ? 'active' : ''}>Layanan Hukum</button>
          <button onClick={() => setActiveTab('pricing')} className={activeTab === 'pricing' ? 'active' : ''}>Biaya Layanan</button>
          <button onClick={() => setActiveTab('reviews')} className={activeTab === 'reviews' ? 'active' : ''}>Testimonials</button>
          <button onClick={() => setActiveTab('partners')} className={activeTab === 'partners' ? 'active' : ''}>Mitra Logos</button>
          <button onClick={() => setActiveTab('regulations')} className={activeTab === 'regulations' ? 'active' : ''}>Peraturan</button>
          <button onClick={() => setActiveTab('documentation')} className={activeTab === 'documentation' ? 'active' : ''}>Dokumentasi</button>
          <button onClick={() => setActiveTab('documentation-categories')} className={activeTab === 'documentation-categories' ? 'active' : ''}>Kategori Dokumen</button>
        </nav>
        
        <button className="admin-logout-btn" onClick={handleLogout}>Keluar</button>
      </aside>
      
      <main className="admin-main">
        <header className="admin-main-header">
          <h2>Management: {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
        </header>
        
        <div className="admin-content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
