const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('GET /quests/random', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return quest with valid geodata', async () => {
    const res = await request(app).get('/api/quests/random');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('location.map');
    expect(typeof res.body.location.map.longitude).toBe('number');
  });
});
