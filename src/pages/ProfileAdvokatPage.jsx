import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { teamMembers } from '../data/content';
import './ProfileAdvokat.css';

const extendedProfiles = teamMembers.map((member, index) => ({
  ...member,
  education: index % 2 === 0 ? 'Universitas Indonesia' : 'Universitas Gadjah Mada',
  experience: `${10 + index * 2} Tahun`,
  license: `No. ${1000 + index * 123}`,
  bio: `Advokat berpengalaman sebagai ${member.role} dengan dedikasi tinggi dalam memberikan solusi hukum terbaik untuk klien.`,
}));


function ProfileAdvokatPage() {
  return (
    <>
      {/* Banner */}
      <section className="page-banner">
        <div className="container">
          <h1>Profile Advokat</h1>
          <p>Kenali lebih dekat tim advokat profesional kami</p>
        </div>
      </section>

      {/* Profiles */}
      <section className="profiles">
        <div className="container">
          <div className="profiles__grid">
            {extendedProfiles.map((profile, index) => (
              <div key={index} className="profiles__card">
                <div className="profiles__photo">
                  {profile.image ? (
                    <img src={profile.image} alt={profile.name} className="profiles__img" />
                  ) : (
                    <div className="profiles__photo-placeholder">
                      <div className="profiles__silhouette">
                        <div className="profiles__sil-head"></div>
                        <div className="profiles__sil-body"></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="profiles__content">
                  <h3 className="profiles__name">{profile.name}</h3>
                  <span className="profiles__role-badge">{profile.role}</span>
                  <p className="profiles__bio">{profile.bio}</p>
                  <div className="profiles__details">
                    <div className="profiles__detail">
                      <span className="profiles__detail-label">Spesialisasi</span>
                      <span className="profiles__detail-value">{profile.specialty || profile.role}</span>

                    </div>
                    <div className="profiles__detail">
                      <span className="profiles__detail-label">Pendidikan</span>
                      <span className="profiles__detail-value">{profile.education}</span>
                    </div>
                    <div className="profiles__detail">
                      <span className="profiles__detail-label">Pengalaman</span>
                      <span className="profiles__detail-value">{profile.experience}</span>
                    </div>
                    <div className="profiles__detail">
                      <span className="profiles__detail-label">No. Lisensi</span>
                      <span className="profiles__detail-value">{profile.license}</span>
                    </div>
                  </div>
                  <div className="profiles__actions">
                    <a href={profile.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="profiles__link profiles__link--whatsapp"><FaWhatsapp /> WhatsApp</a>
                    <a href="#" className="profiles__link"><FaEnvelope /> Email</a>
                    <a href="#" className="profiles__link"><FaLinkedin /> LinkedIn</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfileAdvokatPage;
