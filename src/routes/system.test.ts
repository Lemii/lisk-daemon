import app from '../app';
import supertest from 'supertest';

const request = supertest(app);

describe('/system endpoint', () => {
  it('should get the system endpoint', async done => {
    const response = await request.get('/system');
    expect(response.status).toBe(200);
    expect(Object.keys(response.body.data).sort()).toEqual([
      'cpus',
      'disk',
      'hostname',
      'loadAverage',
      'memory',
      'release',
      'type',
      'uptime'
    ]);
    done();
  });

  it('should return a 404 on a POST request', async done => {
    const response = await request.post('/system');
    expect(response.status).toBe(404);
    done();
  });

  it('should return a 404 on a PUT request', async done => {
    const response = await request.put('/system');
    expect(response.status).toBe(404);
    done();
  });

  it('should return a 404 on a PATCH request', async done => {
    const response = await request.patch('/system');
    expect(response.status).toBe(404);
    done();
  });
});
