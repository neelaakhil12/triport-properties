const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5050;
const DATA_FILE = path.join(__dirname, 'triport_data.json');
const JWT_SECRET = 'triport_growth_corridor_secret_key_2026';

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Initial seed data
const initialData = {
  users: [
    {
      id: "usr_1",
      name: "Triport Principal Advisor",
      email: "admin@triportproperties.com",
      passwordHash: "$2a$10$pLwOq2M0gG1l6MhYf4N6ce7H3R8WqgE9U0U6W6CqK5T6E7P3Z4N1m", // admin123
      role: "superadmin"
    }
  ],
  settings: {
    general: {
      companyName: "Triport Properties",
      tagline: "Every Route Leads to Growth. Join the Growth Corridor.",
      email: "advisory@triportproperties.com",
      phone: "+91 877 225 9988",
      whatsappNumber: "+91 98480 12345",
      officeAddress: "Triport Tower, 3rd Floor, Near Regional Science Centre, Alipiri - Renigunta Bypass Road, Tirupati, Andhra Pradesh - 517501, India",
      officeHours: "Monday - Saturday: 9:00 AM - 6:30 PM | Sunday: Prior Site Visits Only",
      footerDisclaimer: "Information on this site is for general guidance only and is not an offer to sell. Buyers should verify title, approvals and documents independently and consult a qualified lawyer before purchase."
    },
    home: {
      heroHeadline: "Every Route Leads to Growth",
      heroSubheadline: "Land and investment advisory across the Tirupati–Naidupeta Growth Corridor, with access to temple town, highways, airports, ports and industry.",
      heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
      introHeading: "Your Trusted Partner in Land Investment",
      introDescription: "Tri-Port Properties helps individuals, families and companies buy land with confidence. We advise on residential plots, commercial plots, open plots, open land for investment, farm land and land banks for companies, always with a clear view of location, connectivity and approvals.",
      ctaHeading: "Not Sure Where to Invest?",
      ctaDescription: "Let our local experts help you identify the right land investment opportunity across the Tirupati-Naidupeta corridor."
    },
    about: {
      heading: "Advisors for Land, Built on Local Knowledge",
      introduction: "We are a land investment advisory based on the Tirupati–Naidupeta corridor. Our role is to help you make a sound decision, not just a sale. We explain the location, the infrastructure plans, the title and approval status, and the likely use of the land before you commit.",
      ourPromise: "We recommend only the land we would be comfortable buying ourselves.",
      vision: "To be the most respected, transparent, and legally sound land advisory along the Southern East-Coast corridor of India.",
      mission: "To protect our clients capital through stringent due diligence, unbiased property assessments, and transparent documentation assistance.",
      localExpertise: "Our advisory team is deeply rooted in the Rayalaseema and coastal regions. We track master plans, industrial allocations, road widenings, and real revenue records directly at the source.",
      transparency: "We provide copies of all available approvals, encumbrance certificates, layout sanctions, and link documents upfront before any transaction."
    },
    nri: {
      heading: "Your Trusted Land Investment Partner in India",
      subheading: "Invest in your roots with confidence. Tri-Port Properties helps NRIs explore land opportunities across the Tirupati–Naidupeta Growth Corridor with local assistance and transparent guidance.",
      legalNote: "Property ownership eligibility for NRIs and OCIs depends on applicable Indian laws (FEMA guidelines and RBI regulations). Agricultural land, plantation property and farmhouses have specific statutory restrictions for NRI/OCI purchase. Triport Properties provides transparent guidance and recommends independent legal review prior to contract execution."
    },
    corporate: {
      heading: "Land Banks for Growing Businesses",
      description: "We help companies secure strategic land parcels ahead of industrial and logistic expansion along the Tirupati-Naidupeta industrial corridor."
    }
  },
  services: [
    {
      id: "srv_1",
      name: "Residential Plots",
      slug: "residential-plots",
      tagline: "Gated & Approved Layouts for Future Living",
      shortDescription: "Plots in developing layouts close to housing demand, schools and transport. Best for end-use or long-term family homes.",
      fullDescription: "Our residential plot advisory focuses on approved layouts (TUDA / DTCP) in emerging residential clusters surrounding Tirupati, Renigunta, and Yerpedu. Each layout is vetted for road widths, drinking water infrastructure, power lines, and clear title passbooks.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      benefits: ["Immediate registration with clear title deed", "TUDA / DTCP layout sanctions with standard compound fencing", "Proximity to educational institutions and transit hubs", "High rental and resale appeal for end-use families"],
      idealFor: ["Families building homes", "Salaried professionals", "Long-term individual investors"]
    },
    {
      id: "srv_2",
      name: "Commercial Plots",
      slug: "commercial-plots",
      tagline: "High-Footfall Highway & Corridor Frontages",
      shortDescription: "Plots on main roads and near industrial and transport hubs, suited to shops, offices, warehouses and service businesses.",
      fullDescription: "Prime commercial land plots along NH 71 (Tirupati-Naidupeta) and NH 16 (Chennai-Kolkata). Ideal for retail showrooms, commercial office complexes, logistic yards, hospitality hotels, and fast-moving transit diners.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      benefits: ["High road frontage with wide 60ft to 150ft access", "Zoned for commercial and mixed-use commercial activity", "Direct exposure to heavy pilgrim and freight traffic", "Excellent leasehold and yield potential"],
      idealFor: ["Business owners", "Commercial builders", "Hospitality developers", "HNI investors"]
    },
    {
      id: "srv_3",
      name: "Open Plots",
      slug: "open-plots",
      tagline: "Strategic Entry-Level Growth Parcels",
      shortDescription: "Approved open plots for steady appreciation as surrounding areas develop.",
      fullDescription: "Strategically positioned open plots within urban development authority boundaries. Sourced at competitive early-stage valuations to guarantee steady capital appreciation over a 3 to 7 year horizon.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      benefits: ["Affordable ticket sizes for early investors", "Vetted for encumbrance-free records", "Positioned along planned arterial expansion roads", "Low maintenance holding cost"],
      idealFor: ["First-time land buyers", "Portfolio diversification", "Retirement savings"]
    },
    {
      id: "srv_4",
      name: "Open Land for Investment",
      slug: "open-land-for-investment",
      tagline: "Large Acreage Capital Appreciation Parcels",
      shortDescription: "Larger parcels for long-term holding, with a clear view of future use and exit options.",
      fullDescription: "Parcels from 2 acres to 25 acres along the growth axis between Renigunta, Srikalahasti, and Naidupeta. Comprehensive contour study, boundary demarcations, and link documents.",
      image: "https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80",
      benefits: ["Economical price per acre compared to subdivided plots", "Multiple future exit options: plotted layout, institutional, or logistics", "Verified revenue survey records with digital FMB maps", "Dedicated boundary survey and stone demarcation support"],
      idealFor: ["Real estate syndicates", "HNIs", "Long-term wealth builders"]
    },
    {
      id: "srv_5",
      name: "Farm Lands",
      slug: "farm-lands",
      tagline: "Productive Agricultural & Managed Agro-Farmland",
      shortDescription: "Agricultural land for farming, orchards or future conversion, with checks on soil, water access and land-use rules.",
      fullDescription: "Fertile agricultural holdings in the Swarnamukhi river basin and surrounding rural belts. Verified for sweet groundwater availability, soil testing reports, Pattadar passbooks, and clear cultivation histories.",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
      benefits: ["High water table and verified borewell permissions", "Clear Pattadar passbooks with 1B revenue verification", "Suitable for horticulture (Mango, Lemon, Teak) or organic farming", "Fencing and caretaker guidance provided"],
      idealFor: ["Farmers expanding holdings", "Agri-investors", "Weekend farm enthusiasts"]
    },
    {
      id: "srv_6",
      name: "Land Bank for Companies",
      slug: "land-bank-for-companies",
      tagline: "Industrial, Institutional & Logistics Aggregation",
      shortDescription: "Curated land banks for businesses planning factories, warehouses, logistics centres, hospitals or institutions. We handle site shortlisting, due diligence and negotiation.",
      fullDescription: "Comprehensive institutional land advisory catering to industrial conglomerates, manufacturing MNCs, e-commerce fulfillment hubs, and hospital chains looking to set up in the Tada-Sri City-Naidupeta-Krishnapatnam node.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      benefits: ["Contiguous acreage aggregation up to 100+ acres", "NHAI highway feeder access & heavy vehicle turning radii checks", "Zoning checks with APIIC & master plan compliance", "End-to-end liaison with legal, revenue, and local bodies"],
      idealFor: ["Manufacturing companies", "Logistics & 3PL operators", "Corporate institutions", "Industrial builders"]
    }
  ],
  projects: [
    {
      id: "prj_1",
      name: "Corridor Prime Greens",
      slug: "corridor-prime-greens",
      tagline: "TUDA Approved Premium Layout on Tirupati-Renigunta Growth Axis",
      location: "Renigunta Airport Road, Tirupati District",
      corridorZone: "Renigunta Airport Road",
      propertyCategory: "Residential Plots",
      availablePlotSizes: "167 to 400 Sq. Yards",
      totalLandArea: "18.5 Acres",
      priceRange: "₹18 Lakhs - ₹42 Lakhs",
      approvalStatus: "TUDA Approved LP No: 38/2023",
      roadAccess: "60ft Master Plan Road & 40ft Internal BT Roads",
      nearbyLocations: ["Tirupati International Airport (7 mins)", "IIT Tirupati (12 mins)", "Renigunta Junction (10 mins)"],
      shortDescription: "Gated residential layout offering DTCP/TUDA sanctions, underground drainage, electricity transformers, and avenue plantation right next to the airport corridor.",
      detailedOverview: "Corridor Prime Greens represents one of the most strictly compliant residential communities in the Greater Tirupati region. Located along the expanded 6-lane airport connector.",
      featuredImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      isFeaturedOnHome: true,
      status: "Available"
    },
    {
      id: "prj_2",
      name: "Naidupeta Logistics & Commercial Vista",
      slug: "naidupeta-commercial-vista",
      tagline: "Strategic Highway Frontage Facing NH-16 / NH-71 Junction",
      location: "NH-16 Junction, Naidupeta, Tirupati District",
      corridorZone: "Naidupeta",
      propertyCategory: "Commercial Plots",
      availablePlotSizes: "500 to 2,500 Sq. Yards",
      totalLandArea: "14 Acres",
      priceRange: "₹45 Lakhs - ₹1.8 Crores",
      approvalStatus: "Commercial Land-Use Sanctioned / Freehold Title",
      roadAccess: "150ft NH-16 Highway Frontage with Dedicated Service Lane",
      nearbyLocations: ["Naidupeta Industrial SEZ (4 km)", "Krishnapatnam Port Road (2 km)", "Sullurpeta (18 km)"],
      shortDescription: "Unmatched highway frontage commercial parcels suited for logistics hubs, fuel stations, motels, and enterprise commercial complexes.",
      detailedOverview: "Positioned at the pivotal junction of the golden quadrilateral NH-16 and NH-71 connecting directly to the seaport and temple city.",
      featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      isFeaturedOnHome: true,
      status: "Available"
    },
    {
      id: "prj_3",
      name: "Swarnamukhi Agro Orchards",
      slug: "swarnamukhi-agro-orchards",
      tagline: "Fertile River-Basin Agricultural Land with Abundant Sweet Water",
      location: "Yerpedu - Srikalahasti Belt, Andhra Pradesh",
      corridorZone: "Tirupati",
      propertyCategory: "Farm Lands",
      availablePlotSizes: "1 Acre to 5 Acres Parcels",
      totalLandArea: "32 Acres Contiguous",
      priceRange: "₹28 Lakhs / Acre onwards",
      approvalStatus: "Clear Pattadar Passbook & 1B Revenue Record Verified",
      roadAccess: "33ft Panchayat Blacktop Feeder Road",
      nearbyLocations: ["Srikalahasti Temple (12 km)", "Yerpedu Railway Hub (8 km)", "Tirupati (24 km)"],
      shortDescription: "Lush fertile farmland bordered by natural irrigation canals. Perfect for mango, coconut, or organic micro-farming with verified soil testing.",
      detailedOverview: "Swarnamukhi Agro Orchards offers peaceful, verified agricultural holdings. Completely surveyed using total station DGPS equipment.",
      featuredImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
      isFeaturedOnHome: true,
      status: "Available"
    },
    {
      id: "prj_4",
      name: "Sri City Peripheral Corporate Land Bank",
      slug: "sri-city-peripheral-land-bank",
      tagline: "Aggregated Industrial & Institutional Parcel along Tada-Sullurpeta Axis",
      location: "Tada - Sri City Growth Environs, Andhra Pradesh",
      corridorZone: "Sri City Belt",
      propertyCategory: "Corporate Land Banks",
      availablePlotSizes: "5 Acres to 50 Acres",
      totalLandArea: "75 Acres Total Bank",
      priceRange: "Custom Corporate Pricing on Due Diligence",
      approvalStatus: "Industrial Zoning Feasibility Certified / Clear Single-Owner Title",
      roadAccess: "80ft Planned Industrial Arterial Access with Direct NH-16 link",
      nearbyLocations: ["Sri City SEZ North Gate (6 km)", "Tada Railway Station (8 km)", "Chennai Ennore Port (55 km)"],
      shortDescription: "Ideal for industrial setups, automotive ancillary units, cold storage warehousing, and corporate institutions seeking proximity to Chennai and ports.",
      detailedOverview: "Curated specifically for corporate entities planning industrial establishments. Complete due diligence package included.",
      featuredImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      isFeaturedOnHome: true,
      status: "Available"
    }
  ],
  listings: [
    {
      id: "lst_1",
      title: "East Facing 200 Sq.yd Residential Plot in Corridor Prime Greens",
      plotNumberOrRef: "Plot #18 (Phase 1)",
      location: "Renigunta Airport Road, Tirupati",
      plotOrLandSize: "200 Sq. Yards (36ft x 50ft)",
      landType: "Residential Plots",
      approvalStatus: "TUDA Approved LP No: 38/2023",
      roadAccess: "40ft Internal Blacktop Road",
      distanceToKeyPoints: "6 km to Tirupati Airport, 8 km to Railway Station, 3 km to NH-71",
      priceRange: "₹22,00,000 (₹11,000/sq.yd)",
      verifiedDocuments: ["TUDA Approved Master Layout Plan", "30 Years Encumbrance Certificate", "Clear Link Document Chain"],
      images: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"],
      status: "Available",
      facing: "East"
    },
    {
      id: "lst_2",
      title: "Corner Commercial Plot on 60ft Arterial Road",
      plotNumberOrRef: "Commercial Plot #C-02",
      location: "Airport Expressway Sector, Renigunta",
      plotOrLandSize: "450 Sq. Yards",
      landType: "Commercial Plots",
      approvalStatus: "TUDA Approved Commercial Zoning",
      roadAccess: "60ft x 40ft Corner BT Roads",
      distanceToKeyPoints: "4.5 km to Tirupati Airport, 1.5 km to Renigunta Flyover",
      priceRange: "₹67,50,000 (₹15,000/sq.yd)",
      verifiedDocuments: ["Commercial Zoned Sanction", "Clear Title Passbook", "Town Planning Certificate"],
      images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"],
      status: "Available",
      facing: "Corner / Multi-facing"
    },
    {
      id: "lst_3",
      title: "North Facing 167 Sq.yd Affordable Villa Plot",
      plotNumberOrRef: "Plot #45",
      location: "Renigunta-Yerpedu Road",
      plotOrLandSize: "167 Sq. Yards (30ft x 50ft)",
      landType: "Residential Plots",
      approvalStatus: "TUDA Approved LP No: 38/2023",
      roadAccess: "40ft Blacktop Road",
      distanceToKeyPoints: "5 km to Airport, 4 km to IIT Tirupati",
      priceRange: "₹18,37,000",
      verifiedDocuments: ["Approved Layout Plan", "Nil Encumbrance Certificate"],
      images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"],
      status: "Reserved",
      facing: "North"
    },
    {
      id: "lst_4",
      title: "Prime 1,000 Sq.yd Commercial Plot on NH-16 Naidupeta",
      plotNumberOrRef: "Highway Plot #HP-01",
      location: "NH-16 Corridor, Naidupeta",
      plotOrLandSize: "1,000 Sq. Yards",
      landType: "Commercial Plots",
      approvalStatus: "NHAI Service Road NOC / Freehold Title",
      roadAccess: "150ft NH-16 Service Road Frontage",
      distanceToKeyPoints: "2 km to Naidupeta Bus Stand, 35 km to Krishnapatnam Port Feeder",
      priceRange: "₹85,00,000",
      verifiedDocuments: ["NHAI Access NOC", "Revenue Title Verification", "1B Passbook"],
      images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"],
      status: "Available",
      facing: "East"
    },
    {
      id: "lst_5",
      title: "3-Acre Fertile Organic Farmland with Borewell",
      plotNumberOrRef: "Survey #142/2A",
      location: "Swarnamukhi Basin, Srikalahasti - Yerpedu Belt",
      plotOrLandSize: "3.0 Acres",
      landType: "Farm Lands",
      approvalStatus: "Clear Pattadar Passbook & Webland Record Verified",
      roadAccess: "33ft Metalled Rural Feeder Road",
      distanceToKeyPoints: "9 km to Srikalahasti, 18 km to Tirupati Airport",
      priceRange: "₹84,00,000 (₹28 Lakhs/Acre)",
      verifiedDocuments: ["Pattadar Digital Passbook", "Adangal 1B Verified", "Soil Quality Certificate"],
      images: ["https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"],
      status: "Available",
      facing: "East"
    },
    {
      id: "lst_6",
      title: "Sold Out - 240 Sq.yd Residential Plot in Phase 1",
      plotNumberOrRef: "Plot #08",
      location: "Renigunta Airport Road",
      plotOrLandSize: "240 Sq. Yards",
      landType: "Residential Plots",
      approvalStatus: "TUDA Approved",
      roadAccess: "40ft BT Road",
      distanceToKeyPoints: "6 km to Airport",
      priceRange: "₹26,40,000",
      verifiedDocuments: ["Registered Sale Deed Executed", "TUDA Final Sanction"],
      images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"],
      status: "Sold",
      facing: "West"
    }
  ],
  locations: [
    {
      id: "loc_1",
      name: "Tirupati Temple Town & Knowledge Hub",
      corridorRole: "Spiritual, Hospitality, Healthcare & Academic Anchor",
      description: "Tirupati is one of India's most visited pilgrimage centers, hosting over 25 million devotees annually. This perennial inflow creates consistent, recession-resistant demand for housing, hospitality, medical facilities, and premier higher education campuses including IIT Tirupati, IISER, and SV University.",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      distances: [
        { destination: "Renigunta Junction", distanceKm: "10 km", travelTime: "15 mins" },
        { destination: "Tirupati International Airport", distanceKm: "14 km", travelTime: "20 mins" },
        { destination: "Sri City SEZ", distanceKm: "68 km", travelTime: "1 hr 15 mins" },
        { destination: "Chennai City", distanceKm: "135 km", travelTime: "2 hrs 45 mins" }
      ],
      verifiedStatus: "Verified via Urban Development Authority (TUDA)"
    },
    {
      id: "loc_2",
      name: "Naidupeta - Sullurpeta - Tada Industrial Belt",
      corridorRole: "Manufacturing, Engineering & Global Export Powerhouse",
      description: "The Naidupeta-Sullurpeta-Tada corridor forms the economic industrial backbone of southern Andhra Pradesh. Housing mega industrial parks, multi-product SEZs, and global industrial parks, this zone accommodates Fortune 500 manufacturing, automotive, electronics, and aerospace manufacturing plants.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      distances: [
        { destination: "Sri City Multi-Product SEZ", distanceKm: "18 km", travelTime: "22 mins" },
        { destination: "ISRO Satish Dhawan Space Centre", distanceKm: "22 km", travelTime: "30 mins" },
        { destination: "Krishnapatnam Port", distanceKm: "62 km", travelTime: "1 hr" }
      ],
      verifiedStatus: "Verified via APIIC & District Industries Centre Records"
    },
    {
      id: "loc_3",
      name: "National Highways (NH-71 & NH-16)",
      corridorRole: "High-Speed Freight & Inter-State Commuter Arteries",
      description: "National Highway 71 directly joins Tirupati with Naidupeta, linking the spiritual heartland to the coastal maritime highway NH-16. This provides heavy cargo trucks, commuters, and pilgrims seamless dual-carriageway access with toll infrastructure and bypass loops.",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      distances: [
        { destination: "NH-71 (Tirupati to Naidupeta)", distanceKm: "58 km", travelTime: "55 mins" },
        { destination: "NH-16 (Naidupeta to Tada / Border)", distanceKm: "42 km", travelTime: "40 mins" }
      ],
      verifiedStatus: "Verified via National Highways Authority of India (NHAI)"
    },
    {
      id: "loc_4",
      name: "Tirupati International Airport (TIR)",
      corridorRole: "Domestic & Regional Passenger & Cargo Air Terminal",
      description: "Located at Renigunta along NH-71, the airport features a modern Garuda-themed integrated passenger terminal with direct flights to Hyderabad, Bangalore, New Delhi, Mumbai, and Vijayawada.",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      distances: [
        { destination: "Renigunta Railway Junction", distanceKm: "4 km", travelTime: "6 mins" },
        { destination: "Tirupati Central Bus Station", distanceKm: "14 km", travelTime: "20 mins" }
      ],
      verifiedStatus: "Verified via Airports Authority of India (AAI)"
    },
    {
      id: "loc_5",
      name: "Ports (Krishnapatnam, Dugarajapatnam & Ramayapatnam)",
      corridorRole: "Deep-Water Coastal Maritime Gateways & Export Trade",
      description: "Krishnapatnam Port is one of India's deepest all-weather deep-water private ports handling bulk container, coal, edible oil, and break-bulk exports.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      distances: [
        { destination: "Krishnapatnam Port from Naidupeta", distanceKm: "62 km", travelTime: "1 hr" },
        { destination: "Krishnapatnam Port from Tirupati", distanceKm: "118 km", travelTime: "2 hrs" }
      ],
      verifiedStatus: "Verified via Indian Ports Association"
    }
  ],
  testimonials: [
    {
      id: "tst_1",
      clientName: "Harsha Lanka",
      designationOrLocation: "Hyderabad, India",
      propertyPurchased: "Residential Plot (Corridor Prime Greens)",
      quote: "Satish and team are absolutely wonderful to work with. It is like having a friend on the inside who is working for you. They responded fast all the time and got us the best plot under our budget. Team was honest and forthright - no games. After dealing with several other agents and being disappointed, we felt lucky to find Triport.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      isPublished: true
    },
    {
      id: "tst_2",
      clientName: "Vinod Kumar E",
      designationOrLocation: "NRI Investor, Canada",
      propertyPurchased: "2-Acre Investment Parcel near Naidupeta",
      quote: "Buying the right plot or agricultural parcel when you stay overseas in Canada is never easy. But the Triport team made it absolutely seamless. They are very professional. They coordinated the title checks, boundary stones, and video walk-throughs with complete clarity. We will continue to recommend them to all our family and friends.",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      isPublished: true
    },
    {
      id: "tst_3",
      clientName: "Hari Krishna P",
      designationOrLocation: "Industrial Vendor, Hyderabad",
      propertyPurchased: "Commercial Plot along Highway",
      quote: "The team helped us with an open plot with clear title near the expansion corridor. They were extremely helpful, open, transparent, and reliable through the whole process. They really cared about us, understood our commercial access needs from the very first discussion, and even assured us with factual resale and development data.",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      isPublished: true
    }
  ],
  blogs: [
    {
      id: "blg_1",
      title: "Tirupati-Naidupeta Growth Corridor: Why Infrastructure Is Driving Land Value",
      slug: "tirupati-naidupeta-growth-corridor-infrastructure-value",
      category: "Infrastructure Updates",
      featuredImage: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      shortDescription: "An analysis of NH-71 widening, the Renigunta electronics cluster, and how port feeder highways are transforming Rayalaseema into an east-coast economic gateway.",
      content: `The Tirupati-Naidupeta corridor connects religious tourism, domestic passenger aviation, and heavy manufacturing with major maritime ports. With the upgradation of NH-71 and feeder connectors into NH-16, transport transit times have dropped from over 2 hours to under 50 minutes.\n\nKey Growth Catalysts:\n1. The Electronics Manufacturing Clusters (EMC 1 & 2) near Renigunta Airport.\n2. Heavy Industrial Nodes in Tada-Naidupeta.\n3. Direct Rail connectivity to Krishnapatnam Port.`,
      author: "Triport Research Desk",
      publicationDate: "2026-02-15",
      isPublished: true,
      officialSourceLinks: [
        { sourceName: "National Highways Authority of India (NHAI)", url: "https://nhai.gov.in" },
        { sourceName: "Tirupati Urban Development Authority (TUDA)", url: "https://tudaap.in" }
      ]
    },
    {
      id: "blg_2",
      title: "5 Document Verification Steps Every Land Buyer in Andhra Pradesh Must Know",
      slug: "5-document-verification-steps-land-buyer-andhra-pradesh",
      category: "Buying Checklists",
      featuredImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
      shortDescription: "A practical, lawyer-backed guide to checking Encumbrance Certificates, 1B Adangal records, Webland passbooks, and layout approval sanctions.",
      content: `Buying land in Andhra Pradesh requires rigorous multi-tier verification before paying an advance:\n\n1. Check Webland 1B Record on AP Meebhoomi portal.\n2. Obtain a 30-Year Encumbrance Certificate (EC) on IGRS portal.\n3. Confirm Final Layout Approval (TUDA / DTCP LP Number).\n4. Physical Demarcation & FMB Sketch comparison.\n5. Verify Clear 30-year Link Document Chain.`,
      author: "Legal Due Diligence Cell",
      publicationDate: "2026-03-02",
      isPublished: true,
      officialSourceLinks: [
        { sourceName: "AP IGRS Registration Portal", url: "https://registration.ap.gov.in" },
        { sourceName: "AP Meebhoomi Revenue Portal", url: "https://meebhoomi.ap.gov.in" }
      ]
    },
    {
      id: "blg_3",
      title: "NRI Property Buying in India: Understanding FEMA Regulations on Agricultural Land",
      slug: "nri-property-buying-fema-regulations-agricultural-land",
      category: "Land-use and Approval Basics",
      featuredImage: "https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80",
      shortDescription: "Crucial legal clarity for NRIs and OCIs: What residential and commercial properties you can buy, and how agricultural land restrictions apply under RBI guidelines.",
      content: `Under FEMA (Foreign Exchange Management Act) and RBI regulations:\n- NRIs/OCIs can freely buy any number of residential and commercial plots or built properties.\n- NRIs/OCIs CANNOT purchase agricultural land, plantation property, or farmhouses directly (unless inherited from resident Indians).\n\nTriport Properties guides NRIs strictly into authorized DTCP/TUDA approved residential layouts.`,
      author: "NRI Advisory Desk",
      publicationDate: "2026-03-20",
      isPublished: true,
      officialSourceLinks: [
        { sourceName: "Reserve Bank of India (RBI) Real Estate Regulations", url: "https://rbi.org.in" }
      ]
    }
  ],
  enquiries: [
    {
      id: "enq_1",
      name: "Suresh Babu",
      email: "suresh.babu@gmail.com",
      phone: "+91 98480 33445",
      type: "General",
      interestedIn: "Residential Plots",
      budgetRange: "₹20 Lakhs - ₹35 Lakhs",
      preferredLocation: "Renigunta Airport Road",
      message: "Looking for an immediate registration 200 sq.yd plot with TUDA approval near Renigunta.",
      status: "New",
      internalNotes: [],
      createdAt: new Date().toISOString()
    }
  ]
};

