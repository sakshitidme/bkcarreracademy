const mongoose = require('mongoose');

const PopupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mediaUrl: { type: String }, // Image URL or YouTube URL
  mediaType: { type: String, enum: ['image', 'youtube'], default: 'image' },
  notice: { type: String }, // One line notice
  link: { type: String }, // Action link (e.g., Click to register)
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Popup', PopupSchema);
