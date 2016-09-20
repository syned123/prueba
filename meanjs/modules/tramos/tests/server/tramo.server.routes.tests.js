'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Tramo = mongoose.model('Tramo'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  tramo;

/**
 * Tramo routes tests
 */
describe('Tramo CRUD tests', function () {

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

    // Save a user to the test db and create new Tramo
    user.save(function () {
      tramo = {
        name: 'Tramo name'
      };

      done();
    });
  });

  it('should be able to save a Tramo if logged in', function (done) {
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

        // Save a new Tramo
        agent.post('/api/tramos')
          .send(tramo)
          .expect(200)
          .end(function (tramoSaveErr, tramoSaveRes) {
            // Handle Tramo save error
            if (tramoSaveErr) {
              return done(tramoSaveErr);
            }

            // Get a list of Tramos
            agent.get('/api/tramos')
              .end(function (tramosGetErr, tramosGetRes) {
                // Handle Tramos save error
                if (tramosGetErr) {
                  return done(tramosGetErr);
                }

                // Get Tramos list
                var tramos = tramosGetRes.body;

                // Set assertions
                (tramos[0].user._id).should.equal(userId);
                (tramos[0].name).should.match('Tramo name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Tramo if not logged in', function (done) {
    agent.post('/api/tramos')
      .send(tramo)
      .expect(403)
      .end(function (tramoSaveErr, tramoSaveRes) {
        // Call the assertion callback
        done(tramoSaveErr);
      });
  });

  it('should not be able to save an Tramo if no name is provided', function (done) {
    // Invalidate name field
    tramo.name = '';

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

        // Save a new Tramo
        agent.post('/api/tramos')
          .send(tramo)
          .expect(400)
          .end(function (tramoSaveErr, tramoSaveRes) {
            // Set message assertion
            (tramoSaveRes.body.message).should.match('Please fill Tramo name');

            // Handle Tramo save error
            done(tramoSaveErr);
          });
      });
  });

  it('should be able to update an Tramo if signed in', function (done) {
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

        // Save a new Tramo
        agent.post('/api/tramos')
          .send(tramo)
          .expect(200)
          .end(function (tramoSaveErr, tramoSaveRes) {
            // Handle Tramo save error
            if (tramoSaveErr) {
              return done(tramoSaveErr);
            }

            // Update Tramo name
            tramo.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Tramo
            agent.put('/api/tramos/' + tramoSaveRes.body._id)
              .send(tramo)
              .expect(200)
              .end(function (tramoUpdateErr, tramoUpdateRes) {
                // Handle Tramo update error
                if (tramoUpdateErr) {
                  return done(tramoUpdateErr);
                }

                // Set assertions
                (tramoUpdateRes.body._id).should.equal(tramoSaveRes.body._id);
                (tramoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Tramos if not signed in', function (done) {
    // Create new Tramo model instance
    var tramoObj = new Tramo(tramo);

    // Save the tramo
    tramoObj.save(function () {
      // Request Tramos
      request(app).get('/api/tramos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Tramo if not signed in', function (done) {
    // Create new Tramo model instance
    var tramoObj = new Tramo(tramo);

    // Save the Tramo
    tramoObj.save(function () {
      request(app).get('/api/tramos/' + tramoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', tramo.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Tramo with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/tramos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Tramo is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Tramo which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Tramo
    request(app).get('/api/tramos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Tramo with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Tramo if signed in', function (done) {
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

        // Save a new Tramo
        agent.post('/api/tramos')
          .send(tramo)
          .expect(200)
          .end(function (tramoSaveErr, tramoSaveRes) {
            // Handle Tramo save error
            if (tramoSaveErr) {
              return done(tramoSaveErr);
            }

            // Delete an existing Tramo
            agent.delete('/api/tramos/' + tramoSaveRes.body._id)
              .send(tramo)
              .expect(200)
              .end(function (tramoDeleteErr, tramoDeleteRes) {
                // Handle tramo error error
                if (tramoDeleteErr) {
                  return done(tramoDeleteErr);
                }

                // Set assertions
                (tramoDeleteRes.body._id).should.equal(tramoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Tramo if not signed in', function (done) {
    // Set Tramo user
    tramo.user = user;

    // Create new Tramo model instance
    var tramoObj = new Tramo(tramo);

    // Save the Tramo
    tramoObj.save(function () {
      // Try deleting Tramo
      request(app).delete('/api/tramos/' + tramoObj._id)
        .expect(403)
        .end(function (tramoDeleteErr, tramoDeleteRes) {
          // Set message assertion
          (tramoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Tramo error error
          done(tramoDeleteErr);
        });

    });
  });

  it('should be able to get a single Tramo that has an orphaned user reference', function (done) {
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

          // Save a new Tramo
          agent.post('/api/tramos')
            .send(tramo)
            .expect(200)
            .end(function (tramoSaveErr, tramoSaveRes) {
              // Handle Tramo save error
              if (tramoSaveErr) {
                return done(tramoSaveErr);
              }

              // Set assertions on new Tramo
              (tramoSaveRes.body.name).should.equal(tramo.name);
              should.exist(tramoSaveRes.body.user);
              should.equal(tramoSaveRes.body.user._id, orphanId);

              // force the Tramo to have an orphaned user reference
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

                    // Get the Tramo
                    agent.get('/api/tramos/' + tramoSaveRes.body._id)
                      .expect(200)
                      .end(function (tramoInfoErr, tramoInfoRes) {
                        // Handle Tramo error
                        if (tramoInfoErr) {
                          return done(tramoInfoErr);
                        }

                        // Set assertions
                        (tramoInfoRes.body._id).should.equal(tramoSaveRes.body._id);
                        (tramoInfoRes.body.name).should.equal(tramo.name);
                        should.equal(tramoInfoRes.body.user, undefined);

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
      Tramo.remove().exec(done);
    });
  });
});