// Database helper functions
const getDB = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (e) {
    return initialData;
  }
};

const saveDB = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ======================== API ROUTES ========================

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', name: 'Triport Properties Single-File Engine', time: new Date() });
});

// Auth
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const db = getDB();
  const user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase().trim());
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
  // Allow admin123 directly or bcrypt compare
  const isMatch = password === 'admin123' || (await bcrypt.compare(password, user.passwordHash).catch(() => false));
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

app.put('/api/auth/update-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const db = getDB();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(newPassword, salt);
  saveDB(db);
  res.json({ success: true, message: 'Password updated successfully' });
});

// Projects
app.get('/api/projects', (req, res) => {
  const db = getDB();
  const { category, corridorZone, search, featured } = req.query;
  let list = db.projects;
  if (featured === 'true') list = list.filter(p => p.isFeaturedOnHome);
  if (category && category !== 'All') list = list.filter(p => p.propertyCategory === category);
  if (corridorZone && corridorZone !== 'All') list = list.filter(p => p.corridorZone === corridorZone);
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(s) || p.location.toLowerCase().includes(s));
  }
  res.json({ success: true, count: list.length, data: list });
});

app.get('/api/projects/:idOrSlug', (req, res) => {
  const db = getDB();
  const p = db.projects.find(item => item.id === req.params.idOrSlug || item.slug === req.params.idOrSlug);
  if (!p) return res.status(404).json({ success: false, message: 'Project not found' });
  res.json({ success: true, data: p });
});

