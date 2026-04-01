import { notFound } from 'next/navigation';
import { services } from '@/data/siteData';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle2, ArrowRight, Clock, Star, PhoneCall, 
  ChevronRight, Activity, CalendarDays, ShieldCheck 
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ScrollReveal from '@/components/ScrollReveal';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Treatment Not Found' };
  
  return {
    title: `${service.title} in NY | Premium DentalCare`,
    description: service.shortDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    }
  };
}

export default async function TreatmentPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  
  if (!service) {
    notFound();
  }

  // Get related treatments
  const relatedTreatments = service.relatedTreatments 
    ? service.relatedTreatments.map(slug => services.find(s => s.slug === slug)).filter(Boolean)
    : [];

  // Schema Markup
  const faqSchema = service.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Header />
      
      <main className="bg-zinc-50 pt-16 md:pt-20 lg:pt-24 pb-16 min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-[1200px] mx-auto px-6 py-4 relative z-20">
          <div className="flex items-center text-[0.7rem] md:text-sm text-slate-500 font-medium tracking-wide">
            <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 mx-2 text-slate-300" />
            <Link href="/services" className="hover:text-[var(--color-primary)] transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3 mx-2 text-slate-300" />
            <span className="text-[var(--color-primary)] font-semibold">{service.title}</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 mb-16 lg:mb-24">
          <div className="relative rounded-[20px] lg:rounded-[3rem] overflow-hidden bg-primary shadow-2xl flex flex-col md:flex-row min-h-0 md:min-h-[460px] lg:min-h-[540px] items-stretch">
            
            {/* Image Side (Shows at Top on Mobile, Right on Desktop) */}
            <div className="relative w-full md:w-1/2 h-[220px] md:h-auto md:min-h-full order-1 md:order-2 overflow-hidden bg-slate-900/10">
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary via-primary/50 to-transparent z-10 w-full md:w-[40%] h-1/2 md:h-full bottom-0 md:bottom-auto pointer-events-none"></div>
              <Image 
                src={service.image} 
                alt={service.title}
                fill
                className="object-cover z-0"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={75}
              />
            </div>

            {/* Content Side (Always First on Mobile for UX, First on Desktop for Layout) */}
            <div className="relative w-full md:w-1/2 px-6 py-10 md:p-10 lg:p-14 xl:p-16 flex flex-col justify-center z-20 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm mb-6 w-fit">
                <service.icon className="w-3.5 h-3.5" />
                Premium Care
              </div>
              
              <h1 className="text-[1.75rem] sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-[1.2] tracking-tight">
                {service.title}
              </h1>
              
              <p className="text-blue-50/90 text-sm lg:text-base xl:text-lg leading-relaxed mb-8 max-w-xl">
                {service.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link href="/contact" className="bg-white text-primary px-8 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 shrink-0">
                  Book Consultation <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+15551234567" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all shrink-0">
                  <PhoneCall className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* HIGHLIGHTS BAR */}
        {service.highlights && (
          <section className="max-w-[1000px] mx-auto px-4 md:px-6 mb-16 lg:mb-24 relative -mt-24 z-30 hidden md:block">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 lg:p-8 flex flex-wrap justify-between items-center gap-6 divide-x divide-slate-100">
              <div className="flex flex-col pl-4 first:pl-0 flex-1">
                <div className="flex items-center gap-2 text-slate-400 mb-1.5">
                  <Clock className="w-4 h-4 stroke-[2.5]" /> <span className="text-xs font-bold uppercase tracking-wider">Duration</span>
                </div>
                <div className="text-[var(--color-text-dark)] font-black text-xl">{service.highlights.duration}</div>
              </div>
              <div className="flex flex-col pl-8 flex-1">
                <div className="flex items-center gap-2 text-slate-400 mb-1.5">
                  <Activity className="w-4 h-4 stroke-[2.5]" /> <span className="text-xs font-bold uppercase tracking-wider">Pain Level</span>
                </div>
                <div className="text-[var(--color-text-dark)] font-black text-xl">{service.highlights.painLevel}</div>
              </div>
              <div className="flex flex-col pl-8 flex-1">
                <div className="flex items-center gap-2 text-slate-400 mb-1.5">
                  <CalendarDays className="w-4 h-4 stroke-[2.5]" /> <span className="text-xs font-bold uppercase tracking-wider">Recovery</span>
                </div>
                <div className="text-[var(--color-text-dark)] font-black text-xl">{service.highlights.recovery}</div>
              </div>
            </div>
          </section>
        )}

        {/* CONTENT & SIDEBAR */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 mb-16 lg:mb-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* MAIN CONTENT (Left) */}
            <div className="w-full lg:w-2/3">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-black text-[var(--color-text-dark)] mb-6 tracking-tight">Overview</h2>
                <div className="prose prose-lg text-[var(--color-text-light)] max-w-none mb-12">
                  {service.longDescription.map((p, idx) => (
                    <p key={idx} className="mb-5 leading-relaxed text-[1.05rem]">{p}</p>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-dark)] mb-8 flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-emerald-500" /> Key Benefits
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-y-5 gap-x-6">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)] shrink-0 mt-0.5" />
                        <span className="text-[var(--color-text-dark)] font-semibold">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-black text-[var(--color-text-dark)] mb-10 tracking-tight">The Procedure</h2>
                <div className="space-y-6 lg:space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-[1px] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-primary)]/20 before:to-transparent">
                  {service.procedure.map((step, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-[4px] border-white bg-[var(--color-primary)] text-white font-black text-xl shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                        {step.step}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 md:p-8 rounded-[1.5rem] shadow-sm border border-slate-100 group-hover:border-[var(--color-primary)]/30 group-hover:shadow-md transition-all duration-300">
                        <h3 className="font-bold text-[var(--color-text-dark)] text-xl mb-3">{step.title}</h3>
                        <p className="text-[var(--color-text-light)] leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* FAQs */}
              {service.faqs && (
                <ScrollReveal className="mt-20">
                  <h2 className="text-3xl md:text-4xl font-black text-[var(--color-text-dark)] mb-10 tracking-tight">Frequently Asked Questions</h2>
                  <div className="space-y-5">
                    {service.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white hover:bg-zinc-50 transition-colors rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-bold text-[var(--color-text-dark)] text-lg mb-3 flex items-start gap-3">
                          <span className="text-[var(--color-primary)] font-black text-xl">Q.</span>
                          {faq.question}
                        </h3>
                        <p className="text-[var(--color-text-light)] leading-relaxed pl-8 border-l-2 border-[var(--color-primary)]/20 ml-1">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* SIDEBAR (Right - Sticky CTA) */}
            <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
              <div className="sticky top-28 space-y-6">
                <div className="bg-[var(--color-primary)] text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <h3 className="text-2xl font-black mb-4 leading-tight tracking-tight">Ready for your transformation?</h3>
                  <p className="text-blue-100 mb-8 leading-relaxed text-sm">
                    Schedule your private consultation today and take the first step towards a perfect, healthy smile.
                  </p>
                  
                  <Link href="/contact" className="block w-full bg-white text-[var(--color-primary)] text-center py-4 rounded-xl font-black mb-4 hover:bg-slate-50 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    Book Appointment
                  </Link>
                  <a href="tel:+15551234567" className="block w-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-center py-4 rounded-xl font-bold hover:bg-white/20 transition-colors">
                    Call (555) 123-4567
                  </a>
                </div>

                <div className="bg-white rounded-[2rem] p-8 shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />)}
                    </div>
                    <span className="font-bold text-[var(--color-text-dark)] text-lg">5.0</span>
                  </div>
                  <p className="text-[var(--color-text-light)] italic text-sm mb-5 leading-relaxed">
                    "The best dental experience I've ever had. Truly painless and the results are unbelievable. High-end all the way."
                  </p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest pl-4 border-l-2 border-[var(--color-primary)]">— Verified Patient</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* RELATED TREATMENTS */}
        {relatedTreatments.length > 0 && (
          <section className="bg-white py-16 lg:py-24 border-t border-slate-100 border-b">
            <div className="max-w-[1200px] mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-black text-[var(--color-text-dark)] mb-2 tracking-tight">Related Treatments</h2>
                  <p className="text-[var(--color-text-light)]">Explore other services that complement your comprehensive care.</p>
                </div>
                <Link href="/services" className="hidden md:flex items-center gap-2 text-[var(--color-primary)] font-bold hover:gap-3 transition-all shrink-0">
                  View All Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {relatedTreatments.map(rel => (
                  <Link key={rel.slug} href={`/services/${rel.slug}`} className="group block h-full">
                    <div className="bg-slate-50 rounded-[2rem] overflow-hidden h-full border border-slate-100 transition-all duration-300 hover:shadow-xl hover:border-[var(--color-primary)]/20 hover:-translate-y-1 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A3A5C]/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                        <Image src={rel.image} alt={rel.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" quality={75} />
                        <div className="absolute bottom-4 left-4 z-20 w-10 h-10 bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                          <rel.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="p-6 md:p-8 relative z-20">
                        <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-3 group-hover:text-[var(--color-primary)] transition-colors leading-tight">{rel.title}</h3>
                        <p className="text-[var(--color-text-light)] line-clamp-2 text-sm md:text-[0.9rem] mb-6 leading-relaxed">{rel.shortDescription || rel.description}</p>
                        <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm tracking-wide uppercase">
                          Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      
      <Footer />
      <WhatsAppButton />
    </>
  );
}
