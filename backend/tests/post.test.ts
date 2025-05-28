import request from 'supertest';
import app from '../src/index';

describe('Post Routes', () => {
  it('should create a post successfully', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        companyId: 1,
        title: 'First Post',
        description: 'desc',
        totalAmount: 1000,
        percentageOffered: 10,
        maxInvestors: 1,
        deadline: new Date().toISOString(),
      })
      .expect(201);
    expect(res.body).toHaveProperty('id');
  });
});
