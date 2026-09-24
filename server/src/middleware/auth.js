import { verifyToken, getMemoryUsers } from '../services/authService.js';
import User from '../models/User.js';

export async function requireAuth(request, response, next) {
  try {
    const header = request.headers.authorization || '';
    if (!header.startsWith('Bearer ')) return response.status(401).json({ message: 'authentication required' });
    const payload = verifyToken(header.slice(7));
    const user = User.db.readyState === 1 ? await User.findById(payload.sub) : getMemoryUsers().find((entry) => entry.id === payload.sub);
    if (!user) return response.status(401).json({ message: 'user not found' });
    request.user = { id: user.id || user._id, username: user.username, email: user.email, role: user.role };
    next();
  } catch (_error) {
    response.status(401).json({ message: 'invalid or expired token' });
  }
}

export function requireAdmin(request, response, next) {
  if (request.user?.role !== 'admin') return response.status(403).json({ message: 'admin role required' });
  next();
}
