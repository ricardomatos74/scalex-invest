import request from 'supertest';
import app from '../src/index';

describe('User Routes', () => {
  it('should register a user successfully', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'user1@example.com', password: 'password123' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
  });

  it('should return error for invalid registration data', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: '', password: '' })
      .expect((r) => {
        expect(r.status).toBeGreaterThanOrEqual(400);
      });

    expect(res.body).toHaveProperty('error');
  });
});
