const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Listing = require('../models/Listing');
const Enquiry = require('../models/Enquiry');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

// @route   GET /api/stats (Admin)
// @desc    Get dashboard metrics
router.get('/', auth, async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalListings = await Listing.countDocuments();
    const availableProperties = await Listing.countDocuments({ status: 'Available' });
    const soldProperties = await Listing.countDocuments({ status: 'Sold' });
    const reservedProperties = await Listing.countDocuments({ status: 'Reserved' });
    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: 'New' });
    const totalBlogs = await Blog.countDocuments();

    // Category breakdown
    const residentialPlots = await Listing.countDocuments({ landType: 'Residential Plots' });
    const commercialPlots = await Listing.countDocuments({ landType: 'Commercial Plots' });
    const farmLands = await Listing.countDocuments({ landType: 'Farm Lands' });
    const corporateLandBanks = await Listing.countDocuments({ landType: 'Land Bank for Companies' });

    res.json({
      success: true,
      stats: {
        totalProjects,
        totalListings,
        availableProperties,
        soldProperties,
        reservedProperties,
        totalEnquiries,
        newEnquiries,
        totalBlogs,
        breakdown: {
          residentialPlots,
          commercialPlots,
          farmLands,
          corporateLandBanks
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving statistics', error: err.message });
  }
});

module.exports = router;
