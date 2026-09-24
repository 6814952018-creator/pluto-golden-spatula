import { Router } from 'express';
import mongoose from 'mongoose';
import { store } from '../data/store.js';
import Champion from '../models/Champion.js';
import Trait from '../models/Trait.js';
import Item from '../models/Item.js';
import Guide from '../models/Guide.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';
import User from '../models/User.js';
import { getMemoryUsers } from '../services/authService.js';

const router = Router();
const resources = { champions: Champion, traits: Trait, items: Item, guides: Guide };

function slug(value) { return String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `entry-${Date.now()}`; }
function memoryCollection(name) { return store[name]; }
function requireDatabase(response) {
  if (mongoose.connection.readyState !== 1 && process.env.NODE_ENV !== 'test') {
    response.status(503).json({ message: 'MongoDB is not connected; admin changes were not saved' });
    return false;
  }
  return true;
}

router.use(requireAuth, requireAdmin);
router.get('/users', async (_request, response, next) => {
  try {
    const users = mongoose.connection.readyState === 1 ? await User.find().select('-password').lean() : getMemoryUsers().map(({ password: _password, ...user }) => user);
    response.json(users);
  } catch (error) { next(error); }
});

router.post('/:resource', async (request, response, next) => {
  try {
    if (!requireDatabase(response)) return;
    const { resource } = request.params;
    const Model = resources[resource];
    if (!Model) return response.status(404).json({ message: 'resource not found' });
    const payload = { ...request.body, id: request.body.id || slug(request.body.name || request.body.title) };
    if (mongoose.connection.readyState === 1) return response.status(201).json(await Model.create(payload));
    const entry = { ...payload, _id: payload.id };
    memoryCollection(resource).push(entry);
    response.status(201).json(entry);
  } catch (error) { next(error); }
});

router.put('/:resource/:id', async (request, response, next) => {
  try {
    if (!requireDatabase(response)) return;
    const { resource, id } = request.params;
    const Model = resources[resource];
    if (!Model) return response.status(404).json({ message: 'resource not found' });
    if (mongoose.connection.readyState === 1) {
      const entry = await Model.findOneAndUpdate({ id }, request.body, { new: true, runValidators: true });
      if (!entry) return response.status(404).json({ message: 'entry not found' });
      return response.json(entry);
    }
    const entry = memoryCollection(resource).find((item) => item.id === id);
    if (!entry) return response.status(404).json({ message: 'entry not found' });
    Object.assign(entry, request.body);
    response.json(entry);
  } catch (error) { next(error); }
});

router.delete('/:resource/:id', async (request, response, next) => {
  try {
    if (!requireDatabase(response)) return;
    const { resource, id } = request.params;
    const Model = resources[resource];
    if (!Model) return response.status(404).json({ message: 'resource not found' });
    if (mongoose.connection.readyState === 1) {
      const entry = await Model.findOneAndDelete({ id });
      if (!entry) return response.status(404).json({ message: 'entry not found' });
      return response.json({ ok: true });
    }
    const collection = memoryCollection(resource);
    const index = collection.findIndex((item) => item.id === id);
    if (index < 0) return response.status(404).json({ message: 'entry not found' });
    collection.splice(index, 1);
    response.json({ ok: true });
  } catch (error) { next(error); }
});

export default router;
