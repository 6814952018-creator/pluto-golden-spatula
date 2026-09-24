import mongoose from 'mongoose';

const traitSchema = new mongoose.Schema({ id: { type: String, unique: true }, name: String, description: String, thresholds: Array, champions: [String] }, { timestamps: true });
export default mongoose.models.Trait || mongoose.model('Trait', traitSchema);
