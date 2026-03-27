import PageHeader from '@/components/ui/PageHeader';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata = {
  title: 'About Our Dental Clinic in NY',
  description: 'Learn why DentalCare is the right choice for your smile. Board-certified dentists with decades of combined expertise in New York.',
  alternates: {
    canonical: '/about',
  }
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader 
          title="About DentalCare" 
          description="Committed to providing exceptional dental care with state-of-the-art technology and a patient-first approach." 
        />
        <div className="pt-20 pb-20">
          <WhyChooseUs />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
