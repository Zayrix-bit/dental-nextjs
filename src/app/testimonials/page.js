import PageHeader from '@/components/ui/PageHeader';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata = {
  title: 'Patient Reviews | Top Rated Dentist in NY',
  description: 'Read what our patients have to say about their experience. Discover the difference our premium care has made in our patients\' lives and smiles.',
  alternates: {
    canonical: '/testimonials',
  }
};

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader 
          title="Patient Stories" 
          description="Don't just take our word for it. Hear from those who have experienced our care." 
        />
        <div className="pt-20">
          <Testimonials />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
