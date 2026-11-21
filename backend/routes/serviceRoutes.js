const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// @route   GET /api/services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving services', error: err.message });
  }
});

// @route   GET /api/services/:idOrSlug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let service = null;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      service = await Service.findById(idOrSlug);
    }
    if (!service) {
      service = await Service.findOne({ slug: idOrSlug });
    }
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving service', error: err.message });
  }
});

// @route   POST /api/services (Admin)
router.post('/', auth, async (req, res) => {
  try {
    const data = req.body;
    if (!data.slug && data.name) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const service = new Service(data);
    await service.save();
    res.status(201).json({ success: true, data: service });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error creating service', error: err.message });
  }
});

// @route   PUT /api/services/:id (Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error updating service', error: err.message });
  }
});

// @route   DELETE /api/services/:id (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting service', error: err.message });
  }
});

module.exports = router;
