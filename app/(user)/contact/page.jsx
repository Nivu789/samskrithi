'use client';

import { useState } from 'react';

const CONTACT_DETAILS = [
  { icon: '📍', title: 'Address',      info: 'Samskrithi Community Centre,\nYour Locality, Kerala — PIN Code' },
  { icon: '📞', title: 'Phone',        info: '+91 XXXXX XXXXX\nMon – Sat, 9 AM – 6 PM' },
  { icon: '✉️', title: 'Email',        info: 'info@samskrithi.in\nWe reply within 24 hours' },
  { icon: '📱', title: 'Social Media', info: '@SamskrithiCommunity\nInstagram · Facebook · WhatsApp' },
];

const INTERESTS = [
  'Joining Badminton',
  'Joining Karate',
  'Joining Dance Classes',
  'Joining Music Classes',
  'General Membership',
  'Volunteering',
  'Other',
];

const EMPTY = { fname: '', lname: '', email: '', phone: '', interest: '', message: '' };

export default function ContactPage() {
  const [form, setForm]       = useState(EMPTY);
  const [submitted, setSub]   = useState(false);
  const [errors, setErrors]   = useState({});

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.fname.trim()) e.fname = 'First name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSub(true);
    setForm(EMPTY);
    setErrors({});
  };

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <section className="page-hero text-center">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <span className="section-tag justify-center flex">Get In Touch</span>
          <h1 className="font-playfair text-5xl md:text-6xl text-cream leading-tight">
            Contact <em className="text-gold not-italic">Us</em>
          </h1>
          <p className="text-cream-dark font-light mt-4 max-w-xl mx-auto leading-relaxed text-lg">
            We&apos;d love to hear from you. Reach out to join, volunteer, or learn more about Samskrithi.
          </p>
        </div>
      </section>

      {/* ── Two-column layout ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">

        {/* Left — info panel */}
        <div className="bg-brown-darkest text-cream-light p-10 space-y-8">
          <div>
            <span className="section-tag">Find Us</span>
            <h2 className="font-playfair text-3xl text-cream">
              Let&apos;s <em className="text-gold not-italic">Connect</em>
            </h2>
            <div className="gold-divider" />
            <p className="text-cream-dark font-light text-sm leading-relaxed">
              Whether you want to enrol in a class, volunteer for an event, or simply say hello — we&apos;re
              always happy to connect with new and existing members.
            </p>
          </div>

          {CONTACT_DETAILS.map(({ icon, title, info }) => (
            <div key={title} className="flex gap-4 items-start">
              <div className="w-11 h-11 bg-gold/10 border border-gold/30 flex items-center justify-center text-xl shrink-0">
                {icon}
              </div>
              <div>
                <h4 className="text-gold text-xs tracking-widest uppercase mb-1 font-medium">{title}</h4>
                <p className="text-cream-dark text-sm leading-relaxed whitespace-pre-line">{info}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right — form */}
        <div className="bg-white p-10">
          <h2 className="font-playfair text-2xl text-brown-darkest mb-1">Send a Message</h2>
          <p className="text-brown-mid text-sm mb-8 font-light">
            Fill in the form below and a member of our team will get back to you within 24 hours.
          </p>

          {submitted ? (
            <div className="bg-gold/10 border border-gold text-brown-darkest px-5 py-4 text-sm leading-relaxed">
              ✅ <strong>Thank you!</strong> Your message has been received. We&apos;ll get back to you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-brown-mid tracking-widest uppercase mb-1.5 font-medium">
                    First Name <span className="text-gold">*</span>
                  </label>
                  <input
                    name="fname" value={form.fname} onChange={handleChange}
                    placeholder="First name"
                    className={errors.fname ? 'border-red-400' : ''}
                  />
                  {errors.fname && <p className="text-red-500 text-xs mt-1">{errors.fname}</p>}
                </div>
                <div>
                  <label className="block text-xs text-brown-mid tracking-widest uppercase mb-1.5 font-medium">
                    Last Name
                  </label>
                  <input name="lname" value={form.lname} onChange={handleChange} placeholder="Last name" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-brown-mid tracking-widest uppercase mb-1.5 font-medium">
                  Email Address <span className="text-gold">*</span>
                </label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com"
                  className={errors.email ? 'border-red-400' : ''}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs text-brown-mid tracking-widest uppercase mb-1.5 font-medium">
                  Phone Number
                </label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
              </div>

              {/* Interest */}
              <div>
                <label className="block text-xs text-brown-mid tracking-widest uppercase mb-1.5 font-medium">
                  I&apos;m Interested In
                </label>
                <select name="interest" value={form.interest} onChange={handleChange}>
                  <option value="">Select an option</option>
                  {INTERESTS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-brown-mid tracking-widest uppercase mb-1.5 font-medium">
                  Message
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} rows={4}
                  placeholder="Tell us how we can help you..."
                  className="resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-brown-darkest py-3 text-xs tracking-widest uppercase
                           font-semibold hover:bg-gold-light transition-all duration-200 hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
