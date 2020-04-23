import app from '../app';
import supertest from 'supertest';

const request = supertest(app);

(process.platform === 'linux' ? describe : describe.skip)('/node endpoint', () => {
  it('should return a 401 due to no key posted', async done => {
    const response = await request.post('/node');
    expect(response.status).toBe(401);
    done();
  });

  it('should return a 401 due to invalid key posted', async done => {
    const response = await request.post('/node').send({ key: 'somerandomkeythatisnotcorrect' });
    expect(response.status).toBe(401);
    done();
  });

  it('should return a 404 on a GET request', async done => {
    const response = await request.get('/node').send({ key: 'eb8d24e4-8e3a-4c22-89e2-649fa3a222b4' });
    expect(response.status).toBe(404);
    done();
  });
  it('should return a 404 on a POST request', async done => {
    const response = await request.post('/node').send({ key: 'eb8d24e4-8e3a-4c22-89e2-649fa3a222b4' });
    expect(response.status).toBe(404);
    done();
  });

  it('should return a 404 on a PUT request', async done => {
    const response = await request.put('/node').send({ key: 'eb8d24e4-8e3a-4c22-89e2-649fa3a222b4' });
    expect(response.status).toBe(404);
    done();
  });

  it('should return a 404 on a PATCH request', async done => {
    const response = await request.patch('/node').send({ key: 'eb8d24e4-8e3a-4c22-89e2-649fa3a222b4' });
    expect(response.status).toBe(404);
    done();
  });
});

(process.platform !== 'linux' ? describe : describe.skip)('explicit non-linux OS check', () => {
  it('should return a 500 error', async done => {
    const response = await request.post('/node');
    expect(response.status).toBe(500);
    done();
  });

  it('should return a 500 error', async done => {
    const response = await request.post('/node/logs');
    expect(response.status).toBe(500);
    done();
  });

  it('should return a 500 error', async done => {
    const response = await request.post('/node/start');
    expect(response.status).toBe(500);
    done();
  });
});