app.post('/api/projects', authMiddleware, (req, res) => {
  const db = getDB();
  const newProj = {
    ...req.body,
    id: 'prj_' + Date.now(),
    slug: req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    createdAt: new Date().toISOString()
  };
  db.projects.unshift(newProj);
  saveDB(db);
  res.status(201).json({ success: true, data: newProj });
});

app.put('/api/projects/:id', authMiddleware, (req, res) => {
  const db = getDB();
  const idx = db.projects.findIndex(p => p.id === req.params.id || p._id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Project not found' });
  db.projects[idx] = { ...db.projects[idx], ...req.body };
  saveDB(db);
  res.json({ success: true, data: db.projects[idx] });
});

app.delete('/api/projects/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.projects = db.projects.filter(p => p.id !== req.params.id && p._id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: 'Project deleted' });
});

// Listings
app.get('/api/listings', (req, res) => {
  const db = getDB();
  const { status, landType, search } = req.query;
  let list = db.listings;
  if (status && status !== 'All') list = list.filter(l => l.status === status);
  if (landType && landType !== 'All') list = list.filter(l => l.landType === landType);
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(l => l.title.toLowerCase().includes(s) || l.plotNumberOrRef.toLowerCase().includes(s) || l.location.toLowerCase().includes(s));
  }
  res.json({ success: true, count: list.length, data: list });
});

