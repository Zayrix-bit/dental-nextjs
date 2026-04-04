"use client";

import { useState, useEffect, useRef } from "react";
import { siteInfo, ALL_SERVICES, TIME_SLOTS } from "@/data/siteData";

/* ── Static Data ── */

const CONTACT_METHODS = [
  {
    id: "phone",
    label: "Voice Call",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.2 2 2 0 012.2 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp Chat",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .006 5.408 0 12.045c0 2.12.554 4.189 1.605 6.006L0 24l6.117-1.605A11.803 11.803 0 0012.05 24c6.604 0 12.003-5.402 12.006-12.007a11.93 11.93 0 00-3.614-8.471" />
      </svg>
    ),
  },
];

/* ── Validation ── */
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your full name.";
  if (!form.email.trim()) errors.email = "We need your email to send the confirmation.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "That doesn't look like a valid email address.";
  if (!form.phone.trim()) errors.phone = "A valid phone number is required.";
  else if (!/^\+?[0-9\s\-()]{7,20}$/.test(form.phone))
    errors.phone = "Please enter a standard phone number (7+ digits).";
  if (!form.service) errors.service = "Selecting a service helps us prepare for your visit.";
  if (!form.date) errors.date = "Please choose a date from our calendar.";
  if (!form.time) errors.time = "Choosing a time slot is mandatory for scheduling.";
  return errors;
}

