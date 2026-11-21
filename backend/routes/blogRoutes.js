const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

// @route   GET /api/blogs (Public)
router.get('/', async (req, res) => {
  try {
    const { category, search, all } = req.query;
    let query = {};

    // If not admin request (all !== 'true'), show only published
    if (all !== 'true') {
      query.isPublished = true;
    }

    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await Blog.find(query).sort({ publicationDate: -1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving blogs', error: err.message });
  }
});

// @route   GET /api/blogs/:idOrSlug (Public)
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let blog = null;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(idOrSlug);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: idOrSlug });
    }

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving article', error: err.message });
  }
});

// @route   POST /api/blogs (Admin)
router.post('/', auth, async (req, res) => {
  try {
    const data = req.body;
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const blog = new Blog(data);
    await blog.save();
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error creating article', error: err.message });
  }
});

// @route   PUT /api/blogs/:id (Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error updating article', error: err.message });
  }
});

// @route   DELETE /api/blogs/:id (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting article', error: err.message });
  }
});

module.exports = router;
