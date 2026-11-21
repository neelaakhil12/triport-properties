import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Compass, Ruler, Tag, CheckCircle2, PhoneCall, Share2, ArrowLeft, Send, Loader2 } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import api from '../api/client';

const ProjectDetails = () => {
  const { idOrSlug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  // Local Enquiry Form inside project page
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/projects/${idOrSlug}`);
        if (res.data?.data) {
          setProject(res.data.data);
          setActiveImage(res.data.data.featuredImage);
        }
      } catch (err) {
        console.error('Failed to load project details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [idOrSlug]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      const payload = {
        ...formData,
        type: 'Project',
        interestedIn: project.propertyCategory,
        targetProjectId: project._id,
        targetItemTitle: project.name,
        preferredLocation: project.location
      };

      const res = await api.post('/enquiries', payload);
      if (res.data.success) {
        setFormSuccess(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-zinc-500">
        <div className="w-8 h-8 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading project specifications...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">Project Not Found</h2>
        <p className="text-zinc-600 text-sm mb-6">The requested land project could not be found or has been moved.</p>
        <Link to="/projects" className="inline-flex items-center space-x-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  const allImages = [project.featuredImage, ...(project.galleryImages || [])].filter(Boolean);

  return (
    <div className="bg-white">
      {/* Black Banner Heading with script accent */}
      <PageHeadingBanner
        title={project.name}
        subtitle={`${project.tagline} • ${project.location}`}
        breadcrumbs={[
          { label: 'Projects', path: '/projects' },
          { label: project.name }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Gallery & Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm relative">
                <img
                  src={activeImage}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/80 text-[#38BDF8] text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {project.propertyCategory}
                </div>
                <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{project.approvalStatus}</span>
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-20 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        activeImage === img ? 'border-[#38BDF8] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Core Specifications Matrix */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-zinc-900 mb-6 pb-3 border-b border-zinc-200">
                Property Specifications & Approvals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Location</span>
                  <span className="font-bold text-zinc-800 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#38BDF8]" />
                    {project.location}
                  </span>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Corridor Zone</span>
                  <span className="font-bold text-zinc-800">{project.corridorZone}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Available Plot Sizes</span>
                  <span className="font-bold text-zinc-800">{project.availablePlotSizes}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Total Project Area</span>
                  <span className="font-bold text-zinc-800">{project.totalLandArea}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Price Range</span>
                  <span className="font-extrabold text-zinc-900 text-lg text-emerald-700">{project.priceRange}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Layout Sanction</span>
                  <span className="font-bold text-zinc-800">{project.approvalStatus}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Road Access</span>
                  <span className="font-bold text-zinc-800">{project.roadAccess}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-zinc-400 block mb-1">Availability Status</span>
                  <span className="font-bold text-emerald-600">{project.status}</span>
                </div>
              </div>
            </div>

            {/* Detailed Overview */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-zinc-900">Project Overview</h3>
              <p className="text-zinc-700 text-base leading-relaxed whitespace-pre-line">
                {project.detailedOverview}
              </p>
            </div>

            {/* Amenities & Infrastructure */}
            {project.amenities?.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-900">On-Site Infrastructure & Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-zinc-700 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Locations */}
            {project.nearbyLocations?.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-900">Nearby Strategic Connectivity</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.nearbyLocations.map((loc, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-zinc-700 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{loc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Google Maps Integration */}
            {project.mapEmbedUrl && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-900">Location Map & Satellite View</h3>
                <div className="rounded-2xl overflow-hidden border border-zinc-200 aspect-[16/9] shadow-sm">
                  <iframe
                    src={project.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title={project.name}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Project Enquiry Form & Quick Assistance (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="pb-4 mb-6 border-b border-zinc-100">
                <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block mb-1">
                  Verified Land Advisory
                </span>
                <h4 className="text-xl font-bold text-zinc-900">Request Project Details</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Receive layout sanctions, cost sheet, and schedule a physical site visit.
                </p>
              </div>

              {formSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h5 className="font-bold text-zinc-900">Enquiry Received!</h5>
                  <p className="text-xs text-zinc-600">
                    Our advisor will send documentation and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg">{formError}</div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:ring-2 focus:ring-[#38BDF8]"
                    />
                  </div>

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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:ring-2 focus:ring-[#38BDF8]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:ring-2 focus:ring-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                      Message / Plot Size Requested *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. Interested in 200 sq.yd plot, looking for site visit this Saturday..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:ring-2 focus:ring-[#38BDF8]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-[#111111] hover:bg-zinc-800 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#38BDF8]" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#38BDF8]" />
                        <span>Request Complete Details</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-zinc-400 text-center pt-1">
                    No spam. Free consultation with verified revenue passbooks.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
