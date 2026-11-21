import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import api from '../api/client';

const Contact = () => {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interestedIn: 'Residential Plots',
    budgetRange: '₹15 Lakhs - ₹30 Lakhs',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings/general');
        if (res.data?.data) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load contact info', err);
      }
    };
    fetchSettings();
  }, []);

  const companyName = settings?.companyName || 'Triport Properties';
  const email = settings?.email || 'advisory@triportproperties.com';
  const phone = settings?.phone || '+91 877 225 9988';
  const whatsapp = settings?.whatsappNumber || '+91 98480 12345';
  const address = settings?.officeAddress || 'Triport Tower, 3rd Floor, Near Regional Science Centre, Alipiri - Renigunta Bypass Road, Tirupati, Andhra Pradesh - 517501, India';
  const hours = settings?.officeHours || 'Monday - Saturday: 9:00 AM - 6:30 PM | Sunday: Prior Site Visits Only';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        type: 'General'
      };

      const res = await api.post('/enquiries', payload);
      if (res.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          interestedIn: 'Residential Plots',
          budgetRange: '₹15 Lakhs - ₹30 Lakhs',
          message: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit enquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Black Banner Heading with script accent */}
      <PageHeadingBanner
        title="Let's Talk About Your Land Goals"
        subtitle="Connect with our senior property advisors for honest, plain-language guidance across the Tirupati-Naidupeta Growth Corridor."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Information & WhatsApp (5 Cols) */}
          <div data-aos="fade-right" className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block mb-1">
                Reach Our Advisory Team
              </span>
              <h2 className="text-3xl font-extrabold text-[#222222]">
                Advisory Office & Direct Desks
              </h2>
              <p className="text-zinc-600 text-sm mt-2 leading-relaxed">
                Whether you are evaluating a family plot, farmland, or corporate land bank, we welcome your enquiry by phone, WhatsApp, or an in-person meeting.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                <MapPin className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-zinc-900">Office Address</h4>
                  <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">{address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                <Phone className="w-5 h-5 text-[#38BDF8] shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-zinc-900">Phone Support</h4>
                  <a href={`tel:${phone}`} className="text-xs text-zinc-600 hover:text-[#38BDF8] transition-colors">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                <Mail className="w-5 h-5 text-[#38BDF8] shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-zinc-900">Email Enquiries</h4>
                  <a href={`mailto:${email}`} className="text-xs text-zinc-600 hover:text-[#38BDF8] transition-colors">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                <Clock className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-zinc-900">Advisory Hours</h4>
                  <p className="text-xs text-zinc-600 mt-0.5">{hours}</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Instant WhatsApp Consultation</h4>
                  <p className="text-xs text-emerald-800">Quick answers on plot availability & location maps.</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Triport%20Properties%20team,%20I%20would%20like%20to%20enquire%20about%20land%20opportunities.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md shrink-0"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div data-aos="fade-left" className="lg:col-span-7">
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-8 sm:p-10 shadow-xl">
              <div className="mb-6 pb-4 border-b border-zinc-100">
                <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block mb-1">
                  Enquiry Form
                </span>
                <h3 className="text-2xl font-extrabold text-zinc-900">Send an Advisory Request</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Fill in your details and requirements. We respond within 4 business hours.
                </p>
              </div>

              {success ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                  <h4 className="text-xl font-bold text-zinc-900">Enquiry Submitted Successfully!</h4>
                  <p className="text-sm text-zinc-600 max-w-sm mx-auto">
                    Thank you for reaching out to Triport Properties. Our local land advisory specialist will contact you on your provided phone / email shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-6 py-2 bg-black text-white text-xs font-bold rounded-lg"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. K. Narayana Reddy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:ring-2 focus:ring-[#38BDF8]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98480 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:ring-2 focus:ring-[#38BDF8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:ring-2 focus:ring-[#38BDF8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                        Interested In *
                      </label>
                      <select
                        value={formData.interestedIn}
                        onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:ring-2 focus:ring-[#38BDF8] bg-white"
                      >
                        <option value="Residential Plots">Residential Plots</option>
                        <option value="Commercial Plots">Commercial Plots</option>
                        <option value="Open Plots">Open Plots</option>
                        <option value="Open Land for Investment">Open Land for Investment</option>
                        <option value="Farm Lands">Farm Lands</option>
                        <option value="Land Bank for Companies">Land Bank for Companies</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                        Budget Range
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:ring-2 focus:ring-[#38BDF8] bg-white"
                      >
                        <option value="Below ₹15 Lakhs">Below ₹15 Lakhs</option>
                        <option value="₹15 Lakhs - ₹30 Lakhs">₹15 Lakhs - ₹30 Lakhs</option>
                        <option value="₹30 Lakhs - ₹60 Lakhs">₹30 Lakhs - ₹60 Lakhs</option>
                        <option value="₹60 Lakhs - ₹1.5 Crores">₹60 Lakhs - ₹1.5 Crores</option>
                        <option value="Above ₹1.5 Crores">Above ₹1.5 Crores</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                      Your Message / Enquiry Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about the property type, preferred corridor location, or schedule a site visit..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:ring-2 focus:ring-[#38BDF8]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#111111] hover:bg-zinc-800 text-white py-4 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-[#38BDF8]" />
                        <span>Sending Advisory Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#38BDF8]" />
                        <span>Send Enquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-zinc-500 text-center pt-1">
                    Your details are protected under our non-disclosure policy. No unwanted third-party marketing calls.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="mt-16 rounded-3xl overflow-hidden border border-zinc-200 shadow-md aspect-[21/9] bg-zinc-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124083.5671182276!2d79.41918!3d13.6288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b0f88620427%3A0xcf39b6b907c91350!2sTirupati%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Triport Office Location"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
