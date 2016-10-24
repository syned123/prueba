'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Rutum = mongoose.model('Rutum'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  rutum;

/**
 * Rutum routes tests
 */
describe('Rutum CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Rutum
    user.save(function () {
      rutum = {
        name: 'Rutum name'
      };

      done();
    });
  });

  it('should be able to save a Rutum if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Rutum
        agent.post('/api/ruta')
          .send(rutum)
          .expect(200)
          .end(function (rutumSaveErr, rutumSaveRes) {
            // Handle Rutum save error
            if (rutumSaveErr) {
              return done(rutumSaveErr);
            }

            // Get a list of Ruta
            agent.get('/api/ruta')
              .end(function (rutaGetErr, rutaGetRes) {
                // Handle Ruta save error
                if (rutaGetErr) {
                  return done(rutaGetErr);
                }

                // Get Ruta list
                var ruta = rutaGetRes.body;

                // Set assertions
                (ruta[0].user._id).should.equal(userId);
                (ruta[0].name).should.match('Rutum name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Rutum if not logged in', function (done) {
    agent.post('/api/ruta')
      .send(rutum)
      .expect(403)
      .end(function (rutumSaveErr, rutumSaveRes) {
        // Call the assertion callback
        done(rutumSaveErr);
      });
  });

  it('should not be able to save an Rutum if no name is provided', function (done) {
    // Invalidate name field
    rutum.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Rutum
        agent.post('/api/ruta')
          .send(rutum)
          .expect(400)
          .end(function (rutumSaveErr, rutumSaveRes) {
            // Set message assertion
            (rutumSaveRes.body.message).should.match('Please fill Rutum name');

            // Handle Rutum save error
            done(rutumSaveErr);
          });
      });
  });

  it('should be able to update an Rutum if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Rutum
        agent.post('/api/ruta')
          .send(rutum)
          .expect(200)
          .end(function (rutumSaveErr, rutumSaveRes) {
            // Handle Rutum save error
            if (rutumSaveErr) {
              return done(rutumSaveErr);
            }

            // Update Rutum name
            rutum.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Rutum
            agent.put('/api/ruta/' + rutumSaveRes.body._id)
              .send(rutum)
              .expect(200)
              .end(function (rutumUpdateErr, rutumUpdateRes) {
                // Handle Rutum update error
                if (rutumUpdateErr) {
                  return done(rutumUpdateErr);
                }

                // Set assertions
                (rutumUpdateRes.body._id).should.equal(rutumSaveRes.body._id);
                (rutumUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Ruta if not signed in', function (done) {
    // Create new Rutum model instance
    var rutumObj = new Rutum(rutum);

    // Save the rutum
    rutumObj.save(function () {
      // Request Ruta
      request(app).get('/api/ruta')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Rutum if not signed in', function (done) {
    // Create new Rutum model instance
    var rutumObj = new Rutum(rutum);

    // Save the Rutum
    rutumObj.save(function () {
      request(app).get('/api/ruta/' + rutumObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', rutum.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Rutum with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/ruta/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Rutum is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Rutum which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Rutum
    request(app).get('/api/ruta/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Rutum with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Rutum if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Rutum
        agent.post('/api/ruta')
          .send(rutum)
          .expect(200)
          .end(function (rutumSaveErr, rutumSaveRes) {
            // Handle Rutum save error
            if (rutumSaveErr) {
              return done(rutumSaveErr);
            }

            // Delete an existing Rutum
            agent.delete('/api/ruta/' + rutumSaveRes.body._id)
              .send(rutum)
              .expect(200)
              .end(function (rutumDeleteErr, rutumDeleteRes) {
                // Handle rutum error error
                if (rutumDeleteErr) {
                  return done(rutumDeleteErr);
                }

                // Set assertions
                (rutumDeleteRes.body._id).should.equal(rutumSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Rutum if not signed in', function (done) {
    // Set Rutum user
    rutum.user = user;

    // Create new Rutum model instance
    var rutumObj = new Rutum(rutum);

    // Save the Rutum
    rutumObj.save(function () {
      // Try deleting Rutum
      request(app).delete('/api/ruta/' + rutumObj._id)
        .expect(403)
        .end(function (rutumDeleteErr, rutumDeleteRes) {
          // Set message assertion
          (rutumDeleteRes.body.message).should.match('User is not authorized');

          // Handle Rutum error error
          done(rutumDeleteErr);
        });

    });
  });

  it('should be able to get a single Rutum that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Rutum
          agent.post('/api/ruta')
            .send(rutum)
            .expect(200)
            .end(function (rutumSaveErr, rutumSaveRes) {
              // Handle Rutum save error
              if (rutumSaveErr) {
                return done(rutumSaveErr);
              }

              // Set assertions on new Rutum
              (rutumSaveRes.body.name).should.equal(rutum.name);
              should.exist(rutumSaveRes.body.user);
              should.equal(rutumSaveRes.body.user._id, orphanId);

              // force the Rutum to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Rutum
                    agent.get('/api/ruta/' + rutumSaveRes.body._id)
                      .expect(200)
                      .end(function (rutumInfoErr, rutumInfoRes) {
                        // Handle Rutum error
                        if (rutumInfoErr) {
                          return done(rutumInfoErr);
                        }

                        // Set assertions
                        (rutumInfoRes.body._id).should.equal(rutumSaveRes.body._id);
                        (rutumInfoRes.body.name).should.equal(rutum.name);
                        should.equal(rutumInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Rutum.remove().exec(done);
    });
  });
});