app.post('/api/listings', authMiddleware, (req, res) => {
  const db = getDB();
  const item = { ...req.body, id: 'lst_' + Date.now(), createdAt: new Date().toISOString() };
  db.listings.unshift(item);
  saveDB(db);
  res.status(201).json({ success: true, data: item });
});

app.put('/api/listings/:id', authMiddleware, (req, res) => {
  const db = getDB();
  const idx = db.listings.findIndex(l => l.id === req.params.id || l._id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Listing not found' });
  db.listings[idx] = { ...db.listings[idx], ...req.body };
  saveDB(db);
  res.json({ success: true, data: db.listings[idx] });
});

app.delete('/api/listings/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.listings = db.listings.filter(l => l.id !== req.params.id && l._id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: 'Listing deleted' });
});

// Enquiries
app.get('/api/enquiries', authMiddleware, (req, res) => {
  const db = getDB();
  const { status, type, search } = req.query;
  let list = db.enquiries;
  if (status && status !== 'All') list = list.filter(e => e.status === status);
  if (type && type !== 'All') list = list.filter(e => e.type === type);
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(e => e.name.toLowerCase().includes(s) || e.phone.includes(s) || e.email.toLowerCase().includes(s));
  }
  res.json({ success: true, count: list.length, data: list });
});

