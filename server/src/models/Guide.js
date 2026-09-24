import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({ id: { type: String, unique: true }, order: Number, title: String, category: String, content: String }, { timestamps: true });
export default mongoose.models.Guide || mongoose.model('Guide', guideSchema);
