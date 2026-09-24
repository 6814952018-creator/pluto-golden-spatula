import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({ id: { type: String, unique: true }, name: String, stats: String, recipe: [String], champions: [String], tip: String }, { timestamps: true });
export default mongoose.models.Item || mongoose.model('Item', itemSchema);
