import app from '../app';
import supertest from 'supertest';

const request = supertest(app);

describe('/settings endpoint', () => {
  it('should get the settings endpoint', async done => {
    const response = await request.get('/settings');
    expect(response.status).toBe(200);
    expect(Object.keys(response.body.data).sort()).toEqual(['key', 'nodeCommands', 'systemInfo']);
    done();
  });

  it('should return a 404 on a POST request', async done => {
    const response = await request.post('/settings');
    expect(response.status).toBe(404);
    done();
  });

  it('should return a 404 on a PUT request', async done => {
    const response = await request.put('/settings');
    expect(response.status).toBe(404);
    done();
  });

  it('should return a 404 on a PATCH request', async done => {
    const response = await request.patch('/settings');
    expect(response.status).toBe(404);
    done();
  });
});