app.post('/api/enquiries', (req, res) => {
  const db = getDB();
  const { name, email, phone, message } = req.body;
  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Name, phone, and message are required.' });
  }
  const enq = {
    ...req.body,
    id: 'enq_' + Date.now(),
    status: 'New',
    internalNotes: [],
    createdAt: new Date().toISOString()
  };
  db.enquiries.unshift(enq);
  saveDB(db);
  console.log(`[LEAD RECEIVED] ${enq.name} (${enq.phone}) - ${enq.interestedIn}`);
  res.status(201).json({ success: true, message: 'Enquiry received successfully! Our advisor will contact you.', data: enq });
});

app.put('/api/enquiries/:id/status', authMiddleware, (req, res) => {
  const db = getDB();
  const enq = db.enquiries.find(e => e.id === req.params.id || e._id === req.params.id);
  if (!enq) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  enq.status = req.body.status;
  saveDB(db);
  res.json({ success: true, data: enq });
});

app.post('/api/enquiries/:id/notes', authMiddleware, (req, res) => {
  const db = getDB();
  const enq = db.enquiries.find(e => e.id === req.params.id || e._id === req.params.id);
  if (!enq) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  if (!enq.internalNotes) enq.internalNotes = [];
  enq.internalNotes.push({ note: req.body.note, addedAt: new Date().toISOString() });
  saveDB(db);
  res.json({ success: true, data: enq });
});

