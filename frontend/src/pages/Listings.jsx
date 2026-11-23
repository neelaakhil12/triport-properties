import React, { useState, useEffect } from 'react';
import { Search, MapPin, CheckCircle2, ArrowRight, RefreshCw, Filter } from 'lucide-react';
import PageHeadingBanner from '../components/PageHeadingBanner';
import EnquiryModal from '../components/EnquiryModal';
import OrangeCTABanner from '../components/OrangeCTABanner';
import api from '../api/client';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const categories = [
    'All',
    'Residential',
    'Commercial',
    'Open Plots',
    'Open Land',
    'Farm Land',
    'Land Bank'
  ];

  // Verified inventory matching PDF Pages 15 & 16
  const defaultInventory = [
    {
      id: "l1",
      category: "Farm Land",
      title: "Naidupeta Countryside Agro Parcel",
      location: "[Village], near Naidupeta",
      size: "3.5 Acres",
      approval: "Agricultural · Clean Title",
      roadAccess: "33ft Blacktop Road",
      toNH16: "4.5 km",
      priceRange: "₹28 Lakhs / Acre onwards",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "l2",
      category: "Residential",
      title: "Corridor Prime Greens Layout",
      location: "[Layout name], Naidupeta",
      size: "240 sq. yd",
      approval: "Layout approved · TUDA/DTCP",
      roadAccess: "40ft Internal CC Road",
      toNH16: "2.5 km",
      priceRange: "₹18 Lakhs - ₹35 Lakhs",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "l3",
      category: "Commercial",
      title: "Sullurpeta Industrial Hub Commercial Plot",
      location: "Near [Industrial Hub], Sullurpeta",
      size: "800 sq. yd",
      approval: "Commercial Conversion Approved",
      roadAccess: "150ft Highway Service Road",
      toNH16: "Direct Frontage",
      priceRange: "₹45 Lakhs - ₹1.8 Crores",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "l4",
      category: "Open Land",
      title: "Tada Belt Expansion Investment Land",
      location: "[Survey No.], near Tada",
      size: "5 Acres Contiguous",
      approval: "Industrial / Logistics Zone",
      roadAccess: "60ft Master Plan Road",
      toNH16: "3.0 km",
      priceRange: "₹75 Lakhs / Acre",
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "l5",
      category: "Open Plots",
      title: "Sullurpeta Township Open Plots",
      location: "[Layout name], Sullurpeta",
      size: "200 sq. yd",
      approval: "Layout approved · [Sanctioned]",
      roadAccess: "33ft Blacktop Road",
      toNH16: "1.8 km",
      priceRange: "₹14 Lakhs - ₹26 Lakhs",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "l6",
      category: "Land Bank",
      title: "Naidupeta Highway Multi-Acre Corporate Land Bank",
      location: "[Location], Naidupeta belt",
      size: "25 Acres",
      approval: "Heavy Industry & Warehousing Zoning",
      roadAccess: "100ft Link Road",
      toNH16: "1.2 km",
      priceRange: "Price on Application",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
    }
  ];

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await api.get('/listings');
        if (res.data?.data && res.data.data.length > 0) {
          setListings(res.data.data);
        } else {
          setListings(defaultInventory);
        }
      } catch (err) {
        console.error('Failed to load listings', err);
        setListings(defaultInventory);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter((item) => {
    if (selectedCategory !== 'All') {
      const cat = (item.category || item.landType || '').toLowerCase();
      const target = selectedCategory.toLowerCase();
      if (!cat.includes(target) && !target.includes(cat)) return false;
    }
    return true;
  });

  const handleEnquire = (item) => {
    setSelectedListing(item);
    setModalOpen(true);
  };

  return (
    <div className="bg-white">
      {/* 1. Header Banner matching PDF Page 15 */}
      <PageHeadingBanner
        title="Available land options"
        subtitle="Every listing shows the documents we have verified. Listings change often — contact us for the latest availability."
        breadcrumbs={[{ label: 'Listings' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        {/* 2. Search & Filter Bar matching PDF Page 15 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-6">
          {/* Top Search Controls Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              >
                <option value="All">Anywhere in the corridor</option>
                <option value="Naidupeta">Naidupeta Belt</option>
                <option value="Sullurpeta">Sullurpeta Belt</option>
                <option value="Tada">Tada & Sri City Zone</option>
                <option value="Tirupati">Tirupati & Airport Highway</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Budget
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              >
                <option value="All">Any budget</option>
                <option value="Under 25L">Under ₹25 Lakhs</option>
                <option value="25L - 50L">₹25 Lakhs – ₹50 Lakhs</option>
                <option value="50L - 1Cr">₹50 Lakhs – ₹1 Crore</option>
                <option value="1Cr+">₹1 Crore and above</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              >
                <option value="All">Any size</option>
                <option value="Plot">150 – 500 sq. yd</option>
                <option value="Commercial">500 – 2,000 sq. yd</option>
                <option value="Acres">1 – 5 Acres</option>
                <option value="LandBank">5+ Acres (Corporate Land Bank)</option>
              </select>
            </div>

            <div>
              <button
                type="button"
                className="w-full bg-[#FF6B00] hover:bg-[#e05e00] text-white py-2.5 px-6 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Category Chips Bar: 'All' Constant on Left, Remainder Horizontally Scrollable on Mobile */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
            {/* Constant 'All' Button */}
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 shadow-sm ${
                selectedCategory === 'All'
                  ? 'bg-[#0B1528] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400'
              }`}
            >
              All
            </button>

            <div className="h-5 w-px bg-slate-200 shrink-0" />

            {/* Scrollable Remaining Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 touch-pan-x flex-1 sm:flex-wrap">
              {categories.filter((c) => c !== 'All').map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#FF6B00] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="hidden lg:block text-xs text-slate-400 font-mono flex-shrink-0">
              Updated Nov 2026
            </div>
          </div>
        </div>

        {/* Notice line matching PDF Page 15 */}
        <div className="text-xs text-slate-500 px-1">
          Listings change often. Contact us for the latest availability. RERA or layout approval numbers are shown on each listing where applicable.
        </div>

        {/* 3. Listings Grid matching PDF Pages 15 & 16 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((item, idx) => (
            <div
              key={item._id || item.id || idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={item.image || item.images?.[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1528] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {item.category || item.landType}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Docs verified</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#FF6B00] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{item.location}</span>
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Size</span>
                      <span className="font-semibold text-slate-800">{item.size || item.plotSizes}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Approval</span>
                      <span className="font-semibold text-slate-800">{item.approval || "Verified Title"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Road access</span>
                      <span className="font-semibold text-slate-800">{item.roadAccess || "40ft Road"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">To NH 16</span>
                      <span className="font-semibold text-slate-800">{item.toNH16 || "3.5 km"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div className="text-base font-extrabold text-[#FF6B00]">
                  {item.priceRange || item.pricing}
                </div>
                <button
                  onClick={() => handleEnquire(item)}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-900 hover:text-[#FF6B00] transition-colors"
                >
                  <span>Request Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Orange CTA Banner (PDF Page 16) */}
      <OrangeCTABanner />

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedListing}
      />
    </div>
  );
};

export default Listings;
