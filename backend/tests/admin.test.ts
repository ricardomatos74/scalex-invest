import request from 'supertest';
import app from '../src/index';

let token: string;

beforeAll(async () => {
  await request(app)
    .post('/auth/register')
    .send({ email: 'admin@example.com', password: 'adminpass', role: 'ADMIN' })
    .expect(201);

  const res = await request(app)
    .post('/auth/login')
    .send({ email: 'admin@example.com', password: 'adminpass' })
    .expect(200);

  token = res.body.token;
});

describe('Admin Routes', () => {
  it('should return 401 when no token is provided', async () => {
    await request(app).get('/admin/users').expect(401);
  });

  it('should allow access with valid token', async () => {
    const res = await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});
