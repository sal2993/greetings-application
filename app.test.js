var request = require('supertest');
var app = require('./app');

test('basic http request test', (done) => {
  request(app).get('/').then((response) => {
    expect(response.statusCode).toBe(200);
    done();
  });
});

