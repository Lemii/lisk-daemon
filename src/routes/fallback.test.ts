import app from '../app';
import supertest from 'supertest';

const request = supertest(app);

describe('/ endpoint', () => {
  it('should get the root endpoint', async done => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Lisk Manager Daemon status OK');
    done();
  });

  it('should return a 404 on a POST request', async done => {
    const response = await request.post('/');
    expect(response.status).toBe(404);
    done();
  });

  it('should return a 404 on a PUT request', async done => {
    const response = await request.put('/');
    expect(response.status).toBe(404);
    done();
  });

  it('should return a 404 on a PATCH request', async done => {
    const response = await request.patch('/');
    expect(response.status).toBe(404);
    done();
  });
});
