import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Schema
const ContactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// Base route for sanity checks
app.get('/', (req, res) => {
  res.send('Rohan Portfolio Backend Service is Online');
});

// API Route to submit form
app.post('/api/contact', async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    if (!email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const newContact = new Contact({ email, subject, message });
    await newContact.save();
    
    console.log(`[Database] Saved contact entry from: ${email}`);
    res.status(201).json({ message: 'Submission saved successfully!' });
  } catch (error) {
    console.error('[Database Error] Error saving contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://rohandusane100:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas (Cluster0)');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Ensure you set the correct MONGO_URI inside the .env file.');
  });
