const express = require('express');
const router = express.Router();
const { getNextFormMeta, submitRegistration } = require('../controllers/registrationController');
const validateRegistration = require('../middleware/validateRegistration');

const upload = require('../middleware/upload');

router.get('/next-form-meta', getNextFormMeta);
router.post('/submit', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'signature', maxCount: 1 }]), validateRegistration, submitRegistration);

router.post('/counseling-submit', async (req, res, next) => {
  const CounselingLead = require('../models/CounselingLead');
  const Enquiry = require('../models/Enquiry');
  try {
    const { name, whatsapp, primaryInterest } = req.body;
    if (!name || !whatsapp || !primaryInterest) return res.status(400).json({ success: false, message: 'Critical fields missing' });
    await CounselingLead.create(req.body);
    await Enquiry.create({
      name: name.trim(),
      phone: whatsapp.trim(),
      email: req.body.email || 'no-email@bk.in',
      category: 'FREE COUNSELING',
      subCategory: `${primaryInterest} - ${req.body.currentClass}`,
      address: `Institution: ${req.body.institution} | Mode: ${req.body.mode}`
    });
    res.status(201).json({ success: true, message: 'Counseling session requested successfully' });
  } catch (err) { next(err); }
});

module.exports = router;
