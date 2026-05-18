const express = require('express');
const router = express.Router();
console.log('>>> SYSTEM ROUTES LOADING...');
const systemController = require('../controllers/systemController');

router.get('/visitor-count', systemController.getVisitorCount);
router.post('/track/download', systemController.trackDownload);
router.post('/tickets', systemController.raiseTicket);
router.post('/chat', systemController.chat);
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

router.get('/settings', async (req, res, next) => {
  const SystemSetting = require('../models/SystemSetting');
  try {
    const settings = await SystemSetting.find();
    const map = {};
    settings.forEach(s => { map[s.key] = s.value; });
    res.json({ success: true, settings: map });
  } catch (err) { next(err); }
});

router.post('/settings', async (req, res, next) => {
  const SystemSetting = require('../models/SystemSetting');
  try {
    const { key, value } = req.body;
    if (!key) return res.status(400).json({ success: false, message: 'Key required' });
    await SystemSetting.findOneAndUpdate(
      { key },
      { value, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: 'Setting updated successfully' });
  } catch (err) { next(err); }
});

module.exports = router;
