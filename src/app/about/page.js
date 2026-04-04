import config from '@/config';
import PageHeader from '@/components/ui/PageHeader';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';


export const metadata = {
  title: config.pages.about.title,
  description: config.pages.about.description,
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
          title={config.pages.about.pageHeader.title}
          description={config.pages.about.pageHeader.description}
        />
        <div className="pt-20 pb-20">
          <WhyChooseUs />
        </div>
      </main>
      <Footer />

    </>
  );
}
