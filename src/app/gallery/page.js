import config from '@/config';
import PageHeader from '@/components/ui/PageHeader';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';


export const metadata = {
  title: config.pages.gallery.title,
  description: config.pages.gallery.description,
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
          title={config.pages.gallery.pageHeader.title}
          description={config.pages.gallery.pageHeader.description}
        />
        <div className="pt-20">
          <BeforeAfter />
        </div>
      </main>
      <Footer />

    </>
  );
}
