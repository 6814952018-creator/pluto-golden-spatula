import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { store, findById } from './data/store.js';
import { analyzeTeam, recommendTeam } from './services/teamService.js';
import teamRoutes from './routes/teamRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import Champion from './models/Champion.js';
import Trait from './models/Trait.js';
import Item from './models/Item.js';
import TeamComp from './models/TeamComp.js';
import Guide from './models/Guide.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

export const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const resource = (collection) => (request, response) => {
  const { q } = request.query;
  const data = q ? store[collection].filter((entry) => JSON.stringify(entry).toLowerCase().includes(q.toLowerCase())) : store[collection];
  response.json(data);
};
const detail = (collection) => (request, response) => {
  const entry = findById(collection, request.params.id);
  if (!entry) return response.status(404).json({ message: `${collection} entry not found` });
  response.json(entry);
};

const databaseModels = { champions: Champion, traits: Trait, items: Item, teamComps: TeamComp, guides: Guide };
const resourceFromDatabase = (collection) => async (request, response, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const query = request.query.q ? { $or: [{ name: new RegExp(request.query.q, 'i') }, { title: new RegExp(request.query.q, 'i') }] } : {};
      return response.json(await databaseModels[collection].find(query).sort({ order: 1, name: 1 }).lean());
    }
    return resource(collection)(request, response);
  } catch (error) {
    return next(error);
  }
};
const detailFromDatabase = (collection) => async (request, response, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const entry = await databaseModels[collection].findOne({ id: request.params.id }).lean();
      if (!entry) return response.status(404).json({ message: `${collection} entry not found` });
      return response.json(entry);
    }
    return detail(collection)(request, response);
  } catch (error) {
    return next(error);
  }
};

app.get('/api/health', (_request, response) => response.json({ ok: true, database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.get('/api/champions', resourceFromDatabase('champions'));
app.get('/api/champions/:id', detailFromDatabase('champions'));
app.get('/api/traits', resourceFromDatabase('traits'));
app.get('/api/traits/:id', detailFromDatabase('traits'));
app.get('/api/items', resourceFromDatabase('items'));
app.get('/api/items/:id', detailFromDatabase('items'));
app.get('/api/team-comps', resourceFromDatabase('teamComps'));
app.get('/api/team-comps/:id', detailFromDatabase('teamComps'));
app.get('/api/guides', resourceFromDatabase('guides'));
app.get('/api/guides/:id', detailFromDatabase('guides'));
app.post('/api/team/analyze', (request, response) => {
  if (!Array.isArray(request.body.championIds)) return response.status(400).json({ message: 'championIds must be an array' });
  response.json(analyzeTeam(request.body));
});
app.post('/api/team/recommend', (request, response) => {
  if (!Array.isArray(request.body.championIds)) return response.status(400).json({ message: 'championIds must be an array' });
  response.json(recommendTeam(request.body));
});
app.use('/api/team', teamRoutes);
app.use('/api', adminRoutes);
app.use(errorHandler);

export default app;
