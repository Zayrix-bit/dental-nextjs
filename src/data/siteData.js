import { 
  Stethoscope, Sparkles, Activity, HeartPulse, ShieldPlus, ClockAlert, 
  Microscope, Users, Smile, CreditCard 
} from 'lucide-react';

export const siteInfo = {
  name: 'DentalCare',
  tagline: 'Premium Dental Care',
  phone: '+1 (555) 123-4567',
  phoneRaw: '+15551234567',
  email: 'info@dentalclinic.com',
  address: {
    street: '123 Dental Street, Medical District',
    city: 'New York, NY 10001, USA',
  },
  hours: {
    weekdays: 'Mon – Fri: 9:00 AM – 7:00 PM',
    saturday: 'Saturday: 9:00 AM – 5:00 PM',
    emergency: '24/7 Emergency Care',
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215!2d-73.9878531!3d40.7484405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890',
  whatsappUrl:
    'https://wa.me/15551234567?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment',
};

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const heroStats = [
  { number: 15, suffix: '+', label: 'Years Experience' },
  { number: 10, suffix: 'K+', label: 'Happy Patients' },
  { number: 25, suffix: '+', label: 'Expert Dentists' },
  { number: 98, suffix: '%', label: 'Satisfaction' },
];

export const services = [
  {
    id: 'general',
    icon: Stethoscope,
    title: 'General Dentistry',
    description:
      'Maintain perfect oral health with comprehensive exams, cleanings, and proactive preventive care.',
    isHighlighted: false,
    tags: ['Preventive', 'Family Care'],
  },
  {
    id: 'cosmetic',
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description:
      "Transform your smile and boost your confidence with premium veneers, bonding, and total smile makeovers.",
    isHighlighted: true,
    tags: ['Smile Design', 'Aesthetic'],
  },
  {
    id: 'orthodontics',
    icon: Activity,
    title: 'Orthodontics',
    description:
      'Achieve perfectly straight teeth with discreet Invisalign and modern alignment solutions.',
    isHighlighted: false,
    tags: ['Invisalign', 'Braces'],
  },
  {
    id: 'whitening',
    icon: HeartPulse,
    title: 'Teeth Whitening',
    description:
      'Unlock a radiant, brilliant smile in just one single visit with our professional-grade whitening treatments.',
    isHighlighted: true,
    tags: ['Instant Results', 'Safe & Painless'],
  },
  {
    id: 'implants',
    icon: ShieldPlus,
    title: 'Dental Implants',
    description:
      'Restore complete function and esthetics permanently with our state-of-the-art implant technology.',
    isHighlighted: true,
    tags: ['Permanent Solution', 'Advanced Tech'],
  },
  {
    id: 'emergency',
    icon: ClockAlert,
    title: 'Emergency Care',
    description:
      'Experience immediate relief with our 24/7 priority emergency services when you need us most.',
    isHighlighted: false,
    tags: ['Immediate Relief', '24/7 Access'],
  },
];

export const ALL_SERVICES = [
  { label: "General Checkup & Cleaning", href: "/services#checkup" },
  { label: "Teeth Whitening", href: "/services#whitening" },
  { label: "Root Canal Treatment (RCT)", href: "/services#rct" },
  { label: "Dental Implants", href: "/services#implants" },
  { label: "Braces / Invisalign", href: "/services#braces" },
  { label: "Veneers & Cosmetic Dentistry", href: "/services#veneers" },
  { label: "Pediatric Dentistry", href: "/services#pediatric" },
  { label: "Tooth Extraction", href: "/services#extraction" },
  { label: "Emergency Dental Care", href: "/services#emergency" },
  { label: "Other", href: "/services#other" }
];

export const features = [
  {
    icon: Microscope,
    title: 'Advanced Technology',
    description: 'State-of-the-art equipment including 3D imaging and laser dentistry.',
  },
  {
    icon: Users,
    title: 'Experienced Team',
    description: 'Board-certified dentists with decades of combined expertise.',
  },
  {
    icon: Smile,
    title: 'Patient Comfort',
    description: 'Spa-like atmosphere with sedation options for anxiety-free visits.',
  },
  {
    icon: CreditCard,
    title: 'Affordable Care',
    description: 'Flexible payment plans and insurance-friendly pricing.',
  },
];

export const testimonials = [
  {
    name: 'Sarah M.',
    initials: 'S',
    role: 'Local Guide · 12 reviews',
    timeAgo: '3 weeks ago',
    text: "So glad I found this place. Dr. Smith is amazing. I was super anxious about getting a root canal but honestly didn't feel a thing. The staff is polite and the clinic is spotless. Highly recommend if you have dental anxiety.",
    rating: 5,
  },
  {
    name: 'James Rodriguez',
    initials: 'J',
    role: '6 reviews',
    timeAgo: 'a month ago',
    text: "Been coming here for about 2 years now. Everything is usually great and they run on time which is huge for me. Only giving 4 stars because parking was a little tricky last visit, but the dental work is top notch.",
    rating: 4,
  },
  {
    name: 'Emily Parker',
    initials: 'E',
    role: 'Local Guide · 34 reviews',
    timeAgo: '2 days ago',
    text: "Brought my 7yo for his first filling and the pediatric dentist here is just wonderful. She explained everything to him so patiently. We left with zero tears 😊 Front desk was also very helpful with our insurance.",
    rating: 5,
  },
  {
    name: 'David W.',
    initials: 'D',
    role: '2 reviews',
    timeAgo: '2 months ago',
    text: "Got my Invisalign through them. Process has been smooth so far. Pricing was transparent upfront with no hidden fees. Solid place.",
    rating: 5,
  },
  {
    name: 'L. Kim',
    initials: 'L',
    role: '1 review',
    timeAgo: '4 months ago',
    text: "Had a dental emergency on a Saturday and they fit me in right away. Saved my tooth! Can't thank the emergency team enough. Very professional.",
    rating: 5,
  },
  {
    name: 'Mike H.',
    initials: 'M',
    role: 'Local Guide · 89 reviews',
    timeAgo: '5 months ago',
    text: "Came in for a regular cleaning and decided to do the professional whitening before my wedding. Incredible results. The hygienist was super gentle too. Best dentist in the area hands down.",
    rating: 5,
  },
  {
    name: 'Robert G.',
    initials: 'R',
    role: 'Local Guide · 45 reviews',
    timeAgo: '1 week ago',
    text: "Dr. Martinez is the best. The clinic is high-tech with TVs on the ceiling while they work on you. Makes the time fly by. I just had a crown done and it was seamless.",
    rating: 5,
  },
  {
    name: 'Aisha T.',
    initials: 'A',
    role: '5 reviews',
    timeAgo: '3 weeks ago',
    text: "Moved to the area recently and needed a new dentist. So happy I chose them! Receptionist was super sweet and billing was straightforward. No surprise charges.",
    rating: 5,
  },
  {
    name: 'Paul C.',
    initials: 'P',
    role: '1 review',
    timeAgo: '1 month ago',
    text: "Good cleaning, very thorough. The hygienist was a little rough with the flossing but my teeth feel amazing now. Office is very clean.",
    rating: 4,
  },
  {
    name: 'J. Evans',
    initials: 'J',
    role: 'Local Guide · 18 reviews',
    timeAgo: '3 months ago',
    text: "I've always hated the dentist until now. They use this numbing gel before the needle and I swear it's magic. 10/10 for patient comfort.",
    rating: 5,
  },
  {
    name: 'Natalie R.',
    initials: 'N',
    role: '4 reviews',
    timeAgo: '6 months ago',
    text: "Got my wisdom teeth out here last Friday. Recovery was way easier than I expected and the doctor even called me the next day to check in. Highly recommend.",
    rating: 5,
  },
  {
    name: 'Marcus B.',
    initials: 'M',
    role: 'Local Guide · 42 reviews',
    timeAgo: '8 months ago',
    text: "Beautiful office, looks like a spa. They gave me a warm towel after my appointment. Plus my teeth look perfectly white after the zoom whitening!",
    rating: 5,
  },
];

export const footerQuickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Book Appointment', href: '/contact' },
];
