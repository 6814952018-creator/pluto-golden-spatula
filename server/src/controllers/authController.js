import { login, register } from '../services/authService.js';

export async function registerUser(request, response, next) { try { response.status(201).json(await register(request.body)); } catch (error) { next(error); } }
export async function loginUser(request, response, next) { try { response.json(await login(request.body)); } catch (error) { next(error); } }
export function logoutUser(_request, response) { response.json({ ok: true, message: 'logged out' }); }
export function currentUser(request, response) { response.json({ user: request.user }); }