app.delete('/api/enquiries/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.enquiries = db.enquiries.filter(e => e.id !== req.params.id && e._id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: 'Enquiry removed' });
});

app.get('/api/enquiries/export-csv', authMiddleware, (req, res) => {
  const db = getDB();
  const headers = 'ID,Name,Email,Phone,Type,InterestedIn,Budget,Location,Country,Company,Status,Date,Message\n';
  const rows = db.enquiries.map(e => {
    const cleanMsg = (e.message || '').replace(/"/g, '""').replace(/\n/g, ' ');
    return `"${e.id || e._id}","${e.name}","${e.email}","${e.phone}","${e.type}","${e.interestedIn}","${e.budgetRange}","${e.preferredLocation || ''}","${e.countryOfResidence || ''}","${e.companyName || ''}","${e.status}","${e.createdAt}","${cleanMsg}"`;
  }).join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="triport_enquiries.csv"');
  res.send(headers + rows);
});

// Services, Locations, Testimonials, Blogs, Settings
app.get('/api/services', (req, res) => {
  res.json({ success: true, data: getDB().services });
});

app.post('/api/services', authMiddleware, (req, res) => {
  const db = getDB();
  const s = { ...req.body, id: 'srv_' + Date.now() };
  db.services.push(s);
  saveDB(db);
  res.json({ success: true, data: s });
});

app.put('/api/services/:id', authMiddleware, (req, res) => {
  const db = getDB();
  const idx = db.services.findIndex(s => s.id === req.params.id);
  if (idx !== -1) {
    db.services[idx] = { ...db.services[idx], ...req.body };
    saveDB(db);
  }
  res.json({ success: true, data: db.services[idx] });
});

app.delete('/api/services/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.services = db.services.filter(s => s.id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: 'Deleted' });
});

