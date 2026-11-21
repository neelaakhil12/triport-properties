const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Project = require('./models/Project');
const Listing = require('./models/Listing');
const Service = require('./models/Service');
const LocationItem = require('./models/LocationItem');
const Testimonial = require('./models/Testimonial');
const Blog = require('./models/Blog');
const Setting = require('./models/Setting');

const seedData = async () => {
  try {
    console.log('Seeding database for Triport Properties...');

    // 1. Admin User
    await User.deleteMany();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    await User.create({
      name: 'Triport Principal Advisor',
      email: 'admin@triportproperties.com',
      password: hashedPassword,
      role: 'superadmin'
    });
    console.log('Admin user seeded (admin@triportproperties.com / admin123)');

    // 2. Settings (General, Home, About, NRI, Corporate)
    await Setting.deleteMany();
    await Setting.create([
      {
        key: 'general',
        data: {
          companyName: 'Triport Properties',
          tagline: 'Every Route Leads to Growth. Join the Growth Corridor.',
          email: 'advisory@triportproperties.com',
          phone: '+91 877 225 9988',
          whatsappNumber: '+91 98480 12345',
          officeAddress: 'Triport Tower, 3rd Floor, Near Regional Science Centre, Alipiri - Renigunta Bypass Road, Tirupati, Andhra Pradesh - 517501, India',
          officeHours: 'Monday - Saturday: 9:00 AM - 6:30 PM | Sunday: Prior Site Visits Only',
          socialLinks: {
            facebook: 'https://facebook.com/triportproperties',
            linkedin: 'https://linkedin.com/company/triport-properties',
            twitter: 'https://twitter.com/triportprop',
            youtube: 'https://youtube.com/@triportproperties'
          },
          footerDisclaimer: 'Information on this site is for general guidance only and is not an offer to sell. Buyers should verify title, approvals and documents independently and consult a qualified lawyer before purchase.'
        }
      },
      {
        key: 'home',
        data: {
          heroHeadline: 'Every Route Leads to Growth',
          heroSubheadline: 'Land and investment advisory across the Tirupati–Naidupeta Growth Corridor, with access to temple town, highways, airports, ports and industry.',
          heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
          introHeading: 'Your Trusted Partner in Land Investment',
          introDescription: 'Tri-Port Properties helps individuals, families and companies buy land with confidence. We advise on residential plots, commercial plots, open plots, open land for investment, farm land and land banks for companies, always with a clear view of location, connectivity and approvals.',
          whyCorridor: [
            {
              title: 'Faith and Tourism',
              description: "Tirupati, one of India's most visited pilgrimage towns, creates steady demand for housing, hospitality and services.",
              icon: 'Landmark'
            },
            {
              title: 'Industry',
              description: "The Naidupeta–Sullurpeta–Tada belt is one of Andhra Pradesh's major industrial corridors.",
              icon: 'Factory'
            },
            {
              title: 'Ports and Trade',
              description: 'Krishnapatnam, Dugarajapatnam and Ramayapatnam ports link the region to coastal and export trade.',
              icon: 'Anchor'
            }
          ],
          ctaHeading: 'Not Sure Where to Invest?',
          ctaDescription: 'Let our local experts help you identify the right land investment opportunity across the Tirupati-Naidupeta corridor.',
          ctaButtonText: 'Book a Free Consultation'
        }
      },
      {
        key: 'about',
        data: {
          heading: 'Advisors for Land, Built on Local Knowledge',
          introduction: 'We are a land investment advisory based on the Tirupati–Naidupeta corridor. Our role is to help you make a sound decision, not just a sale. We explain the location, the infrastructure plans, the title and approval status, and the likely use of the land before you commit.',
          ourApproach: [
            'Plain-language advice with no pressure to buy.',
            'Verification of records and layout approvals before any recommendation.',
            'Advice for individuals, families, farmers and companies.'
          ],
          ourPromise: 'We recommend only the land we would be comfortable buying ourselves.',
          vision: "To be the most respected, transparent, and legally sound land advisory along the Southern East-Coast corridor of India.",
          mission: 'To protect our clients capital through stringent due diligence, unbiased property assessments, and transparent documentation assistance.',
          localExpertise: 'Our advisory team is deeply rooted in the Rayalaseema and coastal regions. We track master plans, industrial allocations, road widenings, and real revenue records directly at the source.',
          transparency: 'We provide copies of all available approvals, encumbrance certificates, layout sanctions, and link documents upfront before any transaction.'
        }
      },
      {
        key: 'nri',
        data: {
          heading: 'Your Trusted Land Investment Partner in India',
          subheading: 'Invest in your roots with confidence. Tri-Port Properties helps NRIs explore land opportunities across the Tirupati–Naidupeta Growth Corridor with local assistance and transparent guidance.',
          legalNote: 'Property ownership eligibility for NRIs and OCIs depends on applicable Indian laws (FEMA guidelines and RBI regulations). Agricultural land, plantation property and farmhouses have specific statutory restrictions for NRI/OCI purchase. Triport Properties provides transparent guidance and recommends independent legal review prior to contract execution.'
        }
      },
      {
        key: 'corporate',
        data: {
          heading: 'Land Banks for Growing Businesses',
          description: 'We help companies secure strategic land parcels ahead of industrial and logistic expansion along the Tirupati-Naidupeta industrial corridor.'
        }
      }
    ]);
    console.log('Settings seeded.');

    // 3. Services
    await Service.deleteMany();
    await Service.create([
      {
        name: 'Residential Plots',
        slug: 'residential-plots',
        tagline: 'Gated & Approved Layouts for Future Living',
        shortDescription: 'Plots in developing layouts close to housing demand, schools and transport. Best for end-use or long-term family homes.',
        fullDescription: 'Our residential plot advisory focuses on approved layouts (TUDA / DTCP) in emerging residential clusters surrounding Tirupati, Renigunta, and Yerpedu. Each layout is vetted for road widths, drinking water infrastructure, power lines, and clear title passbooks.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        benefits: [
          'Immediate registration with clear title deed',
          'TUDA / DTCP layout sanctions with standard compound fencing',
          'Proximity to educational institutions and transit hubs',
          'High rental and resale appeal for end-use families'
        ],
        idealFor: ['Families building homes', 'Salaried professionals', 'Long-term individual investors'],
        order: 1
      },
      {
        name: 'Commercial Plots',
        slug: 'commercial-plots',
        tagline: 'High-Footfall Highway & Corridor Frontages',
        shortDescription: 'Plots on main roads and near industrial and transport hubs, suited to shops, offices, warehouses and service businesses.',
        fullDescription: 'Prime commercial land plots along NH 71 (Tirupati-Naidupeta) and NH 16 (Chennai-Kolkata). Ideal for retail showrooms, commercial office complexes, logistic yards, hospitality hotels, and fast-moving transit diners.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        benefits: [
          'High road frontage with wide 60ft to 150ft access',
          'Zoned for commercial and mixed-use commercial activity',
          'Direct exposure to heavy pilgrim and freight traffic',
          'Excellent leasehold and yield potential'
        ],
        idealFor: ['Business owners', 'Commercial builders', 'Hospitality developers', 'HNI investors'],
        order: 2
      },
      {
        name: 'Open Plots',
        slug: 'open-plots',
        tagline: 'Strategic Entry-Level Growth Parcels',
        shortDescription: 'Approved open plots for steady appreciation as surrounding areas develop.',
        fullDescription: 'Strategically positioned open plots within the urban development authority boundaries. Sourced at competitive early-stage valuations to guarantee steady capital appreciation over a 3 to 7 year horizon.',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        benefits: [
          'Affordable ticket sizes for early investors',
          'Vetted for encumbrance-free records',
          'Positioned along planned arterial expansion roads',
          'Low maintenance holding cost'
        ],
        idealFor: ['First-time land buyers', 'Portfolio diversification', 'Retirement savings'],
        order: 3
      },
      {
        name: 'Open Land for Investment',
        slug: 'open-land-for-investment',
        tagline: 'Large Acreage Capital Appreciation Parcels',
        shortDescription: 'Larger parcels for long-term holding, with a clear view of future use and exit options.',
        fullDescription: 'Parcels from 2 acres to 25 acres along the growth axis between Renigunta, Srikalahasti, and Naidupeta. We provide comprehensive contour study, boundary demarcations, and legal title chain documentation.',
        image: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80',
        benefits: [
          'Economical price per acre compared to subdivided plots',
          'Multiple future exit options: plotted layout, institutional, or logistics',
          'Verified revenue survey records with digital FMB maps',
          'Dedicated boundary survey and stone demarcation support'
        ],
        idealFor: ['Real estate syndicates', 'HNIs', 'Long-term wealth builders'],
        order: 4
      },
      {
        name: 'Farm Lands',
        slug: 'farm-lands',
        tagline: 'Productive Agricultural & Managed Agro-Farmland',
        shortDescription: 'Agricultural land for farming, orchards or future conversion, with checks on soil, water access and land-use rules.',
        fullDescription: 'Fertile agricultural holdings in the Swarnamukhi river basin and surrounding rural belts. Verified for sweet groundwater availability, soil testing reports, Pattadar passbooks, and clear cultivation histories.',
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
        benefits: [
          'High water table and verified borewell permissions',
          'Clear Pattadar passbooks with 1B revenue verification',
          'Suitable for horticulture (Mango, Lemon, Teak) or organic farming',
          'Fencing and caretaker guidance provided'
        ],
        idealFor: ['Farmers expanding holdings', 'Agri-investors', 'Weekend farm enthusiasts'],
        order: 5
      },
      {
        name: 'Land Bank for Companies',
        slug: 'land-bank-for-companies',
        tagline: 'Industrial, Institutional & Logistics Aggregation',
        shortDescription: 'Curated land banks for businesses planning factories, warehouses, logistics centres, hospitals or institutions. We handle site shortlisting, due diligence and negotiation.',
        fullDescription: 'Comprehensive institutional land advisory catering to industrial conglomerates, manufacturing MNCs, e-commerce fulfillment hubs, and hospital chains looking to set up in the Tada-Sri City-Naidupeta-Krishnapatnam node.',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        benefits: [
          'Contiguous acreage aggregation up to 100+ acres',
          'NHAI highway feeder access & heavy vehicle turning radii checks',
          'Zoning checks with APIIC & master plan compliance',
          'End-to-end liaison with legal, revenue, and local bodies'
        ],
        idealFor: ['Manufacturing companies', 'Logistics & 3PL operators', 'Corporate institutions', 'Industrial builders'],
        order: 6
      }
    ]);
    console.log('Services seeded.');

    // 4. Projects
    await Project.deleteMany();
    const seededProjects = await Project.create([
      {
        name: 'Corridor Prime Greens',
        slug: 'corridor-prime-greens',
        tagline: 'TUDA Approved Premium Layout on Tirupati-Renigunta Growth Axis',
        location: 'Renigunta Airport Road, Tirupati District',
        corridorZone: 'Renigunta Airport Road',
        propertyCategory: 'Residential Plots',
        availablePlotSizes: '167 to 400 Sq. Yards',
        totalLandArea: '18.5 Acres',
        priceRange: '₹18 Lakhs - ₹42 Lakhs',
        approvalStatus: 'TUDA Approved LP No: 38/2023',
        roadAccess: '60ft Master Plan Road & 40ft Internal Blacktop Roads',
        nearbyLocations: ['Tirupati International Airport (7 mins)', 'IIT Tirupati (12 mins)', 'Renigunta Junction (10 mins)'],
        shortDescription: 'Gated residential layout offering DTCP/TUDA sanctions, underground drainage, electricity transformers, and avenue plantation right next to the airport corridor.',
        detailedOverview: 'Corridor Prime Greens represents one of the most strictly compliant residential communities in the Greater Tirupati region. Located along the 6-lane expanded airport connector, the project caters to professionals, airport personnel, and investors seeking clean capital appreciation.',
        featuredImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80'
        ],
        isFeaturedOnHome: true,
        status: 'Available',
        amenities: ['40ft & 60ft BT Roads', 'Underground Drainage', 'Electricity with Street Lights', 'Park Area Developed', 'Overhead Water Tank'],
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.8457636683526!2d79.544289!3d13.632289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b1a43a6d967%3A0xbcf70db95e69e2cb!2sTirupati%20Airport!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        reraNumber: 'APRERA Applied - Reg Verified'
      },
      {
        name: 'Naidupeta Logistics & Commercial Vista',
        slug: 'naidupeta-commercial-vista',
        tagline: 'Strategic Highway Frontage Facing NH-16 / NH-71 Junction',
        location: 'NH-16 Junction, Naidupeta, Tirupati District',
        corridorZone: 'Naidupeta',
        propertyCategory: 'Commercial Plots',
        availablePlotSizes: '500 to 2,500 Sq. Yards',
        totalLandArea: '14 Acres',
        priceRange: '₹45 Lakhs - ₹1.8 Crores',
        approvalStatus: 'Commercial Land-Use Sanctioned / Freehold Title',
        roadAccess: '150ft NH-16 Highway Frontage with Dedicated Service Lane',
        nearbyLocations: ['Naidupeta Industrial SEZ (4 km)', 'Krishnapatnam Port Road (2 km)', 'Sullurpeta (18 km)'],
        shortDescription: 'Unmatched highway frontage commercial parcels suited for logistics hubs, fuel stations, motels, and enterprise commercial complexes.',
        detailedOverview: 'Positioned at the pivotal junction of the golden quadrilateral NH-16 and NH-71 connecting directly to the seaport and temple city. A high-yield investment parcel for commercial enterprises.',
        featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
        ],
        isFeaturedOnHome: true,
        status: 'Available',
        amenities: ['150ft Frontage Road', 'Direct Heavy Vehicle Ingress', 'High Tension Power Proximity', 'Clear Revenue Title'],
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124119.5317769264!2d79.831518!3d13.911364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4ce43d70b6fbff%3A0xb35a146ce36e65b2!2sNaidupeta%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        reraNumber: 'Exempt - Commercial Subdivided'
      },
      {
        name: 'Swarnamukhi Agro Orchards',
        slug: 'swarnamukhi-agro-orchards',
        tagline: 'Fertile River-Basin Agricultural Land with Abundant Sweet Water',
        location: 'Yerpedu - Srikalahasti Belt, Andhra Pradesh',
        corridorZone: 'Tirupati',
        propertyCategory: 'Farm Lands',
        availablePlotSizes: '1 Acre to 5 Acres Parcels',
        totalLandArea: '32 Acres Contiguous',
        priceRange: '₹28 Lakhs / Acre onwards',
        approvalStatus: 'Clear Pattadar Passbook & 1B Revenue Record Verified',
        roadAccess: '33ft Panchayat Blacktop Feeder Road',
        nearbyLocations: ['Srikalahasti Temple (12 km)', 'Yerpedu Railway Hub (8 km)', 'Tirupati (24 km)'],
        shortDescription: 'Lush fertile farmland bordered by natural irrigation canals. Perfect for mango, coconut, or organic micro-farming with verified soil testing.',
        detailedOverview: 'Swarnamukhi Agro Orchards offers peaceful, verified agricultural holdings. Completely surveyed using total station DGPS equipment with stone markers in place.',
        featuredImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
        ],
        isFeaturedOnHome: true,
        status: 'Few Plots Left',
        amenities: ['Continuous Borewell Water Access', 'Solar Fence Boundary Option', '33ft All-Weather Approach', 'Rich Alluvial Soil'],
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124083.5671182276!2d79.620000!3d13.750000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d46b772091763%3A0x9a8435d03824bb88!2sSrikalahasti%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        reraNumber: 'Revenue Freehold / Agricultural'
      },
      {
        name: 'Sri City Peripheral Corporate Land Bank',
        slug: 'sri-city-peripheral-land-bank',
        tagline: 'Aggregated Industrial & Institutional Parcel along Tada-Sullurpeta Axis',
        location: 'Tada - Sri City Growth Environs, Andhra Pradesh',
        corridorZone: 'Sri City Belt',
        propertyCategory: 'Corporate Land Banks',
        availablePlotSizes: '5 Acres to 50 Acres',
        totalLandArea: '75 Acres Total Bank',
        priceRange: 'Custom Corporate Pricing on Due Diligence',
        approvalStatus: 'Industrial Zoning Feasibility Certified / Clear Single-Owner Title',
        roadAccess: '80ft Planned Industrial Arterial Access with Direct NH-16 link',
        nearbyLocations: ['Sri City SEZ North Gate (6 km)', 'Tada Railway Station (8 km)', 'Chennai Ennore Port (55 km)'],
        shortDescription: 'Ideal for industrial setups, automotive ancillary units, cold storage warehousing, and corporate institutions seeking strategic proximity to Chennai and AP ports.',
        detailedOverview: 'Curated specifically for corporate entities planning industrial establishments. Complete due diligence package includes 30-year encumbrance certificates, physical boundary survey, topographical contour maps, and environmental proximity records.',
        featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80'
        ],
        isFeaturedOnHome: true,
        status: 'Available',
        amenities: ['Heavy Transport Roadway', 'High Voltage Power Feeder Line', 'Industrial Groundwater Feasibility', 'Contiguous Single Boundary'],
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124294.62953245452!2d80.000000!3d13.570000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d7912ad52857f%3A0xc3f6f1c4aa99ef5e!2sSri%20City%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        reraNumber: 'Direct Land Bank Acquisition'
      }
    ]);
    console.log('Projects seeded.');

    // 5. Listings (Individual plots/parcels)
    await Listing.deleteMany();
    await Listing.create([
      {
        title: 'East Facing 200 Sq.yd Residential Plot in Corridor Prime Greens',
        projectId: seededProjects[0]._id,
        plotNumberOrRef: 'Plot #18 (Phase 1)',
        location: 'Renigunta Airport Road, Tirupati',
        plotOrLandSize: '200 Sq. Yards (36ft x 50ft)',
        landType: 'Residential Plots',
        approvalStatus: 'TUDA Approved LP No: 38/2023',
        roadAccess: '40ft Internal Blacktop Road',
        distanceToKeyPoints: '6 km to Tirupati Airport, 8 km to Railway Station, 3 km to NH-71',
        priceRange: '₹22,00,000 (₹11,000/sq.yd)',
        verifiedDocuments: ['TUDA Approved Master Layout Plan', '30 Years Encumbrance Certificate', 'Clear Link Document Chain'],
        images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'],
        status: 'Available',
        facing: 'East'
      },
      {
        title: 'Corner Commercial Plot on 60ft Arterial Road',
        projectId: seededProjects[0]._id,
        plotNumberOrRef: 'Commercial Plot #C-02',
        location: 'Airport Expressway Sector, Renigunta',
        plotOrLandSize: '450 Sq. Yards',
        landType: 'Commercial Plots',
        approvalStatus: 'TUDA Approved Commercial Zoning',
        roadAccess: '60ft x 40ft Corner BT Roads',
        distanceToKeyPoints: '4.5 km to Tirupati Airport, 1.5 km to Renigunta Flyover',
        priceRange: '₹67,50,000 (₹15,000/sq.yd)',
        verifiedDocuments: ['Commercial Zoned Sanction', 'Clear Title Passbook', 'Town Planning Certificate'],
        images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'],
        status: 'Available',
        facing: 'Corner / Multi-facing'
      },
      {
        title: 'North Facing 167 Sq.yd Affordable Villa Plot',
        projectId: seededProjects[0]._id,
        plotNumberOrRef: 'Plot #45',
        location: 'Renigunta-Yerpedu Road',
        plotOrLandSize: '167 Sq. Yards (30ft x 50ft)',
        landType: 'Residential Plots',
        approvalStatus: 'TUDA Approved LP No: 38/2023',
        roadAccess: '40ft Blacktop Road',
        distanceToKeyPoints: '5 km to Airport, 4 km to IIT Tirupati',
        priceRange: '₹18,37,000',
        verifiedDocuments: ['Approved Layout Plan', 'Nil Encumbrance Certificate', 'Conversion Order'],
        images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'],
        status: 'Reserved',
        facing: 'North'
      },
      {
        title: 'Prime 1,000 Sq.yd Commercial Plot on NH-16 Naidupeta',
        projectId: seededProjects[1]._id,
        plotNumberOrRef: 'Highway Plot #HP-01',
        location: 'NH-16 Corridor, Naidupeta',
        plotOrLandSize: '1,000 Sq. Yards',
        landType: 'Commercial Plots',
        approvalStatus: 'NHAI Service Road NOC / Freehold Title',
        roadAccess: '150ft NH-16 Service Road Frontage',
        distanceToKeyPoints: '2 km to Naidupeta Bus Stand, 35 km to Krishnapatnam Port Feeder',
        priceRange: '₹85,00,000',
        verifiedDocuments: ['NHAI Access NOC', 'Revenue Title Verification', '1B Passbook'],
        images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'],
        status: 'Available',
        facing: 'East'
      },
      {
        title: '3-Acre Fertile Organic Farmland with Borewell',
        projectId: seededProjects[2]._id,
        plotNumberOrRef: 'Survey #142/2A',
        location: 'Swarnamukhi Basin, Srikalahasti - Yerpedu Belt',
        plotOrLandSize: '3.0 Acres',
        landType: 'Farm Lands',
        approvalStatus: 'Clear Pattadar Passbook & Webland Record Verified',
        roadAccess: '33ft Metalled Rural Feeder Road',
        distanceToKeyPoints: '9 km to Srikalahasti, 18 km to Tirupati Airport',
        priceRange: '₹84,00,000 (₹28 Lakhs/Acre)',
        verifiedDocuments: ['Pattadar Digital Passbook', 'Adangal 1B Verified', 'Soil Quality Certificate'],
        images: ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'],
        status: 'Available',
        facing: 'East'
      },
      {
        title: 'Sold Out - 240 Sq.yd Residential Plot in Phase 1',
        projectId: seededProjects[0]._id,
        plotNumberOrRef: 'Plot #08',
        location: 'Renigunta Airport Road',
        plotOrLandSize: '240 Sq. Yards',
        landType: 'Residential Plots',
        approvalStatus: 'TUDA Approved',
        roadAccess: '40ft BT Road',
        distanceToKeyPoints: '6 km to Airport',
        priceRange: '₹26,40,000',
        verifiedDocuments: ['Registered Sale Deed Executed', 'TUDA Final Sanction'],
        images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'],
        status: 'Sold',
        facing: 'West'
      }
    ]);
    console.log('Listings seeded.');

    // 6. Locations and Connectivity
    await LocationItem.deleteMany();
    await LocationItem.create([
      {
        name: 'Tirupati Temple Town & Knowledge Hub',
        corridorRole: 'Spiritual, Hospitality, Healthcare & Academic Anchor',
        description: "Tirupati is one of India's most visited pilgrimage centers, hosting over 25 million devotees annually. This perennial inflow creates consistent, recession-resistant demand for hospitality, rental residential housing, medical facilities, and premier higher education campuses including IIT Tirupati, IISER, and SV University.",
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        distances: [
          { destination: 'Renigunta Junction', distanceKm: '10 km', travelTime: '15 mins' },
          { destination: 'Tirupati International Airport', distanceKm: '14 km', travelTime: '20 mins' },
          { destination: 'Sri City SEZ', distanceKm: '68 km', travelTime: '1 hr 15 mins' },
          { destination: 'Chennai City', distanceKm: '135 km', travelTime: '2 hrs 45 mins' }
        ],
        connectivityHighlights: [
          'Quad-track railway station connecting to all major Indian metropolises',
          'Alipiri and Srinivasa Mangapuram bypass corridors easing urban congestion',
          'Presence of Apollo, Amara, and SVIMS multi-specialty healthcare networks'
        ],
        verifiedStatus: 'Verified via Urban Development Authority (TUDA) & District Administration',
        order: 1
      },
      {
        name: 'Naidupeta - Sullurpeta - Tada Industrial Belt',
        corridorRole: 'Manufacturing, Engineering & Global Export Powerhouse',
        description: 'The Naidupeta-Sullurpeta-Tada corridor forms the economic industrial backbone of southern Andhra Pradesh. Housing mega industrial parks, multi-product SEZs, and global industrial parks, this zone accommodates Fortune 500 manufacturing, automotive, electronics, and aerospace manufacturing plants.',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        distances: [
          { destination: 'Sri City Multi-Product SEZ', distanceKm: '18 km', travelTime: '22 mins' },
          { destination: 'ISRO Satish Dhawan Space Centre', distanceKm: '22 km', travelTime: '30 mins' },
          { destination: 'Krishnapatnam Port', distanceKm: '62 km', travelTime: '1 hr' },
          { destination: 'Tirupati City Centre', distanceKm: '64 km', travelTime: '1 hr 10 mins' }
        ],
        connectivityHighlights: [
          'Direct access to 6-lane National Highway 16 (Chennai - Kolkata Golden Quadrilateral)',
          'Heavy industrial power transmission substations and dedicated water lines from Kandaleru',
          'Proximity to 100+ operating multinational production units and supply vendors'
        ],
        verifiedStatus: 'Verified via APIIC & District Industries Centre Records',
        order: 2
      },
      {
        name: 'National Highways (NH-71 & NH-16)',
        corridorRole: 'High-Speed Freight & Inter-State Commuter Arteries',
        description: 'National Highway 71 directly joins Tirupati with Naidupeta, linking the spiritual heartland to the coastal maritime highway NH-16. This provides heavy cargo trucks, commuters, and pilgrims seamless dual-carriageway access with toll infrastructure and bypass loops.',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
        distances: [
          { destination: 'NH-71 (Tirupati to Naidupeta)', distanceKm: '58 km', travelTime: '55 mins' },
          { destination: 'NH-16 (Naidupeta to Tada / Border)', distanceKm: '42 km', travelTime: '40 mins' },
          { destination: 'Bangalore - Tirupati Expressway Link', distanceKm: '110 km', travelTime: '1 hr 45 mins' }
        ],
        connectivityHighlights: [
          '4-lane to 6-lane paved shoulders designed for 100 km/h speeds',
          'Direct feeder connectors to Renigunta logistics sidings and dry ports',
          'Well-lit toll plazas and emergency response trauma stations'
        ],
        verifiedStatus: 'Verified via National Highways Authority of India (NHAI)',
        order: 3
      },
      {
        name: 'Tirupati International Airport (TIR)',
        corridorRole: 'Domestic & Regional Passenger & Cargo Air Terminal',
        description: 'Located at Renigunta along NH-71, the airport features a modern Garuda-themed integrated passenger terminal with direct flights to Hyderabad, Bangalore, New Delhi, Mumbai, and Vijayawada. International cargo feasibility is underway to support perishables and pharmaceutical exports.',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        distances: [
          { destination: 'Renigunta Railway Junction', distanceKm: '4 km', travelTime: '6 mins' },
          { destination: 'Tirupati Central Bus Station', distanceKm: '14 km', travelTime: '20 mins' },
          { destination: 'IIT Tirupati Campus', distanceKm: '9 km', travelTime: '12 mins' }
        ],
        connectivityHighlights: [
          '2,286 meter runway capable of handling Code-C aircraft (Airbus A320 / Boeing 737)',
          'Expanded parking aprons with aerobridges and rapid freight handling',
          'Adjacent to the upcoming Electronics Manufacturing Cluster (EMC 1 & 2)'
        ],
        verifiedStatus: 'Verified via Airports Authority of India (AAI) Operational Schedules',
        order: 4
      },
      {
        name: 'Ports (Krishnapatnam, Dugarajapatnam & Ramayapatnam)',
        corridorRole: 'Deep-Water Coastal Maritime Gateways & Export Trade',
        description: 'Krishnapatnam Port is one of India’s deepest all-weather deep-water private ports handling bulk container, coal, edible oil, and break-bulk exports. With planned developments at Ramayapatnam and Dugarajapatnam, the entire corridor is positioned as the primary maritime outlet for Rayalaseema and south-coastal industries.',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        distances: [
          { destination: 'Krishnapatnam Port from Naidupeta', distanceKm: '62 km', travelTime: '1 hr' },
          { destination: 'Krishnapatnam Port from Tirupati', distanceKm: '118 km', travelTime: '2 hrs' },
          { destination: 'Ennore Port (Chennai)', distanceKm: '88 km', travelTime: '1 hr 45 mins' }
        ],
        connectivityHighlights: [
          'Dedicated double-line electrified railway siding connecting Krishnapatnam to Obulavaripalli',
          'Container Freight Stations (CFS) and cold chain infrastructure along the port access road',
          'Direct maritime shipping routes to East Asia, the Middle East, and Europe'
        ],
        verifiedStatus: 'Verified via Indian Ports Association & Maritime Board Notifications',
        order: 5
      }
    ]);
    console.log('Locations seeded.');

    // 7. Testimonials (authentic client speak as depicted in user mockup)
    await Testimonial.deleteMany();
    await Testimonial.create([
      {
        clientName: 'Harsha Lanka',
        designationOrLocation: 'Hyderabad, India',
        propertyPurchased: 'Residential Plot (Corridor Prime Greens)',
        quote: 'Satish and team are absolutely wonderful to work with. It is like having a friend on the inside who is working for you. They responded fast all the time and got us the best plot under our budget. Team was honest and forthright - no games. After dealing with several other agents and being disappointed, we felt lucky to find Triport.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        isPublished: true,
        order: 1
      },
      {
        clientName: 'Vinod Kumar E',
        designationOrLocation: 'NRI Investor, Canada',
        propertyPurchased: '2-Acre Investment Parcel near Naidupeta',
        quote: 'Buying the right plot or agricultural parcel when you stay overseas in Canada is never easy. But the Triport team made it absolutely seamless. They are very professional. They coordinated the title checks, boundary stones, and video walk-throughs with complete clarity. We will continue to recommend them to all our family and friends.',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        isPublished: true,
        order: 2
      },
      {
        clientName: 'Hari Krishna P',
        designationOrLocation: 'Industrial Vendor, Hyderabad',
        propertyPurchased: 'Commercial Plot along Highway',
        quote: 'The team helped us with an open plot with clear title near the expansion corridor. They were extremely helpful, open, transparent, and reliable through the whole process. They really cared about us, understood our commercial access needs from the very first discussion, and even assured us with factual resale and development data.',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        isPublished: true,
        order: 3
      }
    ]);
    console.log('Testimonials seeded.');

    // 8. Blog / Insights Articles
    await Blog.deleteMany();
    await Blog.create([
      {
        title: 'Tirupati-Naidupeta Growth Corridor: Why Infrastructure Is Driving Land Value',
        slug: 'tirupati-naidupeta-growth-corridor-infrastructure-value',
        category: 'Infrastructure Updates',
        featuredImage: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'An analysis of NH-71 widening, the Renigunta electronics cluster, and how port feeder highways are transforming Rayalaseema into an east-coast economic gateway.',
        content: `### The Strategic Convergence of Road, Rail, Air, and Port

The Tirupati-Naidupeta corridor connects religious tourism, domestic passenger aviation, and heavy manufacturing with major maritime ports. With the upgradation of NH-71 and feeder connectors into NH-16, transport transit times have dropped from over 2 hours to under 50 minutes.

#### Key Growth Catalysts:
1. **The Electronics Manufacturing Clusters (EMC 1 & 2):** Developed near Renigunta Airport, attracting contract electronics assemblers and ancillary suppliers.
2. **Heavy Industrial Nodes:** The Tada-Naidupeta corridor continues to see sustained capacity expansion from international consumer durable and mobility manufacturers.
3. **Deep Water Port Outlets:** Direct electrified rail line connecting Obulavaripalli to Krishnapatnam Port bypasses congested Chennai metropolitan rail lines, giving regional manufacturing unprecedented logistics efficiency.

Investors evaluating land in this corridor should focus on layout approvals (TUDA/DTCP) and documented road access rather than unapproved speculative sub-divisions.`,
        author: 'Triport Research Desk',
        publicationDate: new Date('2026-02-15'),
        isPublished: true,
        officialSourceLinks: [
          { sourceName: 'National Highways Authority of India (NHAI)', url: 'https://nhai.gov.in' },
          { sourceName: 'Tirupati Urban Development Authority (TUDA)', url: 'https://tudaap.in' }
        ],
        seoTitle: 'Tirupati Naidupeta Corridor Land Investment Analysis | Triport Properties',
        metaDescription: 'Discover the infrastructure drivers behind land value appreciation across the Tirupati-Naidupeta growth corridor in Andhra Pradesh.'
      },
      {
        title: '5 Document Verification Steps Every Land Buyer in Andhra Pradesh Must Know',
        slug: '5-document-verification-steps-land-buyer-andhra-pradesh',
        category: 'Buying Checklists',
        featuredImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'A practical, lawyer-backed guide to checking Encumbrance Certificates, 1B Adangal records, Webland passbooks, and layout approval sanctions.',
        content: `### Safeguarding Your Capital: The Golden Checklist

Buying land in Andhra Pradesh requires rigorous multi-tier verification before paying an advance or token amount:

1. **Check the Webland 1B Record:** For agricultural or raw land, verify the survey number on the official AP Meebhoomi portal. Confirm whether the land is in the prohibited properties list under Section 22-A of the Registration Act.
2. **Obtain a 30-Year Encumbrance Certificate (EC):** Never settle for a 5-year or 10-year EC. A 30-year search on the IGRS portal ensures there are no existing mortgages, court attachments, or undisclosed partition deeds.
3. **Confirm Final Layout Approval (TUDA / DTCP):** A draft layout is **not** an approval. Verify that the promoter has obtained the final layout permission (LP Number) and that the public open spaces and roads have been formally gifted to the local civic body.
4. **Physical Demarcation & FMB Sketch:** Always compare the physical land boundaries with the Field Measurement Book (FMB) sketch. Ensure the stones match government revenue survey markings.
5. **Clear Link Document Chain:** Trace ownership titles back at least 30 years to guarantee an unbroken chain of title passing through legitimate registered instruments.`,
        author: 'Legal Due Diligence Cell',
        publicationDate: new Date('2026-03-02'),
        isPublished: true,
        officialSourceLinks: [
          { sourceName: 'AP IGRS Registration Portal', url: 'https://registration.ap.gov.in' },
          { sourceName: 'AP Meebhoomi Revenue Portal', url: 'https://meebhoomi.ap.gov.in' }
        ],
        seoTitle: 'Andhra Pradesh Land Verification Checklist | Triport Properties Guide',
        metaDescription: 'Step-by-step document checklist for verifying land, plots, and agricultural property records in Andhra Pradesh.'
      },
      {
        title: 'NRI Property Buying in India: Understanding FEMA Regulations on Agricultural Land',
        slug: 'nri-property-buying-fema-regulations-agricultural-land',
        category: 'Land-use and Approval Basics',
        featuredImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Crucial legal clarity for NRIs and OCIs: What residential and commercial properties you can buy, and how agricultural land restrictions apply under RBI guidelines.',
        content: `### Clear Legal Facts for Overseas Indians

Many Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) desire to invest in their home soil. However, Indian foreign exchange laws have explicit classifications that every buyer must respect:

#### 1. What NRIs/OCIs CAN Freely Buy:
Under general RBI permissions, an NRI or OCI can purchase any number of **residential** and **commercial** properties in India. There is no restriction on number of units or plot layouts that hold valid residential or commercial layout sanctions.

#### 2. What NRIs/OCIs CANNOT Buy Directly:
Under FEMA (Foreign Exchange Management Act) regulations, NRIs and OCIs are **not permitted to purchase agricultural land, plantation property, or farmhouses** directly, unless special approval is granted by the Reserve Bank of India, which is exceptionally rare.

#### 3. Inheritance vs Purchase:
An NRI is permitted to inherit agricultural land from an Indian resident parent or ancestor; however, purchasing fresh agricultural parcels is restricted.

At Triport Properties, we ensure all NRI clients are steered strictly into legally authorized DTCP/TUDA approved residential and commercial layout plots, ensuring peaceful title and repatriation compliance.`,
        author: 'NRI Advisory Desk',
        publicationDate: new Date('2026-03-20'),
        isPublished: true,
        officialSourceLinks: [
          { sourceName: 'Reserve Bank of India (RBI) FAQ on Real Estate Acquisition', url: 'https://rbi.org.in' },
          { sourceName: 'Foreign Exchange Management Act (FEMA) Guidelines', url: 'https://dea.gov.in' }
        ],
        seoTitle: 'NRI Property Buying Rules & FEMA Regulations | Triport Advisory',
        metaDescription: 'Essential guide for NRIs and OCIs investing in land and property in India, detailing FEMA rules and residential plot options.'
      }
    ]);
    console.log('Blogs seeded.');

    console.log('--- SEEDING COMPLETED SUCCESSFULLY ---');
  } catch (err) {
    console.error('Seeding error:', err);
  }
};

module.exports = seedData;

if (require.main === module) {
  const run = async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/triport_properties';
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
      console.log('Connected to MongoDB for seeding');
      await seedData();
      process.exit(0);
    } catch (e) {
      console.log('Local MongoDB not accessible directly, starting in-memory MongoDB for seed verification...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      await mongoose.connect(mongod.getUri());
      await seedData();
      process.exit(0);
    }
  };
  run();
}
