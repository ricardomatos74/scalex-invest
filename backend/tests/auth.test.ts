import request from 'supertest';
import app from '../src/index';

describe('Auth Routes', () => {
  const email = 'test@example.com';
  const password = 'password123';

  beforeAll(async () => {
    // Create user for login test
    await request(app).post('/users').send({ email, password });
  });

  it('should login successfully with correct credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email, password })
      .expect(200);

    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with wrong credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpass' })
      .expect(401);

    expect(res.body).toHaveProperty('error');
  });
});
