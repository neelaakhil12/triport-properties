const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['General', 'Service', 'Project', 'Listing', 'NRI', 'Corporate'],
    default: 'General'
  },
  interestedIn: {
    type: String,
    default: 'Residential Plots'
  },
  budgetRange: {
    type: String,
    default: 'Not Specified'
  },
  preferredLocation: {
    type: String,
    default: ''
  },
  // NRI Specific fields
  countryOfResidence: {
    type: String,
    default: ''
  },
  whatsAppNumber: {
    type: String,
    default: ''
  },
  // Corporate Specific fields
  companyName: {
    type: String,
    default: ''
  },
  contactPerson: {
    type: String,
    default: ''
  },
  industry: {
    type: String,
    default: ''
  },
  requiredLandArea: {
    type: String,
    default: ''
  },
  projectRequirements: {
    type: String,
    default: ''
  },
  // Common details
  targetProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    default: null
  },
  targetListingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    default: null
  },
  targetItemTitle: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Interested', 'Converted', 'Closed'],
    default: 'New'
  },
  internalNotes: [
    {
      note: String,
      addedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
