import request from 'supertest';
import app from '../src/app.js';

describe('TFT API', () => {
  test('GET champions', async () => { const response = await request(app).get('/api/champions'); expect(response.status).toBe(200); expect(response.body.length).toBeGreaterThan(0); });
  test('GET champion by ID', async () => { const response = await request(app).get('/api/champions/ahri'); expect(response.status).toBe(200); expect(response.body.name).toBe('Ahri'); });
    let userToken;
    let adminToken;

    test('register succeeds', async () => {
      const response = await request(app).post('/api/auth/register').send({ username: 'Test Player', email: 'player@test.local', password: 'Player123!' });
      expect(response.status).toBe(201);
      expect(response.body.token).toEqual(expect.any(String));
      userToken = response.body.token;
    });
    test('duplicate email is rejected', async () => {
      const response = await request(app).post('/api/auth/register').send({ username: 'Other Player', email: 'player@test.local', password: 'Player123!' });
      expect(response.status).toBe(409);
    });
    test('login succeeds and wrong password fails', async () => {
      const success = await request(app).post('/api/auth/login').send({ username: 'Test Player', password: 'Player123!' });
      expect(success.status).toBe(200);
      expect(success.body.user.role).toBe('user');
      const failure = await request(app).post('/api/auth/login').send({ username: 'Test Player', password: 'wrong-password' });
      expect(failure.status).toBe(401);
    });
    test('authentication returns current user', async () => {
      const response = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${userToken}`);
      expect(response.status).toBe(200);
      expect(response.body.user.email).toBe('player@test.local');
    });
    test('regular user cannot access admin CRUD', async () => {
      const response = await request(app).post('/api/champions').set('Authorization', `Bearer ${userToken}`).send({ name: 'Blocked' });
      expect(response.status).toBe(403);
    });
    test('admin can create, update and delete champion', async () => {
      const login = await request(app).post('/api/auth/login').send({ username: 'admin', password: 'Admin123!' });
      adminToken = login.body.token;
      const created = await request(app).post('/api/champions').set('Authorization', `Bearer ${adminToken}`).send({ name: 'Test Champion', cost: 1 });
      expect(created.status).toBe(201);
      const updated = await request(app).put(`/api/champions/${created.body.id}`).set('Authorization', `Bearer ${adminToken}`).send({ role: 'Test Role' });
      expect(updated.status).toBe(200);
      const deleted = await request(app).delete(`/api/champions/${created.body.id}`).set('Authorization', `Bearer ${adminToken}`);
      expect(deleted.status).toBe(200);
    });
  test('GET traits and items', async () => { expect((await request(app).get('/api/traits')).status).toBe(200); expect((await request(app).get('/api/items')).status).toBe(200); });
  test('missing champion returns 404', async () => { expect((await request(app).get('/api/champions/missing')).status).toBe(404); });
  test('team analyzer validates input', async () => { expect((await request(app).post('/api/team/analyze').send({})).status).toBe(400); });
  test('team analyzer returns score', async () => { const response = await request(app).post('/api/team/analyze').send({ championIds: ['garen', 'leona', 'ahri'] }); expect(response.status).toBe(200); expect(response.body.score).toEqual(expect.any(Number)); });
  test('team recommendation returns suggestions', async () => { const response = await request(app).post('/api/team/recommend').send({ championIds: ['garen'] }); expect(response.status).toBe(200); expect(response.body.recommendedChampions.length).toBeGreaterThan(0); });
});
