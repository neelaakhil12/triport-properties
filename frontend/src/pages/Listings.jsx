import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, AlertCircle } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import ListingCard from '../components/ListingCard';
import EnquiryModal from '../components/EnquiryModal';
import api from '../api/client';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedLandType, setSelectedLandType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const statuses = ['All', 'Available', 'Reserved', 'Sold'];
  const landTypes = [
    'All',
    'Residential Plots',
    'Commercial Plots',
    'Open Plots',
    'Open Land for Investment',
    'Farm Lands',
    'Land Bank for Companies'
  ];

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStatus !== 'All') params.append('status', selectedStatus);
      if (selectedLandType !== 'All') params.append('landType', selectedLandType);
      if (searchQuery) params.append('search', searchQuery);

      const res = await api.get(`/listings?${params.toString()}`);
      if (res.data?.data) {
        setListings(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load listings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [selectedStatus, selectedLandType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchListings();
  };

  const handleEnquire = (listing) => {
    setSelectedListing(listing);
    setModalOpen(true);
  };

  return (
    <div className="bg-white">
      {/* Black Banner Heading with script accent */}
      <PageHeadingBanner
        title="Available Land Options"
        subtitle="Individual residential plots, highway commercial sites, and agro parcels with verified titles and documentation."
        breadcrumbs={[{ label: 'Listings' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Dynamic Notice Banner */}
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs sm:text-sm text-sky-950 flex items-center justify-between mb-8 shadow-sm">
          <span>
            <strong>Real-Time Notice:</strong> Listings change often. Contact our advisory desk for the latest day-to-day inventory availability.
          </span>
          <button
            onClick={() => {
              setSelectedListing(null);
              setModalOpen(true);
            }}
            className="text-xs bg-black text-white hover:bg-zinc-800 px-3.5 py-1.5 rounded-lg font-semibold shrink-0 ml-3"
          >
            Check Live Inventory
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 mb-12 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by plot number, location, or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8] bg-white"
              />
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-zinc-800 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Filter
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedStatus('All');
                setSelectedLandType('All');
                setSearchQuery('');
              }}
              className="inline-flex items-center justify-center space-x-1.5 px-4 py-3 rounded-xl border border-zinc-300 bg-white text-zinc-700 text-sm hover:bg-zinc-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </form>

          {/* Status Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase text-zinc-400 mr-1">
              Status:
            </span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedStatus === st
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Land Type Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase text-zinc-400 mr-1">
              Land Type:
            </span>
            {landTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedLandType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedLandType === type
                    ? 'bg-[#38BDF8] text-black font-bold shadow-sm'
                    : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="py-20 text-center text-zinc-500">
            <div className="w-8 h-8 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-medium">Fetching available land options...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="py-20 text-center bg-zinc-50 rounded-2xl border border-zinc-200">
            <p className="text-base font-semibold text-zinc-700">No plots match the chosen filters.</p>
            <p className="text-xs text-zinc-500 mt-1">Reset your status or land type filters to explore more options.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((item) => (
              <ListingCard
                key={item._id}
                listing={item}
                onEnquire={handleEnquire}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedListing ? `Request Plot Availability: ${selectedListing.plotNumberOrRef}` : 'Check Plot Inventory'}
        defaultListing={selectedListing}
        defaultService={selectedListing?.landType || 'Residential Plots'}
        targetTitle={selectedListing?.title || ''}
      />
    </div>
  );
};

export default Listings;
