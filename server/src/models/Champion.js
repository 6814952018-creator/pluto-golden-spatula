import mongoose from 'mongoose';

const championSchema = new mongoose.Schema({ id: { type: String, unique: true }, name: String, cost: Number, traits: [String], ability: String, role: String, recommendedItems: [String] }, { timestamps: true });
export default mongoose.models.Champion || mongoose.model('Champion', championSchema);
