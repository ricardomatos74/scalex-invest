import request from 'supertest';
import app from '../src/index';

let tokenEmpresa: string;
let postId: number;

describe('Post Boosting', () => {
  beforeAll(async () => {
    await request(app)
      .post('/auth/register')
      .send({ email: 'empresa@example.com', password: '123', role: 'EMPRESA' })
      .expect(201);

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'empresa@example.com', password: '123' })
      .expect(200);
    tokenEmpresa = res.body.token;
  });

  it('should allow company to boost its post', async () => {
    const postRes = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .send({
        title: 'Captação A',
        description: 'Descricao',
        valor: 1000,
        percentual: 10,
        offerType: 'UNICO',
      })
      .expect(201);
    postId = postRes.body.id;

    const boost = await request(app)
      .post(`/posts/${postId}/boost`)
      .set('Authorization', `Bearer ${tokenEmpresa}`)
      .expect(201);
    expect(boost.body).toHaveProperty('id');
  });

  it('should list boosted posts first', async () => {
    const res = await request(app).get('/posts').expect(200);
    expect(res.body[0].id).toBe(postId);
  });
});
