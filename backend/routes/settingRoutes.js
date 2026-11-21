const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const auth = require('../middleware/auth');

// @route   GET /api/settings/:key
// @desc    Get settings by key (e.g. 'general', 'home', 'about', 'nri', 'corporate')
router.get('/:key', async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    if (!setting) {
      return res.json({ success: true, key: req.params.key, data: null });
    }
    res.json({ success: true, key: setting.key, data: setting.data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving settings', error: err.message });
  }
});

// @route   PUT /api/settings/:key (Admin)
// @desc    Save/Update settings by key
router.put('/:key', auth, async (req, res) => {
  try {
    const { data } = req.body;
    let setting = await Setting.findOne({ key: req.params.key });
    if (setting) {
      setting.data = data;
      setting.updatedAt = new Date();
      await setting.save();
    } else {
      setting = new Setting({
        key: req.params.key,
        data: data
      });
      await setting.save();
    }
    res.json({ success: true, key: setting.key, data: setting.data, message: 'Settings saved successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Error saving settings', error: err.message });
  }
});

module.exports = router;
