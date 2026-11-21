import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import api from '../api/client';

const AdminSettings = () => {
  const [general, setGeneral] = useState({
    companyName: 'Triport Properties',
    tagline: 'Every Route Leads to Growth. Join the Growth Corridor.',
    email: 'advisory@triportproperties.com',
    phone: '+91 877 225 9988',
    whatsappNumber: '+91 98480 12345',
    officeAddress: 'Triport Tower, 3rd Floor, Near Regional Science Centre, Alipiri - Renigunta Bypass Road, Tirupati, Andhra Pradesh - 517501, India',
    officeHours: 'Monday - Saturday: 9:00 AM - 6:30 PM | Sunday: Prior Site Visits Only',
    footerDisclaimer: 'Information on this site is for general guidance only and is not an offer to sell. Buyers should verify title, approvals and documents independently and consult a qualified lawyer before purchase.'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchGeneral = async () => {
      try {
        const res = await api.get('/settings/general');
        if (res.data?.data) {
          setGeneral(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching settings', err);
      }
    };
    fetchGeneral();
  }, []);

  const handleSaveGeneral = async (e) => {
    e.preventDefault();
    try {
      await api.put('/settings/general', { data: general });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      alert('Failed to save settings');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    try {
      const res = await api.put('/auth/update-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      if (res.data.success) {
        setPasswordSuccess(true);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Website & Brand Settings</h1>
        <p className="text-xs text-zinc-500">Update company details, phone numbers, WhatsApp, office address, and security.</p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>General settings saved successfully and live on the public site!</span>
        </div>
      )}

      {/* General Settings Form */}
      <form onSubmit={handleSaveGeneral} className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-4 text-xs">
        <h3 className="text-sm font-bold text-zinc-900 pb-2 border-b">Brand Profile & Contact Info</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Company Name *</label>
            <input
              type="text"
              required
              value={general.companyName}
              onChange={(e) => setGeneral({ ...general, companyName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Brand Tagline</label>
            <input
              type="text"
              value={general.tagline}
              onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Contact Phone *</label>
            <input
              type="text"
              required
              value={general.phone}
              onChange={(e) => setGeneral({ ...general, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">WhatsApp Number *</label>
            <input
              type="text"
              required
              value={general.whatsappNumber}
              onChange={(e) => setGeneral({ ...general, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={general.email}
              onChange={(e) => setGeneral({ ...general, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-zinc-700 uppercase mb-1">Office Address *</label>
          <input
            type="text"
            required
            value={general.officeAddress}
            onChange={(e) => setGeneral({ ...general, officeAddress: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-zinc-300"
          />
        </div>

        <div>
          <label className="block font-bold text-zinc-700 uppercase mb-1">Advisory Office Hours</label>
          <input
            type="text"
            value={general.officeHours}
            onChange={(e) => setGeneral({ ...general, officeHours: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-zinc-300"
          />
        </div>

        <div>
          <label className="block font-bold text-zinc-700 uppercase mb-1">Footer Statutory Disclaimer</label>
          <textarea
            rows={3}
            value={general.footerDisclaimer}
            onChange={(e) => setGeneral({ ...general, footerDisclaimer: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-zinc-300"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-6 py-2.5 rounded-xl font-bold mt-2"
        >
          <Save className="w-4 h-4 text-[#38BDF8]" />
          <span>Save Website Settings</span>
        </button>
      </form>

      {/* Security: Change Password Form */}
      <form onSubmit={handleUpdatePassword} className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-4 text-xs">
        <h3 className="text-sm font-bold text-zinc-900 pb-2 border-b flex items-center gap-1.5">
          <Lock className="w-4 h-4 text-zinc-600" />
          <span>Admin Security & Password Change</span>
        </h3>

        {passwordError && (
          <div className="p-2.5 bg-red-50 text-red-700 rounded-lg">{passwordError}</div>
        )}
        {passwordSuccess && (
          <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg">Password updated successfully!</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Current Password *</label>
            <input
              type="password"
              required
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">New Password *</label>
            <input
              type="password"
              required
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Confirm New Password *</label>
            <input
              type="password"
              required
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center space-x-1.5 bg-zinc-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-bold"
        >
          <span>Update Admin Password</span>
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
