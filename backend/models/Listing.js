const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    default: null
  },
  plotNumberOrRef: {
    type: String,
    default: 'Plot #1'
  },
  location: {
    type: String,
    required: true
  },
  plotOrLandSize: {
    type: String, // e.g. "200 Sq. Yards" or "2.5 Acres"
    required: true
  },
  landType: {
    type: String,
    required: true,
    enum: [
      'Residential Plots',
      'Commercial Plots',
      'Open Plots',
      'Open Land for Investment',
      'Farm Lands',
      'Land Bank for Companies'
    ]
  },
  approvalStatus: {
    type: String, // e.g. "DTCP Approved", "TUDA Approved", "Pattadar Passbook Clear"
    required: true
  },
  roadAccess: {
    type: String, // e.g. "40 ft Blacktop Road"
    required: true
  },
  distanceToKeyPoints: {
    type: String, // e.g. "3.5 km to NH-71, 12 km to Tirupati Airport"
    required: true
  },
  priceRange: {
    type: String, // e.g. "₹22,00,000"
    required: true
  },
  verifiedDocuments: [
    {
      type: String
    }
  ],
  images: [
    {
      type: String
    }
  ],
  status: {
    type: String,
    enum: ['Available', 'Reserved', 'Sold'],
    default: 'Available'
  },
  facing: {
    type: String,
    enum: ['East', 'West', 'North', 'South', 'Corner / Multi-facing'],
    default: 'East'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Listing', listingSchema);
