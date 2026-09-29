import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  fleetSize: { type: String, default: '1 to 5 vehicles' },
  state: { type: String, default: 'Bihar' },
  message: { type: String },
  status: { type: String, enum: ['New', 'Contacted', 'Converted', 'Closed'], default: 'New' },
  source: { type: String, default: 'Website Form' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);
