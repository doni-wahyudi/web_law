import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const BiayaLayananPage = lazy(() => import('./pages/BiayaLayananPage'));
const ProfileAdvokatPage = lazy(() => import('./pages/ProfileAdvokatPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const DokumentasiPage = lazy(() => import('./pages/DokumentasiPage'));
const UmkmGoPage = lazy(() => import('./pages/UmkmGoPage'));
const PeraturanPage = lazy(() => import('./pages/PeraturanPage'));
const ProfileDetailPage = lazy(() => import('./pages/ProfileDetailPage'));
const VisiMisiPage = lazy(() => import('./pages/VisiMisiPage'));
const LandasanHukumPage = lazy(() => import('./pages/LandasanHukumPage'));
const SopPelayananPage = lazy(() => import('./pages/SopPelayananPage'));
const LoginPage = lazy(() => import('./pages/Admin/LoginPage'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));

// Loading Fallback
const PageLoader = () => (
  <div style={{ 
    height: '60vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '20px'
  }}>
    <div className="page-spinner" style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(0, 109, 78, 0.1)',
      borderTop: '3px solid #006D4E',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <style>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminPage && <Header />}
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/biaya-layanan" element={<BiayaLayananPage />} />
            <Route path="/profile-advokat" element={<ProfileAdvokatPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/tips-advokat" element={<BlogPage />} />
            <Route path="/dokumentasi" element={<DokumentasiPage />} />
            <Route path="/umkm-go" element={<UmkmGoPage />} />
            <Route path="/layanan-advokat" element={<UmkmGoPage />} />
            <Route path="/peraturan-hukum" element={<PeraturanPage />} />
            <Route path="/advokat/:id" element={<ProfileDetailPage />} />
            <Route path="/visi-misi" element={<VisiMisiPage />} />
            <Route path="/landasan-hukum" element={<LandasanHukumPage />} />
            <Route path="/sop-pelayanan" element={<SopPelayananPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<LoginPage />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminPage && <Footer />}
      <ScrollToTopButton />
    </>
  );
}

export default App;
