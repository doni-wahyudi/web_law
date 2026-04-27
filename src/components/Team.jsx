import { FaLinkedinIn, FaWhatsapp, FaMapMarkerAlt, FaBalanceScale, FaBriefcase, FaBullseye, FaLightbulb, FaCheck } from 'react-icons/fa';
import { teamMembers } from '../data/content';
import './Team.css';

function Team() {
  return (
    <section className="team" id="team">
      <div className="container">
        <h2 className="section-title">Tim Mitra TanyaAdvokat</h2>
        <p className="section-subtitle">
          Tim advokat profesional dan berpengalaman yang siap membantu Anda
        </p>

        <div className="team__grid">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team__card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="team__photo">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="team__img" 
                    style={{ objectPosition: member.objectPosition || 'center center' }}
                  />
                ) : (
                  <div className="team__photo-placeholder">
                    <div className="team__silhouette">
                      <div className="team__silhouette-head"></div>
                      <div className="team__silhouette-body"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="team__info">
                <h3 className="team__name">{member.name}</h3>
                <span className="team__role">{member.role}</span>
                
                <div className="team__socials">
                  <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="team__social-icon" aria-label="LinkedIn">
                    <FaLinkedinIn />
                  </a>
                  <a href={member.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="team__social-icon" aria-label="WhatsApp">
                    <FaWhatsapp />
                  </a>
                </div>

                <div className="team__details">
                  <div className="team__meta">
                    <div className="team__meta-item">
                      <FaMapMarkerAlt className="team__meta-icon" />
                      <span>{member.location}</span>
                    </div>
                    <div className="team__meta-item">
                      <FaBalanceScale className="team__meta-icon" />
                      <span>{member.organization}</span>
                    </div>
                    <div className="team__meta-item">
                      <FaBriefcase className="team__meta-icon" />
                      <span>{member.experience}</span>
                    </div>
                  </div>

                  <div className="team__expertise">
                    <div className="team__section-title">
                      <FaBullseye className="team__section-icon" />
                      <span>Bidang Keahlian:</span>
                    </div>
                    <ul className="team__expertise-list">
                      {member.expertise.map((item, idx) => (
                        <li key={idx} className="team__expertise-item">
                          <FaCheck className="team__check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="team__about">
                    <div className="team__section-title">
                      <FaLightbulb className="team__section-icon" />
                      <span>Tentang Konsultasi:</span>
                    </div>
                    <p className="team__about-text">{member.about}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
