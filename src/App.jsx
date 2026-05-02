import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BiayaLayananPage from './pages/BiayaLayananPage';
import ProfileAdvokatPage from './pages/ProfileAdvokatPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import DokumentasiPage from './pages/DokumentasiPage';
import UmkmGoPage from './pages/UmkmGoPage';
import PeraturanPage from './pages/PeraturanPage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import VisiMisiPage from './pages/VisiMisiPage';
import LandasanHukumPage from './pages/LandasanHukumPage';
import SopPelayananPage from './pages/SopPelayananPage';
import ScrollToTopButton from './components/ScrollToTopButton';

import LoginPage from './pages/Admin/LoginPage';
import Dashboard from './pages/Admin/Dashboard';

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
      </main>
      {!isAdminPage && <Footer />}
      <ScrollToTopButton />
    </>
  );
}

export default App;