/* ── Reusable Input Wrapper ── */
function Field({ label, htmlFor, required, optional, error, children }) {
  const LabelTag = htmlFor ? 'label' : 'div';
  return (
    <div className="flex flex-col gap-1">
      <LabelTag {...(htmlFor ? { htmlFor } : {})} className="text-xs font-bold text-text-dark mb-0.5 block tracking-tight uppercase opacity-85">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
        {optional && <span className="text-slate-400 font-normal ml-1 lowercase">(optional)</span>}
      </LabelTag>
      {children}
      {error && (
        <span className="text-[11px] text-red-500 font-bold animate-[fadeInUp_0.2s_ease] mt-0.5 flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 stroke-[#7DD3F8]">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 stroke-[#7DD3F8]">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.2 2 2 0 012.2 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 stroke-[#7DD3F8]">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[15px] h-[15px]">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 pointer-events-none stroke-slate-400">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const inputBase =
  "w-full text-[13px] lg:text-[14px] font-medium text-text-dark bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-primary focus:shadow-[0_0_0_1px_rgba(10,58,92,0.1)]";

const inputError =
  "border-red-300 bg-red-50/40 shadow-sm focus:border-red-400";

export default function Contact({ className = "" }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    service: "", date: "", time: "",
    contactMethod: "phone", message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [today, setToday] = useState("");

  /* ── Premium High-End Micro-Interaction Logic ── */
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    let timeoutId;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          // Refined delay (150ms) as per UX motion guidelines
          timeoutId = setTimeout(() => {
            setHasTriggered(true);
          }, 150);

          observer.disconnect();
        }
      },
      { threshold: 0.6 } // Subtle trigger point at 60% visibility
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasTriggered]);

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error for better UX
      const firstErr = Object.keys(errs)[0];
      document.getElementById(firstErr)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: form.service,
        date: form.date,
        time: form.time,
        message: form.message.trim(),
      };

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || data?.message || "Failed to send email");

      setSubmitted(true);
    } catch (err) {
      setApiError(err.message || "Unable to submit appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrors({});
    setApiError("");
    setForm({
      name: "", email: "", phone: "",
      service: "", date: "", time: "",
      contactMethod: "phone", message: "",
    });
  };

  if (submitted) {
    return (
      <section id="appointment" className="py-12 lg:py-20 bg-clinical px-4">
        <div className={`max-w-md mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-10 flex flex-col items-center text-center animate-[fadeInUp_0.5s_ease] ${className}`}>
          <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mb-6 text-emerald-500">
            <CheckCircleIcon />
          </div>
          <h3 className="text-2xl lg:text-3xl font-black text-text-dark mb-3 tracking-tight">
            Consultation Scheduled!
          </h3>
          <p className="text-[15px] text-text-light leading-relaxed mb-8">
            Thank you, <strong className="text-primary-dark font-bold">{form.name}</strong>. We will reach out via{" "}
            <strong className="text-secondary-dark font-bold underline decoration-accent/30">{form.contactMethod}</strong> shortly to finalize your visit.
          </p>
          <button
            onClick={resetForm}
            className="btn-primary w-full py-4 rounded-xl font-bold tracking-wide uppercase transition-all duration-200"
          >
            Start New Booking
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 lg:py-16 bg-clinical px-4 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 relative z-10 mb-14 text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-text-dark leading-[1.1] tracking-tight mb-6">
          Schedule Your Private <span className="text-primary">Consultation.</span>
        </h2>
        <p className="text-slate-500 text-[0.9rem] md:text-[1rem] leading-relaxed font-medium mb-8 max-w-2xl">
          Begin your journey towards a clinical masterpiece. Our coordinators will contact you within 12 hours.
        </p>
      </div>

      <div
        id="appointment"
        ref={sectionRef}
        className={`scroll-mt-5 max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] bg-white rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 transition-all duration-500 ${className}`}
      >

        <aside className="relative bg-linear-to-br from-primary to-primary-dark p-8 flex flex-col overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-accent opacity-20 blur-[50px] pointer-events-none" />

          <h3 className="relative z-10 text-2xl lg:text-[26px] font-black text-white leading-tight mb-3">
            Premium Consultation.
          </h3>
          <p className="relative z-10 text-[13px] lg:text-[14px] text-white/75 leading-relaxed mb-10 font-medium">
            Entrust your smile to experts. Select your preferred slot and we will handle the rest.
          </p>

          <div className="relative z-10 flex flex-col gap-6 flex-1">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                <MapPinIcon />
              </div>
              <div className="pt-0.5">
                <strong className="block text-[11px] font-black text-accent tracking-widest uppercase mb-1">Our Studio</strong>
                <span className="text-[13px] lg:text-[14px] text-white/95 leading-relaxed font-medium">{siteInfo.address.street}, {siteInfo.address.city}</span>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 shadow-inner text-white">
                <PhoneIcon className="w-5 h-5" />
              </div>
              <div className="pt-0.5">
                <strong className="block text-[11px] font-black text-accent tracking-widest uppercase mb-1">Inquiries</strong>
                <span className="text-[14px] lg:text-[15px] text-white font-bold">{siteInfo.phone}</span>
              </div>
            </div>

            {/* Compact Professional WhatsApp CTA */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-1.5">
              <p className="text-[11px] text-white/50 font-medium tracking-wide leading-snug">
                Quick inquiry? <span className="text-white/80">Skip the form</span> and chat now.
              </p>
              <a
                href={siteInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl text-[13px] font-bold tracking-tight shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 overflow-hidden ${hasTriggered ? 'animate-whatsapp-giggle' : ''}`}
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Chat
              </a>
            </div>
          </div>
        </aside>

        <form className="p-8 lg:p-10 flex flex-col gap-5 bg-white relative z-10" onSubmit={handleSubmit} noValidate>
          {apiError && (
            <div className="bg-red-50 text-red-800 text-[13px] font-bold px-4 py-3 rounded-xl border-l-4 border-red-500 mb-2 shadow-sm">
              {apiError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Patient Name" htmlFor="name" required error={errors.name}>
              <input
                id="name"
                name="name"
                placeholder="Ex. Alexander Hamilton"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                className={`${inputBase} ${errors.name ? inputError : ""}`}
              />
            </Field>
            <Field label="Secure Phone" htmlFor="phone" required error={errors.phone}>
              <input
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                disabled={loading}
                className={`${inputBase} ${errors.phone ? inputError : ""}`}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Email Address" htmlFor="email" required error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="client@concierge.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                className={`${inputBase} ${errors.email ? inputError : ""}`}
              />
            </Field>
            <Field label="Service Selection" htmlFor="service" required error={errors.service}>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  disabled={loading}
                  className={`${inputBase} appearance-none cursor-pointer pr-10 ${errors.service ? inputError : ""}`}
                >
                  <option value="">Choose a treatment...</option>
                  {ALL_SERVICES.map((s) => (
                    <option key={s.label} value={s.label}>{s.label}</option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  <ChevronDownIcon />
                </span>
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Consultation Date" htmlFor="date" required error={errors.date}>
              <input
                id="date"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={today}
                disabled={loading}
                className={`${inputBase} ${errors.date ? inputError : ""}`}
              />
            </Field>
            <Field label="Available Time" htmlFor="time" required error={errors.time}>
              <div className="relative">
                <select
                  id="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  disabled={loading}
                  className={`${inputBase} appearance-none cursor-pointer pr-10 ${errors.time ? inputError : ""}`}
                >
                  <option value="">Pick a slot...</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                  <ChevronDownIcon />
                </span>
              </div>
            </Field>
          </div>

          <Field label="Messenger Preferences">
            <div className="flex gap-4">
              {CONTACT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={`flex-1 flex flex-col justify-center items-center gap-2 py-3 px-2 rounded-xl border-2 cursor-pointer transition-all duration-300 text-[12px] font-bold select-none text-center
                    ${form.contactMethod === m.id
                      ? "border-accent bg-accent/5 text-primary-dark"
                      : "border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  <input type="radio" name="contactMethod" value={m.id} checked={form.contactMethod === m.id} onChange={handleChange} className="sr-only" />
                  <span className={`transition-colors duration-300 ${form.contactMethod === m.id ? "text-accent" : "text-slate-400"}`}>
                    {m.icon}
                  </span>
                  {m.label}
                </label>
              ))}
            </div>
          </Field>

          <footer className="flex items-center justify-between gap-6 flex-wrap mt-4">
            <div className="flex items-center gap-3 flex-1 min-w-[200px]">
              <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-[14px] h-[14px]">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <p className="text-[12px] font-semibold text-slate-500 leading-tight">
                Encrypted & <strong>Client-Confidential</strong>.
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 text-white text-[14px] font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-primary/20 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Confirming...
                </>
              ) : (
                <>
                  <SendIcon />
                  Confirm Appointment
                </>
              )}
            </button>
          </footer>
        </form>
      </div>
    </section>
  );
}