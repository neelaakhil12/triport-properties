const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  designationOrLocation: {
    type: String, // e.g. "NRI Investor, USA" or "Hyderabad / Tirupati"
    required: true
  },
  propertyPurchased: {
    type: String,
    default: 'Residential Plot / Investment Land'
  },
  quote: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
