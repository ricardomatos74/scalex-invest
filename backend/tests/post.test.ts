import request from 'supertest';
import app from '../src/index';

describe('Post Routes', () => {
  it('should create a post successfully', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ authorId: 1, title: 'First Post', content: 'Hello' })
      .expect(201);
    expect(res.body).toHaveProperty('id');
  });
});
