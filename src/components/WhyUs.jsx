import { FaAward, FaBolt, FaCheckCircle } from 'react-icons/fa';
import { whyUsItems } from '../data/content';
import './WhyUs.css';

const iconMap = {
  'award': FaAward,
  'zap': FaBolt,
  'check-circle': FaCheckCircle,
};

function WhyUs() {
  return (
    <section className="whyus" id="whyus">
      <div className="container">
        <h2 className="section-title">Mengapa Memilih TanyaAdvokat.id?</h2>
        <p className="section-subtitle">
          Komitmen kami untuk memberikan <strong>layanan hukum terbaik dan terpercaya</strong>
        </p>

        <div className="whyus__grid">
          {whyUsItems.map((item, index) => {
            const IconComponent = iconMap[item.icon] || FaAward;
            return (
              <div key={index} className="whyus__card">
                <div className="whyus__icon">
                  <IconComponent />
                </div>
                <h3 className="whyus__title">{item.title}</h3>
                <p className="whyus__desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
