import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { store } from '../data/store.js';

const secret = process.env.JWT_SECRET || 'development-only-secret';
const memoryUsers = [{ id: 'admin-seed', username: 'Admin', email: 'admin@tft.local', password: bcrypt.hashSync('Admin123!', 10), role: 'admin' }];

function publicUser(user) {
  return { id: user.id || user._id, username: user.username, email: user.email, role: user.role };
}

function tokenFor(user) {
  return jwt.sign({ sub: user.id || user._id, email: user.email, role: user.role }, secret, { expiresIn: '2h' });
}

export async function register({ username, email, password }) {
  if (!username || !email || !password) throw Object.assign(new Error('username, email and password are required'), { status: 400 });
  if (password.length < 6) throw Object.assign(new Error('password must be at least 6 characters'), { status: 400 });
  const normalizedEmail = email.toLowerCase();
  const normalizedUsername = username.trim();
  const existingUsername = await findUserByUsername(normalizedUsername);
  if (existingUsername) throw Object.assign(new Error('username already registered'), { status: 409 });
  const existing = await findUser(normalizedEmail);
  if (existing) throw Object.assign(new Error('email already registered'), { status: 409 });
  const hash = await bcrypt.hash(password, 10);
  if (User.db.readyState === 1) {
    const user = await User.create({ username: normalizedUsername, email: normalizedEmail, password: hash });
    return { user: publicUser(user), token: tokenFor(user) };
  }
  const user = { id: `memory-${memoryUsers.length + 1}`, username: normalizedUsername, email: normalizedEmail, password: hash, role: 'user' };
  memoryUsers.push(user);
  return { user: publicUser(user), token: tokenFor(user) };
}

export async function login({ username, password }) {
  if (!username || !password) throw Object.assign(new Error('username and password are required'), { status: 400 });
  const normalizedUsername = username.trim();
  const user = User.db.readyState === 1 ? await User.findOne({ username: new RegExp(`^${normalizedUsername.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }).select('+password') : memoryUsers.find((entry) => entry.username.toLowerCase() === normalizedUsername.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.password))) throw Object.assign(new Error('invalid username or password'), { status: 401 });
  return { user: publicUser(user), token: tokenFor(user) };
}

export async function findUser(email) {
  return User.db.readyState === 1 ? User.findOne({ email }) : memoryUsers.find((user) => user.email === email);
}

export async function findUserByUsername(username) {
  return User.db.readyState === 1 ? User.findOne({ username }) : memoryUsers.find((user) => user.username.toLowerCase() === username.toLowerCase());
}

export function verifyToken(token) {
  return jwt.verify(token, secret);
}

export function getMemoryUsers() { return memoryUsers; }
