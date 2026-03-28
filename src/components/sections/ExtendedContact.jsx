"use client";

import { useState } from "react";
import { siteInfo } from "@/data/siteData";

/* ── Static Data ── */
const SERVICES = [
  "General Checkup & Cleaning",
  "Teeth Whitening",
  "Root Canal Treatment (RCT)",
  "Dental Implants",
  "Braces / Invisalign",
  "Tooth Extraction",
  "Veneers & Cosmetic Dentistry",
  "Pediatric Dentistry",
  "Emergency Dental Care",
  "Other",
];

const TIME_SLOTS = [
  "09:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "02:00 PM – 03:00 PM",
  "03:00 PM – 04:00 PM",
  "05:00 PM – 06:00 PM",
];

const CONTACT_METHODS = [
  {
    id: "phone",
    label: "Call",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.2 2 2 0 012.2 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .006 5.408 0 12.045c0 2.12.554 4.189 1.605 6.006L0 24l6.117-1.605A11.803 11.803 0 0012.05 24c6.604 0 12.003-5.402 12.006-12.007a11.93 11.93 0 00-3.614-8.471" />
      </svg>
    ),
  },
];

/* ── Validation ── */
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Full name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address";
  if (!form.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^\+?[0-9\s\-()]{7,20}$/.test(form.phone))
    errors.phone = "Enter a valid phone number";
  if (!form.service) errors.service = "Please select a service";
  if (!form.date) errors.date = "Please pick a preferred date";
  if (!form.time) errors.time = "Please select a preferred time";
  return errors;
}

/* ── Reusable Input Wrapper ── */
function Field({ label, required, optional, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-text-dark">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
        {optional && <span className="text-text-light font-normal ml-1">(optional)</span>}
      </label>
      {children}
      {error && (
        <span className="text-[12px] text-red-500 font-medium animate-[fadeIn_0.2s_ease]">{error}</span>
      )}
    </div>
  );
}

/* ── SVG Icons ── */
const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-accent">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-accent">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.2 2 2 0 012.2 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-accent">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 pointer-events-none stroke-gray-400">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Shared input styles ── */
const inputBase =
  "w-full text-[15px] font-normal text-text-dark bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-slate-300 focus:bg-white focus:border-primary focus:shadow-[0_4px_20px_rgba(10,58,92,0.08)]";

const inputError =
  "border-red-400 bg-red-50/60 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]";

/* ════════════════════════════════════════════════
   EXTENDED CONTACT COMPONENT  (for /contact page)
   ════════════════════════════════════════════════ */
