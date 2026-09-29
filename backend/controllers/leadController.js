import Lead from '../models/Lead.js';

// Temporary in-memory store if MongoDB is not running locally
const memoryLeads = [];

export const createLead = async (req, res) => {
  try {
    const { name, phone, fleetSize, state, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and Phone are required.' });
    }

    try {
      const lead = await Lead.create({ name, phone, fleetSize, state, message });
      return res.status(201).json({ success: true, data: lead });
    } catch (dbErr) {
      const newLead = { id: Date.now().toString(), name, phone, fleetSize, state, message, createdAt: new Date() };
      memoryLeads.push(newLead);
      return res.status(201).json({ success: true, data: newLead, note: 'Saved in memory' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getLeads = async (req, res) => {
  try {
    try {
      const leads = await Lead.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: leads.length, data: leads });
    } catch (dbErr) {
      return res.json({ success: true, count: memoryLeads.length, data: memoryLeads });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
