import { FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '../data/content';
import './Testimonials.css';

function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">Apa Kata Klien Kami</h2>
        <p className="section-subtitle">
          Testimoni dari klien yang telah menggunakan layanan kami
        </p>

        <div className="testimonials__grid">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="testimonials__card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="testimonials__quote-icon">
                <FaQuoteLeft />
              </div>
              <p className="testimonials__text">{item.text}</p>
              <div className="testimonials__author">
                <div className="testimonials__avatar">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="testimonials__name">{item.name}</h4>
                  <span className="testimonials__role">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
