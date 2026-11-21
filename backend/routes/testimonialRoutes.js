const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// @route   GET /api/testimonials (Public)
router.get('/', async (req, res) => {
  try {
    const { all } = req.query;
    let query = {};
    if (all !== 'true') {
      query.isPublished = true;
    }
    const testimonials = await Testimonial.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving testimonials', error: err.message });
  }
});

// @route   POST /api/testimonials (Admin)
router.post('/', auth, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json({ success: true, data: testimonial });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error creating testimonial', error: err.message });
  }
});

// @route   PUT /api/testimonials/:id (Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, data: testimonial });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error updating testimonial', error: err.message });
  }
});

// @route   DELETE /api/testimonials/:id (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting testimonial', error: err.message });
  }
});

module.exports = router;
