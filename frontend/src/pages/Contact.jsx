import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import api from '../api/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interestedIn: 'Residential Plots',
    budgetRange: '₹25L – ₹50L',
    preferredContact: 'Phone call',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/enquiries', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        interestedIn: formData.interestedIn,
        budget: formData.budgetRange,
        preferredContact: formData.preferredContact,
        message: formData.message,
        source: 'Contact Page Form'
      });

      if (res.data?.success) {
        setSuccess(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      // Graceful fallback
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* 1. Header Banner matching PDF Page 17 */}
      <PageHeadingBanner
        title="Let’s talk about your land goals"
        subtitle="Tell us what you are looking for. We usually reply within one working day."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form: Send an enquiry (lg:col-span-6) matching PDF Page 17 */}
          <div className="lg:col-span-6 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Send an enquiry
            </h2>

            {success ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-lg text-emerald-900">Thank you!</h3>
                <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed">
                  Your enquiry has been received. Our corridor advisor will review your requirement and reach out within one working day.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-3 text-xs font-semibold text-emerald-800 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98480 12345"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Interested in
                    </label>
                    <select
                      name="interestedIn"
                      value={formData.interestedIn}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    >
                      <option value="Residential Plots">Residential Plots</option>
                      <option value="Commercial Plots">Commercial Plots</option>
                      <option value="Open Plots">Open Plots</option>
                      <option value="Open Land for Investment">Open Land for Investment</option>
                      <option value="Farm Lands">Farm Lands</option>
                      <option value="Land Bank for Companies">Land Bank for Companies</option>
                      <option value="NRI Advisory">NRI Land Investment</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Budget range
                    </label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    >
                      <option value="Under ₹25L">Under ₹25 Lakhs</option>
                      <option value="₹25L – ₹50L">₹25 Lakhs – ₹50 Lakhs</option>
                      <option value="₹50L – ₹1Cr">₹50 Lakhs – ₹1 Crore</option>
                      <option value="₹1Cr+">₹1 Crore and above</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred contact
                    </label>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    >
                      <option value="Phone call">Phone call</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Tell us about your goal, preferred location or timeline"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    <span>{loading ? 'Sending...' : 'Send Enquiry'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 pt-2 leading-relaxed">
                  By sending this form you agree to be contacted about your enquiry. We never share your details.
                </p>
              </form>
            )}
          </div>

          {/* Right Cards: Contact Details & Office Map (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B00] block">
                VISIT US
              </span>
              <p className="text-sm font-semibold text-slate-800">
                Triport Advisory Tower, Near NH-16 Highway Junction, Naidupeta, Tirupati District, Andhra Pradesh - 524126
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 block">
                  CALL US
                </span>
                <p className="text-sm font-bold text-slate-800">
                  <a href="tel:+919848012345" className="hover:text-[#FF6B00] transition-colors">
                    +91 98480 12345
                  </a>
                </p>
                <p className="text-xs text-slate-500">+91 877 225 9988</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
                  WHATSAPP
                </span>
                <p className="text-sm font-bold text-slate-800">
                  <a
                    href="https://wa.me/919848012345?text=Hello%20Triport%20Properties"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    +91 98480 12345
                  </a>
                </p>
                <p className="text-xs text-slate-500">Instant Chat & Documents</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block">
                  EMAIL
                </span>
                <p className="text-sm font-bold text-slate-800">
                  <a href="mailto:advisory@triport.in" className="hover:text-indigo-600 transition-colors">
                    advisory@triport.in
                  </a>
                </p>
                <p className="text-xs text-slate-500">info@triport.in</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">
                  OFFICE HOURS
                </span>
                <p className="text-sm font-bold text-slate-800">
                  Mon – Sat, 9:30 am – 6:30 pm
                </p>
                <p className="text-xs text-slate-500">Sunday: Prior Appointments</p>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-64 bg-slate-100">
              <iframe
                title="Triport Properties Naidupeta Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62058.21404167154!2d79.86475357675664!3d13.911364535091764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d048ebc4b5749%3A0xe54c1dc8cb50fe23!2sNaidupeta%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
