'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Search, Send, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus({ submitting: false, success: true, error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } catch (err: any) {
      setStatus({ submitting: false, success: false, error: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAF7]">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#003D20] via-[#005C30] to-[#006938] pt-32 pb-24">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#FDB913]/10 blur-2xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            <Mail size={14} className="text-[#FDB913]" />
            Get In Touch
          </span>

          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-6">
            Contact <span className="text-[#FDB913]">Us</span>
          </h1>

          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            Have questions, feedback, or noticed an error? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Form Section */}
          <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">Send a Message</h2>
            
            {status.success ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                  <Send size={24} />
                </div>
                <h3 className="text-xl font-bold">Message Sent Successfully!</h3>
                <p className="text-green-700/80">
                  Thank you for reaching out to us. We will review your message and get back to you shortly.
                </p>
                <button 
                  onClick={() => setStatus({ ...status, success: false })}
                  className="mt-4 px-6 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status.error && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-medium">
                    <AlertCircle size={18} className="shrink-0" />
                    {status.error}
                  </div>
                )}
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#006938] focus:ring-2 focus:ring-[#006938]/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#006938] focus:ring-2 focus:ring-[#006938]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-bold text-gray-700">Subject (Optional)</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#006938] focus:ring-2 focus:ring-[#006938]/20 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-gray-700">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#006938] focus:ring-2 focus:ring-[#006938]/20 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#006938] hover:bg-[#004D28] text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status.submitting ? 'Sending...' : 'Send Message'} <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#006938] text-white rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
              <h3 className="text-xl font-bold mb-6">Important Notice</h3>
              <p className="text-white/80 leading-relaxed text-sm mb-6">
                We are an independent, fan-made resource. If you have inquiries regarding an order you placed, a refund, or an operational issue at a Wingstop location, please contact Wingstop directly.
              </p>
              <a 
                href="https://www.wingstop.com/contact-us" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-[#006938] font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-gray-100 transition"
              >
                Wingstop Support Support
              </a>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/hours" className="flex items-center gap-3 text-gray-600 hover:text-[#006938] transition font-medium">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                      <Clock size={14} />
                    </div>
                    Store Hours Guide
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="flex items-center gap-3 text-gray-600 hover:text-[#006938] transition font-medium">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                      <MapPin size={14} />
                    </div>
                    Find a Location
                  </Link>
                </li>
                <li>
                  <Link href="/allergen-menu" className="flex items-center gap-3 text-gray-600 hover:text-[#006938] transition font-medium">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                      <Search size={14} />
                    </div>
                    Allergen Information
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
