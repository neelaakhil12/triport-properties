const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const auth = require('../middleware/auth');

// @route   POST /api/enquiries
// @desc    Submit a new enquiry (Public)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      type,
      interestedIn,
      budgetRange,
      preferredLocation,
      countryOfResidence,
      whatsAppNumber,
      companyName,
      contactPerson,
      industry,
      requiredLandArea,
      projectRequirements,
      targetProjectId,
      targetListingId,
      targetItemTitle,
      message
    } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and message are required fields.'
      });
    }

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      type: type || 'General',
      interestedIn: interestedIn || 'Residential Plots',
      budgetRange: budgetRange || 'Not Specified',
      preferredLocation: preferredLocation || '',
      countryOfResidence: countryOfResidence || '',
      whatsAppNumber: whatsAppNumber || '',
      companyName: companyName || '',
      contactPerson: contactPerson || '',
      industry: industry || '',
      requiredLandArea: requiredLandArea || '',
      projectRequirements: projectRequirements || '',
      targetProjectId: targetProjectId || null,
      targetListingId: targetListingId || null,
      targetItemTitle: targetItemTitle || '',
      message,
      status: 'New'
    });

    await enquiry.save();

    // Log notification simulation (in production triggers SMTP/Nodemailer/SendGrid)
    console.log(`[EMAIL NOTIFICATION] New ${enquiry.type} Enquiry from ${name} (${phone}, ${email}) - Subject: ${enquiry.interestedIn}`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our senior land investment advisor will contact you shortly.',
      data: enquiry
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to submit enquiry', error: err.message });
  }
});

// @route   GET /api/enquiries (Admin)
// @desc    Get all enquiries with filters
router.get('/', auth, async (req, res) => {
  try {
    const { status, type, search } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }
    if (type && type !== 'All') {
      query.type = type;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(query)
      .populate('targetProjectId', 'name slug')
      .populate('targetListingId', 'title plotNumberOrRef')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve enquiries', error: err.message });
  }
});

// @route   GET /api/enquiries/export-csv (Admin)
// @desc    Export enquiries to CSV
router.get('/export-csv', auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    const headers = 'ID,Name,Email,Phone,Type,InterestedIn,Budget,Location,Country,Company,Status,Date,Message\n';
    const rows = enquiries.map(e => {
      const cleanMsg = (e.message || '').replace(/"/g, '""').replace(/\n/g, ' ');
      return `"${e._id}","${e.name}","${e.email}","${e.phone}","${e.type}","${e.interestedIn}","${e.budgetRange}","${e.preferredLocation}","${e.countryOfResidence}","${e.companyName}","${e.status}","${e.createdAt.toISOString()}","${cleanMsg}"`;
    }).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="triport_enquiries.csv"');
    res.send(headers + rows);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error generating CSV', error: err.message });
  }
});

// @route   PUT /api/enquiries/:id/status (Admin)
// @desc    Update enquiry status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['New', 'Contacted', 'Interested', 'Converted', 'Closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, data: enquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating status', error: err.message });
  }
});

// @route   POST /api/enquiries/:id/notes (Admin)
// @desc    Add internal note to enquiry
router.post('/:id/notes', auth, async (req, res) => {
  try {
    const { note } = req.body;
    if (!note) {
      return res.status(400).json({ success: false, message: 'Note text is required' });
    }

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    enquiry.internalNotes.push({ note, addedAt: new Date() });
    await enquiry.save();

    res.json({ success: true, data: enquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding note', error: err.message });
  }
});

// @route   DELETE /api/enquiries/:id (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, message: 'Enquiry removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting enquiry', error: err.message });
  }
});

module.exports = router;
