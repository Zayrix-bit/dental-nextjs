import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { blogPosts } from '@/data/blogData';

export const metadata = {
  title: 'Dental Health Blog | Expert Oral Care Tips & Guides',
  description: 'Expert dental advice, treatment guides, and oral health tips from our experienced team of dentists in New York.',
  alternates: {
    canonical: '/blog',
  }
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative pt-[110px] pb-[36px] overflow-hidden bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] border-b border-white/10 text-center px-4">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-[-10%] w-[300px] h-[300px] bg-[var(--color-primary)]/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-[var(--color-accent)]/5 rounded-full blur-[80px]" />
          </div>
          <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
            <div className="w-10 h-1 bg-[var(--color-accent)] mb-4 rounded-full opacity-80" />
            <span className="inline-block text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-accent)] mb-2">
              Our Blog
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
              Dental Health Insights
            </h1>
            <p className="text-white/60 text-[1.05rem] max-w-2xl leading-relaxed">
              Practical advice and honest treatment guides written by our dentists — not marketing teams.
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 lg:py-24 bg-[var(--color-bg-light)] px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[rgba(160,210,235,0.2)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[11px] font-semibold tracking-wide uppercase text-[var(--color-accent)] mb-2">
                    {post.service}
                  </span>
                  <h2 className="text-[1.05rem] font-bold text-[var(--color-text-dark)] leading-snug mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-[0.85rem] text-[var(--color-text-light)] leading-relaxed mb-4 flex-1">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-[0.78rem] text-[var(--color-text-light)]">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
