const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  corridorRole: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  distances: [
    {
      destination: String,
      distanceKm: String,
      travelTime: String
    }
  ],
  connectivityHighlights: [
    {
      type: String
    }
  ],
  verifiedStatus: {
    type: String,
    default: 'Verified via NHAI / Official Infrastructure Portals'
  },
  mapCoordinates: {
    lat: Number,
    lng: Number
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

module.exports = mongoose.model('LocationItem', locationSchema);
