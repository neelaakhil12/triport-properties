const express = require('express');
const router = express.Router();
const LocationItem = require('../models/LocationItem');
const auth = require('../middleware/auth');

// @route   GET /api/locations
router.get('/', async (req, res) => {
  try {
    const locations = await LocationItem.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: locations.length, data: locations });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving locations', error: err.message });
  }
});

// @route   POST /api/locations (Admin)
router.post('/', auth, async (req, res) => {
  try {
    const location = new LocationItem(req.body);
    await location.save();
    res.status(201).json({ success: true, data: location });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error creating location', error: err.message });
  }
});

// @route   PUT /api/locations/:id (Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const location = await LocationItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    res.json({ success: true, data: location });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error updating location', error: err.message });
  }
});

// @route   DELETE /api/locations/:id (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const location = await LocationItem.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    res.json({ success: true, message: 'Location deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting location', error: err.message });
  }
});

module.exports = router;
