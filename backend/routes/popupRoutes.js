const express = require('express');
const router = express.Router();
const {
  getAllPopups,
  getActivePopups,
  createPopup,
  updatePopup,
  deletePopup
} = require('../controllers/popupController');
const upload = require('../middleware/upload');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, getAllPopups);
router.get('/active', getActivePopups); // Public route
router.post('/', authenticate, upload.single('image'), createPopup);
router.put('/:id', authenticate, upload.single('image'), updatePopup);
router.delete('/:id', authenticate, deletePopup);

module.exports = router;