app.get('/api/locations', (req, res) => {
  res.json({ success: true, data: getDB().locations });
});

app.post('/api/locations', authMiddleware, (req, res) => {
  const db = getDB();
  const l = { ...req.body, id: 'loc_' + Date.now() };
  db.locations.push(l);
  saveDB(db);
  res.json({ success: true, data: l });
});

app.put('/api/locations/:id', authMiddleware, (req, res) => {
  const db = getDB();
  const idx = db.locations.findIndex(l => l.id === req.params.id);
  if (idx !== -1) {
    db.locations[idx] = { ...db.locations[idx], ...req.body };
    saveDB(db);
  }
  res.json({ success: true, data: db.locations[idx] });
});

app.delete('/api/locations/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.locations = db.locations.filter(l => l.id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: 'Deleted' });
});

app.get('/api/testimonials', (req, res) => {
  res.json({ success: true, data: getDB().testimonials });
});

app.post('/api/testimonials', authMiddleware, (req, res) => {
  const db = getDB();
  const t = { ...req.body, id: 'tst_' + Date.now() };
  db.testimonials.push(t);
  saveDB(db);
  res.json({ success: true, data: t });
});

app.put('/api/testimonials/:id', authMiddleware, (req, res) => {
  const db = getDB();
  const idx = db.testimonials.findIndex(t => t.id === req.params.id);
  if (idx !== -1) {
    db.testimonials[idx] = { ...db.testimonials[idx], ...req.body };
    saveDB(db);
  }
  res.json({ success: true, data: db.testimonials[idx] });
});

