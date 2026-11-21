const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const auth = require('../middleware/auth');

// @route   GET /api/listings
// @desc    Get all listings with filters (status, landType, location, price, size)
router.get('/', async (req, res) => {
  try {
    const { status, landType, location, projectId, search } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }
    if (landType && landType !== 'All') {
      query.landType = landType;
    }
    if (location && location !== 'All') {
      query.location = { $regex: location, $options: 'i' };
    }
    if (projectId) {
      query.projectId = projectId;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { plotNumberOrRef: { $regex: search, $options: 'i' } }
      ];
    }

    const listings = await Listing.find(query).populate('projectId', 'name slug').sort({ createdAt: -1 });
    res.json({ success: true, count: listings.length, data: listings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving listings', error: err.message });
  }
});

// @route   GET /api/listings/:id
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('projectId');
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    res.json({ success: true, data: listing });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving listing', error: err.message });
  }
});

// @route   POST /api/listings (Admin)
router.post('/', auth, async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json({ success: true, data: listing });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error creating listing', error: err.message });
  }
});

// @route   PUT /api/listings/:id (Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    res.json({ success: true, data: listing });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error updating listing', error: err.message });
  }
});

// @route   DELETE /api/listings/:id (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    res.json({ success: true, message: 'Listing deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting listing', error: err.message });
  }
});

module.exports = router;
