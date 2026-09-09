const express = require('express');
const router = express.Router();
const CounselingLead = require('../models/CounselingLead');
const Enquiry = require('../models/Enquiry');

router.post('/submit', async (req, res, next) => {
  try {
    const {
      name, email, whatsapp, institution, currentClass, 
      stream, primaryInterest, guidanceType, mode, 
      preferredDate, preferredTime
    } = req.body;

    if (!name || !whatsapp || !primaryInterest) {
      return res.status(400).json({ success: false, message: 'Critical fields missing' });
    }

    // Save to dedicated counseling collection
    await CounselingLead.create({
      name, email, whatsapp, institution, currentClass, 
      stream, primaryInterest, guidanceType, mode, 
      preferredDate, preferredTime
    });

    // Also mirror to general enquiries for visibility
    await Enquiry.create({
      name: name.trim(),
      phone: whatsapp.trim(),
      email: email?.trim().toLowerCase() || 'no-email@bk.in',
      category: 'FREE COUNSELING',
      subCategory: `${primaryInterest} - ${currentClass}`,
      address: `School: ${institution} | Need: ${guidanceType} | Session: ${mode}`
    });

    res.status(201).json({
      success: true,
      message: 'Counseling session requested successfully'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
