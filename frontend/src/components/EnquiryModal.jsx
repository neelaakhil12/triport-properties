import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import api from '../api/client';

const EnquiryModal = ({
  isOpen,
  onClose,
  title = "Enquire About Land Investment",
  defaultType = "General",
  defaultService = "Residential Plots",
  defaultProject = null,
  defaultListing = null,
  targetTitle = ""
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedIn: defaultService,
    budgetRange: '₹15 Lakhs - ₹30 Lakhs',
    preferredLocation: '',
    countryOfResidence: '',
    whatsAppNumber: '',
    companyName: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, interestedIn: defaultService }));
    }
  }, [defaultService]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        type: defaultType,
        targetProjectId: defaultProject?._id || null,
        targetListingId: defaultListing?._id || null,
        targetItemTitle: targetTitle || defaultProject?.name || defaultListing?.title || ''
      };

      const res = await api.post('/enquiries', payload);
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-zinc-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#38BDF8] px-6 py-4 flex items-center justify-between text-black">
          <div>
            <h3 className="font-bold text-lg leading-tight">{title}</h3>
            {targetTitle && (
              <p className="text-xs text-sky-950 font-medium mt-0.5">Regarding: {targetTitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h4 className="text-xl font-bold text-zinc-900">Enquiry Received!</h4>
              <p className="text-sm text-zinc-600 max-w-xs mx-auto">
                Thank you! Our land advisory specialist will connect with you via phone / WhatsApp shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
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
                  placeholder="e.g. Ramesh Reddy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                    Interested In
                  </label>
                  <select
                    value={formData.interestedIn}
                    onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8] bg-white"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8] bg-white"
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
                  Your Requirements / Questions *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share details on your goal (e.g. plot size, timeline, location preference)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#111111] hover:bg-zinc-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#38BDF8]" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#38BDF8]" />
                      <span>Send Enquiry</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 text-center">
                Strict privacy. Your contact details are shared exclusively with our internal legal & land advisors.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
