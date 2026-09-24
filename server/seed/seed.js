import '../src/config/env.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { champions, traits, items, teamComps, guides } from '../src/data/seedData.js';

const schemas = {
  User: new mongoose.Schema({ username: String, email: { type: String, unique: true }, password: String, role: String }),
  Champion: new mongoose.Schema({ id: String, name: String, cost: Number, traits: [String], ability: String, role: String, recommendedItems: [String] }),
  Trait: new mongoose.Schema({ id: String, name: String, description: String, thresholds: Array, champions: [String] }),
  Item: new mongoose.Schema({ id: String, name: String, stats: String, recipe: [String], champions: [String], tip: String }),
  TeamComp: new mongoose.Schema({ id: String, name: String, difficulty: String, champions: [String], traits: [String], score: Number, description: String }),
  Guide: new mongoose.Schema({ id: String, order: Number, title: String, category: String, content: String })
};
const sources = { User: [{ username: 'Admin', email: 'admin@tft.local', password: bcrypt.hashSync('Admin123!', 10), role: 'admin' }], Champion: champions, Trait: traits, Item: items, TeamComp: teamComps, Guide: guides };
if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required for seeding');
await mongoose.connect(process.env.MONGODB_URI);
for (const [name, data] of Object.entries(sources)) { const Model = mongoose.models[name] || mongoose.model(name, schemas[name]); await Model.deleteMany({}); await Model.insertMany(data); console.log(`Seeded ${name}: ${data.length}`); }
await mongoose.disconnect();
