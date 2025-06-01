import request from 'supertest';
import app from '../src/index';

describe('Project Routes', () => {
  let token: string;

  beforeAll(async () => {
    const email = 'empresa@example.com';
    const password = 'pass123';

    await request(app).post('/users').send({ email, password, role: 'EMPRESA' });
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email, password });
    token = loginRes.body.token;
  });

  it('should create a project successfully', async () => {
    const res = await request(app)
      .post('/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Projeto Teste',
        description: 'desc',
        targetValue: 1000,
        quotaCount: 10,
        category: 'Tech',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
  });

  it('should list projects', async () => {
    const res = await request(app)
      .get('/projects')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});
