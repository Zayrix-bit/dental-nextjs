import config from '@/config';
import PageHeader from '@/components/ui/PageHeader';
import ExtendedContact from '@/components/sections/ExtendedContact';
import LocationMap from '@/components/sections/LocationMap';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';


export const metadata = {
  title: config.pages.contact.title,
  description: config.pages.contact.description,
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
          title={config.pages.contact.pageHeader.title}
          description={config.pages.contact.pageHeader.description}
        />
        <div className="bg-[var(--color-bg-light)]">
          <ExtendedContact />
        </div>
        <LocationMap />
      </main>
      <Footer />

    </>
  );
}
