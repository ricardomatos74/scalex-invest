import request from 'supertest';
import app from '../src/index';

describe('Subscription Routes', () => {
  it('should create a subscription successfully', async () => {
    const res = await request(app)
      .post('/subscriptions')
      .send({ userId: 1 })
      .expect(201);
    expect(res.body).toHaveProperty('id');
  });
});
