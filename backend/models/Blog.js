const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
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
  category: {
    type: String,
    required: true,
    enum: [
      'Infrastructure Updates',
      'Buying Checklists',
      'Land-use and Approval Basics',
      'Industrial News',
      'Investment Education'
    ]
  },
  featuredImage: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  content: {
    type: String, // Full markdown or rich text
    required: true
  },
  author: {
    type: String,
    default: 'Triport Investment Research Desk'
  },
  publicationDate: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  officialSourceLinks: [
    {
      sourceName: String,
      url: String
    }
  ],
  seoTitle: {
    type: String,
    default: ''
  },
  metaDescription: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', blogSchema);
