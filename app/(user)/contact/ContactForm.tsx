'use client';

import { useState } from 'react';

interface ContactFormData {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

interface ContactFormProps {
  interests?: string[];
}

const EMPTY = { fname: '', lname: '', email: '', phone: '', interest: '', message: '' };

export default function ContactForm({ interests = [] }) {
  const [form, setForm] = useState<ContactFormData>(EMPTY);
  const [submitted, setSub] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const e: Partial<Record<keyof ContactFormData, string>> = {};
    if (!form.fname.trim()) e.fname = 'First name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address.';
    return e;
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setSubmitError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSub(true);
        setForm(EMPTY);
        setErrors({});
      } else {
        setSubmitError(data.message ?? 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError('Something went wrong. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
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

          {submitError && (
            <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 text-sm rounded">
              {submitError}
            </div>
          )}

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

          <div>
            <label className="block text-xs text-brown-mid tracking-widest uppercase mb-1.5 font-medium">
              Phone Number
            </label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
          </div>

          <div>
            <label className="block text-xs text-brown-mid tracking-widest uppercase mb-1.5 font-medium">
              I&apos;m Interested In
            </label>
            <select name="interest" value={form.interest} onChange={handleChange}>
              <option value="">Select an option</option>
              {interests.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

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
            disabled={submitting}
            className="w-full bg-gold text-brown-darkest py-3 text-xs tracking-widest uppercase
                       font-semibold hover:bg-gold-light transition-all duration-200 hover:-translate-y-0.5
                       disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}