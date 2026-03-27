import PageHeader from '@/components/ui/PageHeader';
import ExtendedContact from '@/components/sections/ExtendedContact';
import LocationMap from '@/components/sections/LocationMap';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata = {
  title: 'Contact Our Dental Clinic | NY Dentist Appointment',
  description: 'Get in touch with DentalCare to book your appointment. We offer 24/7 emergency dental care in New York.',
  alternates: {
    canonical: '/contact',
  }
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader 
          title="Contact Us" 
          description="We're here for you. Reach out to schedule an appointment or ask any questions." 
        />
        <div className="bg-[var(--color-bg-light)]">
          <ExtendedContact />
        </div>
        <LocationMap />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
