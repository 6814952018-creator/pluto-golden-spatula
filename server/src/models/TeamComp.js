import mongoose from 'mongoose';

const teamCompSchema = new mongoose.Schema({ id: { type: String, unique: true }, name: String, difficulty: String, champions: [String], traits: [String], score: Number, description: String }, { timestamps: true });
export default mongoose.models.TeamComp || mongoose.model('TeamComp', teamCompSchema);
