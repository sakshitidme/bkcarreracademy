const Popup = require('../models/Popup');

exports.getAllPopups = async (req, res) => {
  try {
    const popups = await Popup.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: popups.length, data: popups });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getActivePopups = async (req, res) => {
  try {
    const popups = await Popup.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: popups.length, data: popups });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.createPopup = async (req, res) => {
  try {
    if (req.file) {
      req.body.mediaUrl = `/api/uploads/${req.file.filename}`;
    }
    const popup = await Popup.create(req.body);
    res.status(201).json({ success: true, data: popup });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updatePopup = async (req, res) => {
  try {
    if (req.file) {
      req.body.mediaUrl = `/api/uploads/${req.file.filename}`;
    }
    const popup = await Popup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!popup) {
      return res.status(404).json({ success: false, error: 'Popup not found' });
    }
    res.json({ success: true, data: popup });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deletePopup = async (req, res) => {
  try {
    const popup = await Popup.findByIdAndDelete(req.params.id);
    if (!popup) {
      return res.status(404).json({ success: false, error: 'Popup not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
