import Feature from "../components/feature/Feature";
import Footer from "../components/footer/Footer";
import Banner from "../components/home/Banner";
import Hero from "../components/home/Hero";
import Testimonial from "../components/testimonial/Testimonial";
const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Feature />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
