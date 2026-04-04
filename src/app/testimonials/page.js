import config from '@/config';
import PageHeader from '@/components/ui/PageHeader';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';


export const metadata = {
  title: config.pages.testimonials.title,
  description: config.pages.testimonials.description,
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
          title={config.pages.testimonials.pageHeader.title}
          description={config.pages.testimonials.pageHeader.description}
        />
        <div className="pt-20">
          <Testimonials />
        </div>
      </main>
      <Footer />

    </>
  );
}
