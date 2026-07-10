import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Gallery from "./components/Gallery";
import Courses from "./components/Courses";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Booking />
      <Gallery />
      <Courses />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </>
  );
}