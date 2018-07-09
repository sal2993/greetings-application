var request = require('supertest');
request = request('http://localhost:3000');

test('Expect 200 response', function(done) {
  request.get('/signup').then( function(response) {
    expect(response.statusCode).toBe(200);
    done();
  });
});

// TODO: The test signups are being saved in the main database,
// TODO: So fix that so they save to a test db
test('test a user registration', function(done) {
  request
    .post('/signup')
    .send('firstname=sam')
    .send('password=Rainbow1')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
        if (err) {
            return done(err);
        }
        done();
    });
});

/*
test('test a user registration: username case in-sensitive',
  function(done) {
  request
    .post('/signup')
    .send('firstname=lucas')
    .send('password=Rainbow1')
    .set('Accept', 'application/json')
    .expect(function(res) {
        res.body.firstname = 'LUCAS';
    })
    .expect(200, {
      firstname: 'lucas'
    })
    .end(function(err, res) {
        if (err) {
            return done(err);
        }
        done();
    });
});
*/
