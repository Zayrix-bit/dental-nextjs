import config from '@/config';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';


import {
  TestimonialsSkeleton,
  BeforeAfterSkeleton,
  ContactSkeleton,
  LocationMapSkeleton,
} from '@/components/ui/SectionSkeletons';

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <ContactSkeleton />,
});
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <TestimonialsSkeleton />,
});
const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <BeforeAfterSkeleton />,
});
const LocationMap = dynamic(() => import('@/components/sections/LocationMap'), {
  loading: () => <LocationMapSkeleton />,
});

export const metadata = {
  title: config.pages.home.title,
  description: config.pages.home.description,
  alternates: {
    canonical: '/',
  }
};

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <Services isHomePage={true} />
        <WhyChooseUs />
        <Testimonials />
        <BeforeAfter />
        <FAQ />
        <Contact />
        <LocationMap />
      </main>
      <Footer />

    </>
  );
}
