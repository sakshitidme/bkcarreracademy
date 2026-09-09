const mongoose = require('mongoose');

const CounselingLeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  whatsapp: { type: String, required: true },
  institution: { type: String },
  currentClass: { type: String },
  stream: { type: String },
  primaryInterest: { type: String },
  guidanceType: { type: String },
  mode: { type: String },
  preferredDate: { type: String },
  preferredTime: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CounselingLead', CounselingLeadSchema, 'counseling_leads');
