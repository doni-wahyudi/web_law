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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/biaya-layanan" element={<BiayaLayananPage />} />
          <Route path="/profile-advokat" element={<ProfileAdvokatPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/dokumentasi" element={<DokumentasiPage />} />
          <Route path="/umkm-go" element={<UmkmGoPage />} />
          <Route path="/peraturan-hukum" element={<PeraturanPage />} />
          <Route path="/advokat/:id" element={<ProfileDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