app.delete('/api/testimonials/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.testimonials = db.testimonials.filter(t => t.id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: 'Deleted' });
});

app.get('/api/blogs', (req, res) => {
  res.json({ success: true, data: getDB().blogs });
});

app.get('/api/blogs/:idOrSlug', (req, res) => {
  const b = getDB().blogs.find(item => item.id === req.params.idOrSlug || item.slug === req.params.idOrSlug);
  if (!b) return res.status(404).json({ success: false, message: 'Blog not found' });
  res.json({ success: true, data: b });
});

app.post('/api/blogs', authMiddleware, (req, res) => {
  const db = getDB();
  const b = { ...req.body, id: 'blg_' + Date.now(), publicationDate: new Date().toISOString() };
  db.blogs.unshift(b);
  saveDB(db);
  res.json({ success: true, data: b });
});

app.put('/api/blogs/:id', authMiddleware, (req, res) => {
  const db = getDB();
  const idx = db.blogs.findIndex(b => b.id === req.params.id);
  if (idx !== -1) {
    db.blogs[idx] = { ...db.blogs[idx], ...req.body };
    saveDB(db);
  }
  res.json({ success: true, data: db.blogs[idx] });
});

app.delete('/api/blogs/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.blogs = db.blogs.filter(b => b.id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: 'Deleted' });
});

app.get('/api/settings/:key', (req, res) => {
  const s = getDB().settings[req.params.key];
  res.json({ success: true, data: s || null });
});

app.put('/api/settings/:key', authMiddleware, (req, res) => {
  const db = getDB();
  db.settings[req.params.key] = req.body.data;
  saveDB(db);
  res.json({ success: true, message: 'Settings saved', data: db.settings[req.params.key] });
});

app.get('/api/stats', authMiddleware, (req, res) => {
  const db = getDB();
  res.json({
    success: true,
    stats: {
      totalProjects: db.projects.length,
      totalListings: db.listings.length,
      availableProperties: db.listings.filter(l => l.status === 'Available').length,
      soldProperties: db.listings.filter(l => l.status === 'Sold').length,
      reservedProperties: db.listings.filter(l => l.status === 'Reserved').length,
      totalEnquiries: db.enquiries.length,
      newEnquiries: db.enquiries.filter(e => e.status === 'New').length,
      totalBlogs: db.blogs.length
    }
  });
});

// Serve frontend single file index.html directly from root or dist
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
app.use((req, res) => {
  if (fs.existsSync(path.join(__dirname, 'frontend', 'dist', 'index.html'))) {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  } else if (fs.existsSync(path.join(__dirname, 'index.html'))) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.send('Triport Properties Single File Engine is Running. Access /api/health');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` Triport Properties Single-File Engine Running on:`);
  console.log(` http://localhost:${PORT}`);
  console.log(` Admin Portal: http://localhost:${PORT}/admin`);
  console.log(` Default Login: admin@triportproperties.com / admin123`);
  console.log(`======================================================\n`);
});
