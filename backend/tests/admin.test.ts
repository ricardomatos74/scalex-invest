import request from 'supertest';
import app from '../src/index';
import { generateToken } from '../src/middleware/auth';

describe('Admin Routes', () => {
  it('should return 401 when no token is provided', async () => {
    await request(app).get('/admin/users').expect(401);
  });

  it('should allow access with valid token', async () => {
    const token = generateToken();

    const res = await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});
