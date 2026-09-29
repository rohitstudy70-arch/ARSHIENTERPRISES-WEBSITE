import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  zone: { type: String, required: true },
  portal: { type: String, required: true },
  vehicles: [{ type: String }],
  status: { type: String, default: 'Approved & Live' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.State || mongoose.model('State', stateSchema);
