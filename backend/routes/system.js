const express = require('express');
const router = express.Router();
console.log('>>> SYSTEM ROUTES LOADING...');
const systemController = require('../controllers/systemController');
const { getLiveDailyNews } = require('../services/newsService');

router.get('/visitor-count', systemController.getVisitorCount);

// Live Daily News endpoint
router.get('/news/daily', async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === 'true';
    const news = await getLiveDailyNews(forceRefresh);
    res.json({ success: true, count: news.length, news });
  } catch (err) {
    console.error('[NEWS API ERROR]', err);
    res.status(500).json({ success: false, message: 'Failed to fetch live news' });
  }
});
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

module.exports = router;
