import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { 
  FaImages, FaUsers, FaNewspaper, FaBalanceScale, 
  FaTags, FaStar, FaHandshake, FaBook, 
  FaFolderOpen, FaListAlt, FaSignOutAlt 
} from 'react-icons/fa';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  // Close sidebar on tab change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

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
    <div className={`admin-dashboard ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div 
        className={`admin-backdrop ${isSidebarOpen ? 'active' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h3>Admin Panel</h3>
          <p>{session.user.email}</p>
        </div>
        
        <nav className="admin-nav">
          <button onClick={() => setActiveTab('hero')} className={activeTab === 'hero' ? 'active' : ''}><FaImages /> Hero CMS</button>
          <button onClick={() => setActiveTab('team')} className={activeTab === 'team' ? 'active' : ''}><FaUsers /> Tim Mitra</button>
          <button onClick={() => setActiveTab('articles')} className={activeTab === 'articles' ? 'active' : ''}><FaNewspaper /> Articles</button>
          <button onClick={() => setActiveTab('services')} className={activeTab === 'services' ? 'active' : ''}><FaBalanceScale /> Layanan Hukum</button>
          <button onClick={() => setActiveTab('pricing')} className={activeTab === 'pricing' ? 'active' : ''}><FaTags /> Biaya Layanan</button>
          <button onClick={() => setActiveTab('reviews')} className={activeTab === 'reviews' ? 'active' : ''}><FaStar /> Testimonials</button>
          <button onClick={() => setActiveTab('partners')} className={activeTab === 'partners' ? 'active' : ''}><FaHandshake /> Mitra Logos</button>
          <button onClick={() => setActiveTab('regulations')} className={activeTab === 'regulations' ? 'active' : ''}><FaBook /> Peraturan</button>
          <button onClick={() => setActiveTab('documentation')} className={activeTab === 'documentation' ? 'active' : ''}><FaFolderOpen /> Dokumentasi</button>
          <button onClick={() => setActiveTab('documentation-categories')} className={activeTab === 'documentation-categories' ? 'active' : ''}><FaListAlt /> Kategori Dokumen</button>
        </nav>
        
        <button className="admin-logout-btn" onClick={handleLogout}><FaSignOutAlt /> Keluar</button>
      </aside>
      
      <main className="admin-main">
        <header className="admin-main-header">
          <div className="admin-header-left">
            <button className="admin-menu-toggle" onClick={() => setIsSidebarOpen(true)}>
              <FaListAlt />
            </button>
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}</h2>
          </div>
          <div className="admin-header-right">
            <button className="admin-logout-icon" onClick={handleLogout} title="Logout">
              <FaSignOutAlt />
            </button>
          </div>
        </header>
        
        <div className="admin-content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

