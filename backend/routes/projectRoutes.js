const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// @route   GET /api/projects
// @desc    Get all projects (with filtering)
router.get('/', async (req, res) => {
  try {
    const { category, corridorZone, featured, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.propertyCategory = category;
    }
    if (corridorZone && corridorZone !== 'All') {
      query.corridorZone = corridorZone;
    }
    if (featured === 'true') {
      query.isFeaturedOnHome = true;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } }
      ];
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving projects', error: err.message });
  }
});

// @route   GET /api/projects/:idOrSlug
// @desc    Get single project by ID or Slug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let project = null;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(idOrSlug);
    }
    if (!project) {
      project = await Project.findOne({ slug: idOrSlug });
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving project', error: err.message });
  }
});

// @route   POST /api/projects (Admin)
router.post('/', auth, async (req, res) => {
  try {
    const data = req.body;
    if (!data.slug && data.name) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const project = new Project(data);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error creating project', error: err.message });
  }
});

// @route   PUT /api/projects/:id (Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error updating project', error: err.message });
  }
});

// @route   DELETE /api/projects/:id (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting project', error: err.message });
  }
});

module.exports = router;
