import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Testimonials from '@/components/sections/Testimonials';
import BeforeAfter from '@/components/sections/BeforeAfter';
import LocationMap from '@/components/sections/LocationMap';
import Contact from '@/components/sections/Contact';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata = {
  title: 'Premium Dental Care in New York',
  description: 'Experience the perfect synthesis of advanced technology and compassionate care. Book an appointment today for exceptional dental services.',
  alternates: {
    canonical: '/',
  }
};


export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <BeforeAfter />
        <Contact />
        <LocationMap />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
