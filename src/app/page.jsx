import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import SectionSkeleton from '@/components/ui/SectionSkeleton';

// Lazy load heavy components
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <SectionSkeleton height="600px" />,
  ssr: true,
});

const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <SectionSkeleton height="700px" />,
  ssr: true,
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <SectionSkeleton height="800px" />,
  ssr: true,
});

const LocationMap = dynamic(() => import('@/components/sections/LocationMap'), {
  loading: () => <SectionSkeleton height="500px" />,
  ssr: true,
});

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
