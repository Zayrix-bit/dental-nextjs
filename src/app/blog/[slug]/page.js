import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { blogPosts } from '@/data/blogData';

/* Import all article content components */
import GeneralCheckup from './articles/general-checkup-and-cleaning';
import TeethWhitening from './articles/teeth-whitening';
import RootCanal from './articles/root-canal-treatment';
import DentalImplants from './articles/dental-implants';
import BracesInvisalign from './articles/braces-and-invisalign';
import ToothExtraction from './articles/tooth-extraction';
import Veneers from './articles/veneers-and-cosmetic-dentistry';
import PediatricDentistry from './articles/pediatric-dentistry';
import EmergencyCare from './articles/emergency-dental-care';

const articleComponents = {
  'general-checkup-and-cleaning': GeneralCheckup,
  'teeth-whitening': TeethWhitening,
  'root-canal-treatment': RootCanal,
  'dental-implants': DentalImplants,
  'braces-and-invisalign': BracesInvisalign,
  'tooth-extraction': ToothExtraction,
  'veneers-and-cosmetic-dentistry': Veneers,
  'pediatric-dentistry': PediatricDentistry,
  'emergency-dental-care': EmergencyCare,
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | DentalCare Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const ArticleContent = articleComponents[slug];
  if (!ArticleContent) notFound();

  return (
    <>
      <Header />
      <main>
        {/* Header */}
        <section className="relative pt-[110px] pb-[36px] overflow-hidden bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] border-b border-white/10 text-white px-4">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-[-10%] w-[300px] h-[300px] bg-[var(--color-primary)]/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-[var(--color-accent)]/5 rounded-full blur-[80px]" />
          </div>
          <div className="max-w-[1200px] mx-auto relative z-10">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[12px] text-white/60 hover:text-white mb-4 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="15 18 9 12 15 6"/></svg>
              Back to Blog
            </Link>
            <div className="w-10 h-1 bg-[var(--color-accent)] mb-4 rounded-full opacity-80" />
            <span className="block text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-accent)] mb-2">
              {post.service}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight mb-3 text-white">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-[13px] text-white/55">
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="py-12 lg:py-16 bg-[var(--color-bg-light)] px-4">
          <article className="max-w-3xl mx-auto prose-dental">
            <ArticleContent />
          </article>

          {/* CTA */}
          <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl border border-[rgba(160,210,235,0.2)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-center">
            <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">Have Questions About {post.service}?</h3>
            <p className="text-[var(--color-text-light)] text-[15px] mb-5">Our team is here to help. Book a consultation and get personalized advice.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary-dark)] text-white font-semibold text-[15px] py-3.5 px-8 rounded-xl shadow-[0_4px_16px_rgba(79,195,247,0.3)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Book a Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
