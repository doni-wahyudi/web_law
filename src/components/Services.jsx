import { FaHeartBroken, FaScroll, FaBriefcase, FaShieldAlt, FaMapMarkedAlt, FaUsers, FaFileContract, FaStore } from 'react-icons/fa';
import { services } from '../data/content';
import './Services.css';

const iconMap = {
  'heart-crack': FaHeartBroken,
  'scroll': FaScroll,
  'briefcase': FaBriefcase,
  'shield': FaShieldAlt,
  'map': FaMapMarkedAlt,
  'users': FaUsers,
  'file-text': FaFileContract,
  'building': FaStore,
};

function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Layanan Kami</h2>
        <p className="section-subtitle">
          Berbagai layanan hukum profesional untuk memenuhi kebutuhan Anda
        </p>

        <div className="services__grid">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FaBriefcase;
            return (
              <div
                key={index}
                className="services__card"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="services__icon">
                  <IconComponent />
                </div>
                <h3 className="services__title">{service.title}</h3>
                <p className="services__desc">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
