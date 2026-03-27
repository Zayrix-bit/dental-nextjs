import PageHeader from '@/components/ui/PageHeader';
import Services from '@/components/sections/Services';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata = {
  title: 'Cosmetic & General Dental Services in NY',
  description: 'Explore our comprehensive range of premium dental services including General Dentistry, Cosmetic Dentistry, Orthodontics, and Implants.',
  alternates: {
    canonical: '/services',
  }
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader 
          title="Our Services" 
          description="Experience world-class dental care with our comprehensive range of advanced treatments." 
        />
        <div className="pt-20">
          <Services />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
