import PageHeader from '@/components/ui/PageHeader';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata = {
  title: 'Smile Gallery | Dental Before & After Photos NY',
  description: 'View real results from our patients. See stunning before and after transformations achieved by our expert dental team in New York.',
  alternates: {
    canonical: '/gallery',
  }
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader 
          title="Smile Gallery" 
          description="Transformations that bring confidence. See the stunning results achieved by our expert team." 
        />
        <div className="pt-20">
          <BeforeAfter />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
