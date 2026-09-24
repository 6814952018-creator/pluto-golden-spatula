import { analyzeTeam, recommendTeam } from '../services/teamService.js';

export function analyze(request, response) { response.json(analyzeTeam(request.body)); }
export function recommend(request, response) { response.json(recommendTeam(request.body)); }
