import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Welcome from '../components/Welcome';
import Team from '../components/Team';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import Articles from '../components/Articles';
import Partners from '../components/Partners';

function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "TanyaAdvokat.id",
    "description": "Layanan konsultasi hukum profesional dan terpercaya di Indonesia.",
    "url": "https://tanyaadvokat.id",
    "telephone": "+628123456789",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jakarta",
      "addressCountry": "ID"
    },
    "openingHours": "Mo-Fr 09:00-17:00",
    "sameAs": [
      "https://www.facebook.com/tanyaadvokat",
      "https://www.instagram.com/tanyaadvokat"
    ]
  };

  return (
    <>
      <Helmet>
        <title>TanyaAdvokat.id | Konsultasi Hukum Profesional & Terpercaya</title>
        <meta name="description" content="TanyaAdvokat.id menyediakan layanan konsultasi hukum, bantuan hukum UMKM, dan panduan hukum terlengkap di Indonesia. Hubungi advokat profesional kami sekarang." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Hero />
      <Welcome />
      <Team />
      <Services />
      <Articles />
      <WhyUs />
      <Testimonials />
      <Partners />
    </>
  );
}


export default HomePage;
