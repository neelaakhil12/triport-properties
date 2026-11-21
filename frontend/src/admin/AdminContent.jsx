import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../api/client';

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [homeData, setHomeData] = useState({
    heroHeadline: '',
    heroSubheadline: '',
    heroImage: '',
    introHeading: '',
    introDescription: '',
    ctaHeading: '',
    ctaDescription: ''
  });
  const [aboutData, setAboutData] = useState({
    heading: '',
    introduction: '',
    ourPromise: '',
    vision: '',
    mission: '',
    localExpertise: '',
    transparency: ''
  });
  const [nriData, setNriData] = useState({
    heading: '',
    subheading: '',
    legalNote: ''
  });
  const [corporateData, setCorporateData] = useState({
    heading: '',
    description: ''
  });

  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllContent = async () => {
      setLoading(true);
      try {
        const [homeRes, aboutRes, nriRes, corpRes] = await Promise.all([
          api.get('/settings/home'),
          api.get('/settings/about'),
          api.get('/settings/nri'),
          api.get('/settings/corporate')
        ]);
        if (homeRes.data?.data) setHomeData(homeRes.data.data);
        if (aboutRes.data?.data) setAboutData(aboutRes.data.data);
        if (nriRes.data?.data) setNriData(nriRes.data.data);
        if (corpRes.data?.data) setCorporateData(corpRes.data.data);
      } catch (err) {
        console.error('Error fetching page content', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllContent();
  }, []);

  const handleSave = async (key, data) => {
    setError('');
    try {
      await api.put(`/settings/${key}`, { data });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      setError('Failed to update content. Please try again.');
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-zinc-400 text-xs">Loading page content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Page Content Management</h1>
          <p className="text-xs text-zinc-500">Edit public website hero banners, vision, mission, and copy dynamically.</p>
        </div>
        {savedSuccess && (
          <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Content Saved & Reflected Live!</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 space-x-2 text-xs font-bold">
        {['home', 'about', 'nri', 'corporate'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 border-b-2 uppercase tracking-wider transition-colors ${
              activeTab === tab
                ? 'border-[#38BDF8] text-black font-extrabold'
                : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            {tab} Page
          </button>
        ))}
      </div>

      {/* Tab: Home */}
      {activeTab === 'home' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave('home', homeData);
          }}
          className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-4 text-xs"
        >
          <h3 className="text-sm font-bold text-zinc-900 pb-2 border-b">Home Hero & Intro Content</h3>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Hero Headline</label>
            <input
              type="text"
              value={homeData.heroHeadline}
              onChange={(e) => setHomeData({ ...homeData, heroHeadline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Hero Subheadline</label>
            <textarea
              rows={2}
              value={homeData.heroSubheadline}
              onChange={(e) => setHomeData({ ...homeData, heroSubheadline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Hero Background Image URL</label>
            <input
              type="url"
              value={homeData.heroImage}
              onChange={(e) => setHomeData({ ...homeData, heroImage: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>

          <div className="pt-2">
            <label className="block font-bold text-zinc-700 uppercase mb-1">Introduction Heading</label>
            <input
              type="text"
              value={homeData.introHeading}
              onChange={(e) => setHomeData({ ...homeData, introHeading: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Introduction Description</label>
            <textarea
              rows={3}
              value={homeData.introDescription}
              onChange={(e) => setHomeData({ ...homeData, introDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Bottom CTA Heading</label>
              <input
                type="text"
                value={homeData.ctaHeading}
                onChange={(e) => setHomeData({ ...homeData, ctaHeading: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-zinc-300"
              />
            </div>
            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Bottom CTA Description</label>
              <input
                type="text"
                value={homeData.ctaDescription}
                onChange={(e) => setHomeData({ ...homeData, ctaDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-zinc-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-6 py-2.5 rounded-xl font-bold mt-4"
          >
            <Save className="w-4 h-4 text-[#38BDF8]" />
            <span>Save Home Content</span>
          </button>
        </form>
      )}

      {/* Tab: About */}
      {activeTab === 'about' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave('about', aboutData);
          }}
          className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-4 text-xs"
        >
          <h3 className="text-sm font-bold text-zinc-900 pb-2 border-b">About Page Copy & Core Promise</h3>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Main Heading</label>
            <input
              type="text"
              value={aboutData.heading}
              onChange={(e) => setAboutData({ ...aboutData, heading: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Company Introduction</label>
            <textarea
              rows={3}
              value={aboutData.introduction}
              onChange={(e) => setAboutData({ ...aboutData, introduction: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Our Core Promise (Highlighted Callout)</label>
            <input
              type="text"
              value={aboutData.ourPromise}
              onChange={(e) => setAboutData({ ...aboutData, ourPromise: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300 font-serif italic text-amber-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Our Vision</label>
              <textarea
                rows={3}
                value={aboutData.vision}
                onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-zinc-300"
              />
            </div>
            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Our Mission</label>
              <textarea
                rows={3}
                value={aboutData.mission}
                onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-zinc-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Our Local Expertise</label>
              <textarea
                rows={3}
                value={aboutData.localExpertise}
                onChange={(e) => setAboutData({ ...aboutData, localExpertise: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-zinc-300"
              />
            </div>
            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Our Transparency Standard</label>
              <textarea
                rows={3}
                value={aboutData.transparency}
                onChange={(e) => setAboutData({ ...aboutData, transparency: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-zinc-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-6 py-2.5 rounded-xl font-bold mt-4"
          >
            <Save className="w-4 h-4 text-[#38BDF8]" />
            <span>Save About Content</span>
          </button>
        </form>
      )}

      {/* Tab: NRI */}
      {activeTab === 'nri' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave('nri', nriData);
          }}
          className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-4 text-xs"
        >
          <h3 className="text-sm font-bold text-zinc-900 pb-2 border-b">NRI Services Page Copy</h3>
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Page Heading</label>
            <input
              type="text"
              value={nriData.heading}
              onChange={(e) => setNriData({ ...nriData, heading: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Subheading</label>
            <textarea
              rows={2}
              value={nriData.subheading}
              onChange={(e) => setNriData({ ...nriData, subheading: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Legal Notice (FEMA Guidance)</label>
            <textarea
              rows={4}
              value={nriData.legalNote}
              onChange={(e) => setNriData({ ...nriData, legalNote: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-6 py-2.5 rounded-xl font-bold"
          >
            <Save className="w-4 h-4 text-[#38BDF8]" />
            <span>Save NRI Content</span>
          </button>
        </form>
      )}

      {/* Tab: Corporate */}
      {activeTab === 'corporate' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave('corporate', corporateData);
          }}
          className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-4 text-xs"
        >
          <h3 className="text-sm font-bold text-zinc-900 pb-2 border-b">Corporate Land Bank Copy</h3>
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Section Heading</label>
            <input
              type="text"
              value={corporateData.heading}
              onChange={(e) => setCorporateData({ ...corporateData, heading: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Description</label>
            <textarea
              rows={3}
              value={corporateData.description}
              onChange={(e) => setCorporateData({ ...corporateData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center space-x-1.5 bg-black hover:bg-zinc-800 text-white px-6 py-2.5 rounded-xl font-bold"
          >
            <Save className="w-4 h-4 text-[#38BDF8]" />
            <span>Save Corporate Content</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminContent;
