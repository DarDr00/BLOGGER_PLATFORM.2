import app from '../../../src/index';
import request from 'supertest';
import { setupTestDB, teardownTestDB } from '../../../src/testing/test-setup';

beforeAll(async () => {
  await setupTestDB(); 
});

afterAll(async () => {
  await teardownTestDB(); 
});

describe('POST /posts - создание поста', () => {
  it('✅Должен создать пост с валидными данными', async () => {
    await request(app)
      .delete('/testing/all-data')
      .expect(204);

    const blogResponse = await request(app)
      .post('/blogs')
      .auth('admin', 'qwerty')
      .send({
        name: 'Test Blog',
        description: 'Test Description',
        websiteUrl: 'https://test.com'
      })
      .expect(201);

    await request(app)
      .post('/posts')
      .auth('admin', 'qwerty')
      .send({
        title: 'Test Post',
        shortDescription: 'Test Short Description',
        content: 'Test Content',
        blogId: blogResponse.body.id
      })
      .expect(201);
  });
});