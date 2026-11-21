import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, ShieldCheck, Landmark, Factory, Anchor, CheckCircle2, ChevronRight, ChevronLeft, Compass, Sparkles, MapPin } from 'lucide-react';
import api from '../api/client';
import ProjectCard from '../components/ProjectCard';
import EnquiryModal from '../components/EnquiryModal';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [homeSettings, setHomeSettings] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 5 Property & Goal-Specific Slides for the Tirupati-Naidupeta Growth Corridor
  const heroSlides = [
    {
      id: 1,
      badge: "Tirupati – Naidupeta Growth Corridor Advisory",
      headline: "Every Route Leads to Growth",
      subheadline: "Strategic land and investment advisory across Andhra Pradesh's premier corridor connecting temple towns, 6-lane expressways, international airports, and industrial ports.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/projects",
      primaryText: "Explore Land Options",
      accentTag: "High Appreciation Corridor",
      stat: "6-Lane Highway Links"
    },
    {
      id: 2,
      badge: "TUDA & DTCP Approved Gated Layouts",
      headline: "Secure Approved Residential Plots",
      subheadline: "Vetted residential plots in high-demand residential layouts close to educational institutions, healthcare hubs, and Tirupati International Airport with 100% clean legal titles.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/services",
      primaryText: "Explore Residential Plots",
      accentTag: "100% Clear Titles & Bank Loans",
      stat: "Spot Registrations"
    },
    {
      id: 3,
      badge: "Naidupeta - Sullurpeta - Tada Belt",
      headline: "Industrial & Corporate Land Banks",
      subheadline: "Curated large-scale parcels for manufacturing, warehousing, and corporate expansions strategically situated along the Chennai-Kolkata NH-16 industrial corridor.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/projects",
      primaryText: "Corporate Land Banks",
      accentTag: "Multi-Acre Highway Parcels",
      stat: "Industrial Ecosystem"
    },
    {
      id: 4,
      badge: "Fertile Agricultural & Managed Agro Lands",
      headline: "High-Yield Farmland Investment",
      subheadline: "Fertile agricultural land with abundant groundwater, verified revenue records, and clear boundaries—perfect for weekend organic farming and capital appreciation.",
      image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/services",
      primaryText: "Explore Farm Lands",
      accentTag: "Water Rich & Verified Records",
      stat: "Agro Tourism & Yield"
    },
    {
      id: 5,
      badge: "Port Connectivity & Coastal Trade Gateway",
      headline: "Coastal Trade & Port Corridor Lands",
      subheadline: "Direct access to Krishnapatnam, Dugarajapatnam, and Ramayapatnam deep-water ports driving industrial logistics and exponential commercial land appreciation.",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/locations",
      primaryText: "Corridor Connectivity",
      accentTag: "Port & Logistics Hub",
      stat: "Coastal Multi-Modal Trade"
    }
  ];

  // 10 Verified Customer & Client Reviews for Continuous Streaming Reel
  const allClientReviews = [
    {
      id: 1,
      clientName: "Harsha Lanka",
      designationOrLocation: "Hyderabad, India",
      propertyPurchased: "Residential Plot (Corridor Prime Greens)",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      quote: "Satish and team are absolutely wonderful to work with. It is like having a friend on the inside who is working for you. They responded fast all the time and got us the best plot under our budget. Team was honest and forthright – no games. After dealing with several other agents, we felt lucky to find Triport."
    },
    {
      id: 2,
      clientName: "Vinod Kumar E",
      designationOrLocation: "NRI Investor, Canada",
      propertyPurchased: "2-Acre Investment Parcel near Naidupeta",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      quote: "Buying the right plot or agricultural parcel when you stay overseas in Canada is never easy. But the Triport team made it absolutely seamless. They coordinated the title checks, boundary stones, and video walk-throughs with complete clarity. We will continue to recommend them to all our family and friends."
    },
    {
      id: 3,
      clientName: "Hari Krishna P",
      designationOrLocation: "Industrial Vendor, Hyderabad",
      propertyPurchased: "Commercial Plot along Highway",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
      quote: "The team helped us with an open plot with clear title near the expansion corridor. They were extremely helpful, open, transparent, and reliable through the whole process. They really cared about us, understood our commercial access needs from the very first discussion, and even assured us with factual resale and development data."
    },
    {
      id: 4,
      clientName: "Dr. K. Srinivas Rao",
      designationOrLocation: "Chief Surgeon, Bengaluru",
      propertyPurchased: "TUDA Approved Villa Plot, Tirupati",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80",
      quote: "Triport's due diligence report saved us from a costly error on a disputed layout nearby. We purchased a 350 sq. yard plot with full DTCP sanctions. The spot registration, document verification, and boundary fencing were executed flawlessly."
    },
    {
      id: 5,
      clientName: "Deepak & Ananya Sharma",
      designationOrLocation: "Software Directors, California, USA",
      propertyPurchased: "Strategic Land Holding, Renigunta Bypass",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      quote: "Managing land purchases from Silicon Valley is typically stressful, but Triport provided GPS-mapped videos, survey numbers, and a 30-year link document audit. Outstanding integrity and responsiveness from start to finish."
    },
    {
      id: 6,
      clientName: "R. Venkatasubbaiah",
      designationOrLocation: "Progressive Agro-Farmer, Nellore",
      propertyPurchased: "5-Acre Organic Farm Land, Yerpedu",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80",
      quote: "I was looking for fertile farmland with steady borewell water. Triport inspected soil conditions, checked 1B revenue passbooks, and verified electricity connections before recommending. Highly transparent advisors."
    },
    {
      id: 7,
      clientName: "Suresh C. Reddy",
      designationOrLocation: "Logistics Partner, Chennai",
      propertyPurchased: "8-Acre Industrial Land Bank, Naidupeta NH-16",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80",
      quote: "For our cold storage and distribution hub along the Chennai-Kolkata corridor, Triport sourced contiguous land with direct 60ft frontage. Their speed with industrial approvals saved us months of paperwork."
    },
    {
      id: 8,
      clientName: "Lakshmi Prasanna M",
      designationOrLocation: "Retd. Central Govt Officer, Tirupati",
      propertyPurchased: "Residential Plot, Airport Corridor",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
      quote: "A genuine advisory firm that never forces a sale. They took the time to show my children all government layout sanctions and road widening master plans. We are currently building our retirement house in peace."
    },
    {
      id: 9,
      clientName: "Rajesh & Priya Nair",
      designationOrLocation: "Supply Chain Head, Singapore",
      propertyPurchased: "Commercial Highway Frontage Plot",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
      quote: "Their clarity on the Krishnapatnam port link roads and industrial feeder highways helped us choose a prime asset with exceptional appreciation prospects. Everything was documented and communicated transparently."
    },
    {
      id: 10,
      clientName: "B. Madhava Rao",
      designationOrLocation: "Enterprise Founder, Vijayawada",
      propertyPurchased: "Open Plots for Capital Growth",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
      quote: "Over the last 20 years I have acquired various properties across Andhra Pradesh, but Triport’s professional boundary demarcation and title clarity report is hands-down the most thorough in the industry."
    }
  ];

  // Continuous automatic slide transition (every 3.5 seconds)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, servRes, testRes, homeRes] = await Promise.all([
          api.get('/projects?featured=true'),
          api.get('/services'),
          api.get('/testimonials'),
          api.get('/settings/home')
        ]);

        if (projRes.data?.data) setFeaturedProjects(projRes.data.data);
        if (servRes.data?.data) setServices(servRes.data.data);
        if (testRes.data?.data) setTestimonials(testRes.data.data);
        if (homeRes.data?.data) setHomeSettings(homeRes.data.data);
      } catch (err) {
        console.error('Error fetching home page data:', err);
      }
    };
    fetchData();
  }, []);

  const heroHeadline = homeSettings?.heroHeadline || "Every Route Leads to Growth";
  const heroSubheadline = homeSettings?.heroSubheadline || "Land and investment advisory across the Tirupati–Naidupeta Growth Corridor, with access to temple town, highways, airports, ports and industry.";
  const heroImage = homeSettings?.heroImage || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80";

  const handleEnquire = (item) => {
    setSelectedItemForModal(item);
    setModalOpen(true);
  };

  return (
    <div className="bg-white">
      {/* 1. DYNAMIC 5-SLIDE PROPERTY & CORRIDOR HERO CAROUSEL */}
      <section
        className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[720px] flex items-center justify-center overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Images Layer with Smooth Crossfade - 100% Crisp, Pure & Unblurred */}
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            } transition-transform duration-7000`}
          >
            <img
              src={slide.image}
              alt={slide.headline}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Content Container - Direct on Banner with Zero Box or Blur */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16 sm:py-24">
          {/* Animated Slide Badge */}
          <div
            key={`badge-${currentSlide}`}
            data-aos="fade-down"
            className="inline-flex items-center space-x-2 bg-black/70 border border-[#38BDF8]/80 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-[#38BDF8] mb-5 sm:mb-6 shadow-2xl backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-[#38BDF8] animate-pulse" />
            <span>{heroSlides[currentSlide].badge}</span>
          </div>

          {/* Dynamic Headline with High-Contrast Drop Shadow */}
          <h1
            key={`headline-${currentSlide}`}
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,1)]"
          >
            {heroSlides[currentSlide].headline}
          </h1>

          {/* Subheadline */}
          <p
            key={`sub-${currentSlide}`}
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-base sm:text-lg md:text-2xl text-white max-w-3xl mx-auto font-medium leading-relaxed mb-8 px-2 drop-shadow-[0_2px_14px_rgba(0,0,0,1)]"
          >
            {heroSlides[currentSlide].subheadline}
          </p>

          {/* Action Buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 px-2"
          >
            <Link
              to={heroSlides[currentSlide].primaryLink}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#38BDF8] hover:bg-sky-400 text-black px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-2xl hover:shadow-sky-400/50 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{heroSlides[currentSlide].primaryText}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={() => {
                setSelectedItemForModal(heroSlides[currentSlide]);
                setModalOpen(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-black/75 hover:bg-black text-white border border-white/50 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <PhoneCall className="w-5 h-5 text-[#38BDF8]" />
              <span>Talk to an Advisor</span>
            </button>
          </div>

          {/* Corridor Highlights Bar */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="mt-12 sm:mt-14 pt-6 sm:pt-8 border-t border-white/30 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left text-xs sm:text-sm text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,1)]"
          >
            <div className="flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-lg border border-white/20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse" />
              <span>Temple Town Demand</span>
            </div>
            <div className="flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-lg border border-white/20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
              <span>6-Lane Expressway</span>
            </div>
            <div className="flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-lg border border-white/20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
              <span>Tirupati Airport (TIR)</span>
            </div>
            <div className="flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-lg border border-white/20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
              <span>Krishnapatnam Port</span>
            </div>
          </div>
        </div>

        {/* 5 Slide Indicators (Dots & Active Progress) */}
        <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 sm:space-x-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx
                  ? 'w-8 h-2.5 bg-[#38BDF8]'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. BLACK HEADING BANNER: "About the company" (As featured in client screenshot) */}
      <section className="bg-[#111111] text-white py-12 sm:py-16 text-center border-y border-zinc-800">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="client-script-title text-4xl sm:text-5xl md:text-6xl text-white font-normal mb-3">
            About the company
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Triport Properties – Advisors for Land, Built on Local Knowledge and Verification.
          </p>
        </div>
      </section>

      {/* 3. INTRODUCTION SECTION */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div data-aos="fade-right" className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#38BDF8] bg-sky-50 px-3 py-1 rounded-md">
                <span>Independent Land Investment Advisory</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] leading-tight">
                Your Trusted Partner in Land Investment
              </h2>
              <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
                Tri-Port Properties helps individuals, families and companies buy land with confidence. We advise on residential plots, commercial plots, open plots, open land for investment, farm land and land banks for companies, always with a clear view of location, connectivity and approvals.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3 text-zinc-700 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>Plain-language advice with no pressure to buy.</span>
                </div>
                <div className="flex items-start space-x-3 text-zinc-700 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>Rigorous verification of title records and layout sanctions before any recommendation.</span>
                </div>
                <div className="flex items-start space-x-3 text-zinc-700 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                  <span>Tailored guidance for individuals, families, farmers, corporates, and NRIs.</span>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 bg-black hover:bg-zinc-800 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md"
                >
                  <span>Read Our Philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/investment-guide"
                  className="inline-flex items-center space-x-1 text-sm font-semibold text-zinc-700 hover:text-[#38BDF8]"
                >
                  <span>Our 5-Step Safety Process &rarr;</span>
                </Link>
              </div>
            </div>

            <div data-aos="fade-left" className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Land Advisory Office Triport"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#38BDF8] font-bold">Our Core Promise</span>
                  <p className="text-xl sm:text-2xl font-serif italic mt-1 font-medium">
                    "We recommend only the land we would be comfortable buying ourselves."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY THIS CORRIDOR? */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block mb-2">
              Strategic Advantages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222]">
              Why The Tirupati–Naidupeta Growth Corridor?
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-3">
              Positioned between spiritual tourism, manufacturing hubs, and maritime trade gateways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 – Faith and Tourism */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-black flex items-center justify-center transition-colors mb-6 shadow-sm">
                <Landmark className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-[#38BDF8] transition-colors">
                Faith and Tourism
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Tirupati, one of India's most visited pilgrimage towns, creates steady demand for housing, hospitality and services.
              </p>
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center text-xs font-semibold text-zinc-500 group-hover:text-zinc-900">
                <span>Recession-proof regional footfalls &rarr;</span>
              </div>
            </div>

            {/* Card 2 – Industry */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-black flex items-center justify-center transition-colors mb-6 shadow-sm">
                <Factory className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-[#38BDF8] transition-colors">
                Industry
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                The Naidupeta–Sullurpeta–Tada belt is one of Andhra Pradesh's major industrial corridors, housing multinational manufacturers and electronics hubs.
              </p>
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center text-xs font-semibold text-zinc-500 group-hover:text-zinc-900">
                <span>High employment & housing demand &rarr;</span>
              </div>
            </div>

            {/* Card 3 – Ports and Trade */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-black flex items-center justify-center transition-colors mb-6 shadow-sm">
                <Anchor className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-[#38BDF8] transition-colors">
                Ports and Trade
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Krishnapatnam, Dugarajapatnam and Ramayapatnam ports link the region to coastal and export trade, driving logistic parks and warehouses.
              </p>
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center text-xs font-semibold text-zinc-500 group-hover:text-zinc-900">
                <span>Direct maritime export highway access &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS SECTION - 4 IN A ROW */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block mb-2">
                Hand-Picked Opportunities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222]">
                Featured Corridor Projects
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base mt-2">
                Verified titles, clear road connectivity, and approved layout sanctions.
              </p>
            </div>
            <Link
              to="/projects"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-black hover:text-[#38BDF8] transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.slice(0, 4).map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEnquire={handleEnquire}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. BLACK HEADING BANNER: "Importance of the Triport city" (As featured in client screenshot) */}
      <section className="bg-[#111111] text-white py-14 sm:py-18 text-center border-y border-zinc-800">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="client-script-title text-4xl sm:text-5xl md:text-6xl text-white font-normal mb-3">
            Importance of the Triport city
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Seamless multi-modal convergence: Temple city culture, National Highways, Tirupati Airport, and coastal deep-water ports.
          </p>
        </div>
      </section>

      {/* 7. SERVICES OVERVIEW SECTION */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block mb-2">
              Comprehensive Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222]">
              Land Options for Every Investment Goal
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-2">
              From residential plots for family homes to corporate land banks for industrial plants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={service._id || idx}
                data-aos="fade-up"
                data-aos-delay={idx * 50}
                className="bg-white rounded-2xl overflow-hidden border border-zinc-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white leading-tight">
                    {service.name}
                  </h3>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <Link
                      to="/services"
                      className="text-xs font-bold text-zinc-900 group-hover:text-[#38BDF8] transition-colors flex items-center gap-1"
                    >
                      <span>Explore Service</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleEnquire(service)}
                      className="text-xs bg-black text-white hover:bg-zinc-800 px-3.5 py-1.5 rounded-full font-semibold transition-colors"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION: CONTINUOUS STREAMING CLIENT REEL (Like Video Ticker) */}
      <section className="py-20 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold text-[#38BDF8] tracking-widest block mb-2">
              Real Experiences & Verified Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222]">
              Our Clients Speak
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-2">
              Continuous live streaming reviews from individual plot buyers, NRI investors, farmers, and corporate leaders across the Growth Corridor.
            </p>
          </div>
        </div>

        {/* Video-Style Infinite Streaming Ticker */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Subtle Left & Right Gradient Shadows for Seamless Broadcast Fading */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Marquee Streaming Track (Duplicated list for infinite seamless loop) */}
          <div className="animate-marquee-stream flex space-x-6">
            {[...allClientReviews, ...allClientReviews].map((test, idx) => (
              <div
                key={`${test.id}-${idx}`}
                className="w-[340px] sm:w-[400px] shrink-0 bg-white rounded-3xl p-7 border border-zinc-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between select-none hover:-translate-y-1.5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 text-sm tracking-wider">
                      {'★'.repeat(test.rating || 5)}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Verified Buyer
                    </span>
                  </div>

                  <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed italic line-clamp-4">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-zinc-100 flex items-center space-x-3.5">
                  <img
                    src={test.avatarUrl}
                    alt={test.clientName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#38BDF8] shrink-0 shadow-sm"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-zinc-900 truncate">{test.clientName}</h4>
                    <p className="text-xs text-zinc-500 truncate">{test.designationOrLocation}</p>
                    <span className="text-[10px] text-[#38BDF8] font-bold block truncate">{test.propertyPurchased}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streaming Indicator */}
        <div className="text-center mt-6 text-xs text-zinc-400 flex items-center justify-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live Client Feed • Hover over any review card to pause and read</span>
        </div>
      </section>

      {/* 9. CALL TO ACTION BANNER */}
      <section className="py-16 bg-black text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#38BDF8]/10 blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
            Local Advisory & Due Diligence
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Not Sure Where to Invest?
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Let our local experts help you identify the right land investment opportunity across the Tirupati-Naidupeta corridor.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSelectedItemForModal(null);
                setModalOpen(true);
              }}
              className="inline-flex items-center space-x-2 bg-[#38BDF8] hover:bg-sky-400 text-black px-8 py-4 rounded-full font-bold text-base transition-all shadow-xl hover:scale-105"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Book a Free Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedItemForModal ? `Enquire: ${selectedItemForModal.name || selectedItemForModal.title}` : "Book a Free Consultation"}
        defaultService={selectedItemForModal?.propertyCategory || selectedItemForModal?.name || "Residential Plots"}
        targetTitle={selectedItemForModal?.name || selectedItemForModal?.title || ""}
      />
    </div>
  );
};

export default Home;