export default function ExtendedContact({ className = "" }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    service: "", date: "", time: "",
    contactMethod: "phone", message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const selectedDateTime = new Date(`${form.date} ${form.time}`);
    if (selectedDateTime < new Date()) {
      setErrors((prev) => ({ ...prev, time: "Please select a future time" }));
      return;
    }

    setLoading(true);
    try {
      const nameParts = form.name.trim().split(/\s+/);
      const payload = {
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(" "),
        email: form.email,
        phone: form.phone,
        service: form.service,
        date: form.date,
        message: `Preferred Time: ${form.time}\nPreferred Contact Method: ${form.contactMethod}\n\nNotes:\n${form.message}`,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Failed to send");
      setSubmitted(true);
    } catch (err) {
      setApiError(err.message || "Unable to submit. Please try again.");
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

  /* ── Success State ── */
  if (submitted) {
    return (
      <section className="py-20 lg:py-28 bg-transparent px-4">
        <div className={`max-w-lg mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(13,39,51,0.08)] border border-[rgba(160,210,235,0.25)] p-12 lg:p-16 flex flex-col items-center text-center animate-[fadeInUp_0.4s_ease] ${className}`}>
          <div className="w-[72px] h-[72px] rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-7 text-emerald-500">
            <CheckCircleIcon />
          </div>
          <h3 className="text-2xl lg:text-3xl font-extrabold text-text-dark mb-3 tracking-tight">
            Appointment Request Sent!
          </h3>
          <p className="text-base text-text-light leading-relaxed mb-8">
            Thank you, <strong className="text-primary-dark font-semibold">{form.name}</strong>. We&apos;ll contact you via{" "}
            <strong className="text-primary-dark font-semibold capitalize">{form.contactMethod}</strong> within 24 hours to confirm.
          </p>
          <button
            onClick={resetForm}
            className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            Book Another Appointment
          </button>
        </div>
      </section>
    );
  }

  /* ── Main Form ── */
  return (
    <section className="py-16 lg:py-24 bg-transparent px-4">
      {/* Card Wrapper */}
      <div className={`max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] bg-white rounded-3xl overflow-hidden shadow-premium border border-slate-100 ${className}`}>

        {/* ── Left Panel ── */}
        <aside className="relative bg-linear-to-br from-primary to-primary-dark p-10 lg:p-11 flex flex-col overflow-hidden">
          {/* Decorative blurs */}
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-accent opacity-20 blur-2xl pointer-events-none" />
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white opacity-10 blur-[25px] pointer-events-none" />

          <span className="relative z-10 inline-block text-[11px] font-semibold tracking-[0.16em] uppercase text-[#7DD3F8] mb-3">
            Book Your Visit
          </span>
          <h3 className="relative z-10 text-[28px] lg:text-[32px] font-bold text-white leading-tight mb-3">
            Your <em className="italic text-accent">Perfect Smile</em> Starts&nbsp;Here
          </h3>
          <p className="relative z-10 text-[14px] text-white/85 leading-relaxed mb-10">
            Schedule your appointment in minutes. Our team will confirm within 24 hours.
          </p>

          {/* Info Items */}
          <div className="relative z-10 flex flex-col gap-6 flex-1">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-[10px] bg-white/12 border border-white/20 flex items-center justify-center shrink-0">
                <MapPinIcon />
              </div>
              <div>
                <strong className="block text-[12px] font-semibold text-[#7DD3F8] tracking-wide uppercase mb-1">Location</strong>
                <span className="text-[14px] text-white leading-snug">{siteInfo.address.street}<br />{siteInfo.address.city}</span>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-[10px] bg-white/12 border border-white/20 flex items-center justify-center shrink-0">
                <PhoneIcon />
              </div>
              <div>
                <strong className="block text-[12px] font-semibold text-[#7DD3F8] tracking-wide uppercase mb-1">Phone</strong>
                <span className="text-[14px] text-white">{siteInfo.phone}</span>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-[10px] bg-white/12 border border-white/20 flex items-center justify-center shrink-0">
                <ClockIcon />
              </div>
              <div>
                <strong className="block text-[12px] font-semibold text-[#7DD3F8] tracking-wide uppercase mb-1">Hours</strong>
                <span className="text-[14px] text-white leading-snug">{siteInfo.hours.weekdays}<br />{siteInfo.hours.saturday}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={siteInfo.whatsappUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex items-center justify-center gap-2.5 mt-10 bg-[#25D366] hover:bg-[#20ba56] text-white text-[14px] font-semibold py-3.5 px-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,211,102,0.3)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .006 5.408 0 12.045c0 2.12.554 4.189 1.605 6.006L0 24l6.117-1.605A11.803 11.803 0 0012.05 24c6.604 0 12.003-5.402 12.006-12.007a11.93 11.93 0 00-3.614-8.471" />
            </svg>
            Chat on WhatsApp
          </a>
        </aside>

        {/* ── Right Panel (Form) ── */}
        <form className="p-8 lg:p-12 flex flex-col gap-5" onSubmit={handleSubmit} noValidate aria-busy={loading}>
          {apiError && (
            <div className="bg-red-50 text-red-800 text-[13px] px-4 py-3 rounded-xl border border-red-200 mb-1">
              {apiError}
            </div>
          )}

          {/* Row: Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name" required error={errors.name}>
              <input
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                className={`${inputBase} ${errors.name ? inputError : ""}`}
              />
            </Field>
            <Field label="Phone Number" required error={errors.phone}>
              <input
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                disabled={loading}
                className={`${inputBase} ${errors.phone ? inputError : ""}`}
              />
            </Field>
          </div>

          {/* Row: Email + Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Email Address" required error={errors.email}>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                className={`${inputBase} ${errors.email ? inputError : ""}`}
              />
            </Field>
            <Field label="Service" required error={errors.service}>
              <div className="relative">
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  disabled={loading}
                  className={`${inputBase} appearance-none cursor-pointer pr-10 ${errors.service ? inputError : ""}`}
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <ChevronDownIcon />
                </span>
              </div>
            </Field>
          </div>

          {/* Row: Date + Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Preferred Date" required error={errors.date}>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={today}
                disabled={loading}
                className={`${inputBase} ${errors.date ? inputError : ""}`}
              />
            </Field>
            <Field label="Preferred Time" required error={errors.time}>
              <div className="relative">
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  disabled={loading}
                  className={`${inputBase} appearance-none cursor-pointer pr-10 ${errors.time ? inputError : ""}`}
                >
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <ChevronDownIcon />
                </span>
              </div>
            </Field>
          </div>

          {/* Contact Method */}
          <Field label="Preferred Contact Method">
            <div className="flex gap-3">
              {CONTACT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={`flex-1 flex flex-col items-center gap-2 py-3.5 px-2.5 rounded-xl border-[1.5px] cursor-pointer transition-all duration-200 text-[13px] font-medium select-none text-center
                    ${form.contactMethod === m.id
                      ? "border-accent bg-[rgba(79,195,247,0.05)] text-primary-dark font-semibold"
                      : "border-transparent bg-bg-section text-text-light hover:border-[rgba(79,195,247,0.3)]"
                    }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value={m.id}
                    checked={form.contactMethod === m.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className={`transition-colors duration-200 ${form.contactMethod === m.id ? "text-accent" : "text-gray-400"}`}>
                    {m.icon}
                  </span>
                  {m.label}
                </label>
              ))}
            </div>
          </Field>

          {/* Message */}
          <Field label="Message" optional>
            <textarea
              name="message"
              placeholder="Tell us about any specific concerns or requests..."
              value={form.message}
              onChange={handleChange}
              disabled={loading}
              rows={2}
              className={`${inputBase} resize-vertical min-h-[80px]`}
            />
          </Field>

          {/* Submit row */}
          <div className="flex items-center justify-between gap-4 flex-wrap mt-3">
            <div className="flex items-center gap-2 flex-1 min-w-[170px]">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-600 shrink-0 shadow-[0_2px_10px_-4px_rgba(16,185,129,0.3)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span className="text-[12px] lg:text-[13px] font-medium text-slate-500">
                Your information is <strong>secure & never shared</strong>.
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 text-white text-[15px] font-semibold py-4 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(15,54,71,0.25)] cursor-pointer whitespace-nowrap"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 rounded-full border-[2.5px] border-white/30 border-t-white animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <SendIcon />
                  Book Appointment
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}