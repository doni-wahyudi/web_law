import Hero from '../components/Hero';
import Welcome from '../components/Welcome';
import Team from '../components/Team';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import Articles from '../components/Articles';
import Partners from '../components/Partners';

function HomePage() {
  return (
    <>
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
