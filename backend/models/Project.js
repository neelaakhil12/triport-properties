const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  tagline: {
    type: String,
    default: 'Premium Land Opportunity'
  },
  location: {
    type: String,
    required: true
  },
  corridorZone: {
    type: String,
    enum: ['Tirupati', 'Naidupeta', 'Sullurpeta', 'Tada', 'Renigunta Airport Road', 'Sri City Belt', 'Krishnapatnam Port Road'],
    default: 'Tirupati'
  },
  propertyCategory: {
    type: String,
    required: true,
    enum: [
      'Residential Plots',
      'Commercial Plots',
      'Open Plots',
      'Open Land for Investment',
      'Farm Lands',
      'Corporate Land Banks'
    ]
  },
  availablePlotSizes: {
    type: String, // e.g. "150 - 500 Sq. Yards" or "1 - 10 Acres"
    required: true
  },
  totalLandArea: {
    type: String, // e.g. "25 Acres Layout"
    default: '10 Acres'
  },
  priceRange: {
    type: String, // e.g. "₹12 Lakhs - ₹35 Lakhs" or "₹2,500/sq.yd"
    required: true
  },
  approvalStatus: {
    type: String, // e.g. "TUDA Approved", "DTCP Approved LP No: 42/2023", "Clear Title / Freehold"
    required: true
  },
  roadAccess: {
    type: String, // e.g. "60 ft Main Road Access & 40 ft Internal BT Roads"
    required: true
  },
  nearbyLocations: [
    {
      type: String
    }
  ],
  shortDescription: {
    type: String,
    required: true
  },
  detailedOverview: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    required: true
  },
  galleryImages: [
    {
      type: String
    }
  ],
  isFeaturedOnHome: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Available', 'Few Plots Left', 'Sold Out'],
    default: 'Available'
  },
  amenities: [
    {
      type: String
    }
  ],
  mapEmbedUrl: {
    type: String,
    default: ''
  },
  reraNumber: {
    type: String,
    default: 'In Process / LP Approved'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
