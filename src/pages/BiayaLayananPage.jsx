import { FaWhatsapp, FaCheck } from 'react-icons/fa';
import { pricingPlans, siteConfig } from '../data/content';
import './BiayaLayanan.css';

function BiayaLayananPage() {
  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <h1>Biaya Layanan</h1>
          <p>Pilih paket layanan hukum yang sesuai dengan kebutuhan Anda</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing">
        <div className="container">
          <div className="pricing__grid">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`pricing__card ${plan.popular ? 'pricing__card--popular' : ''}`}
              >
                {plan.popular && (
                  <div className="pricing__badge">Paling Populer</div>
                )}
                <h3 className="pricing__title">{plan.title}</h3>
                <div className="pricing__price">
                  <span className="pricing__amount">{plan.price}</span>
                  <span className="pricing__period">{plan.period}</span>
                </div>
                <ul className="pricing__features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <FaCheck className="pricing__check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/6281368936945?text=${encodeURIComponent(`Halo TanyaAdvokat, saya tertarik untuk memilih paket ${plan.title}`)}`}
                  className={`pricing__cta ${plan.popular ? 'pricing__cta--primary' : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                  Pilih Paket
                </a>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="pricing__info">
            <h3>Informasi Tambahan</h3>
            <div className="pricing__info-grid">
              <div className="pricing__info-card">
                <h4>Konsultasi Gratis</h4>
                <p>Dapatkan konsultasi awal gratis selama 15 menit untuk mengetahui langkah hukum terbaik untuk kasus Anda.</p>
              </div>
              <div className="pricing__info-card">
                <h4>Pembayaran Fleksibel</h4>
                <p>Kami menyediakan opsi pembayaran yang fleksibel, termasuk cicilan untuk kasus-kasus tertentu.</p>
              </div>
              <div className="pricing__info-card">
                <h4>Garansi Kepuasan</h4>
                <p>Jika Anda tidak puas dengan layanan konsultasi, kami memberikan jaminan pengembalian dana.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BiayaLayananPage;
