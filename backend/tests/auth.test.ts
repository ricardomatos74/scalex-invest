import request from 'supertest';
import app from '../src/index';

describe('Auth Routes', () => {
  const email = 'test@example.com';
  const password = 'password123';

  it('should register a user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email, password })
      .expect(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should login successfully with correct credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email, password })
      .expect(200);

    expect(res.body).toHaveProperty('token');
  });

  it('should handle forgot password', async () => {
    const res = await request(app)
      .post('/auth/forgot-password')
      .send({ email })
      .expect(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should fail login with wrong credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpass' })
      .expect(401);

    expect(res.body).toHaveProperty('error');
  });
});
