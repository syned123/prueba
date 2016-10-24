'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Asiento = mongoose.model('Asiento'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  asiento;

/**
 * Asiento routes tests
 */
describe('Asiento CRUD tests', function () {

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

    // Save a user to the test db and create new Asiento
    user.save(function () {
      asiento = {
        name: 'Asiento name'
      };

      done();
    });
  });

  it('should be able to save a Asiento if logged in', function (done) {
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

        // Save a new Asiento
        agent.post('/api/asientos')
          .send(asiento)
          .expect(200)
          .end(function (asientoSaveErr, asientoSaveRes) {
            // Handle Asiento save error
            if (asientoSaveErr) {
              return done(asientoSaveErr);
            }

            // Get a list of Asientos
            agent.get('/api/asientos')
              .end(function (asientosGetErr, asientosGetRes) {
                // Handle Asientos save error
                if (asientosGetErr) {
                  return done(asientosGetErr);
                }

                // Get Asientos list
                var asientos = asientosGetRes.body;

                // Set assertions
                (asientos[0].user._id).should.equal(userId);
                (asientos[0].name).should.match('Asiento name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Asiento if not logged in', function (done) {
    agent.post('/api/asientos')
      .send(asiento)
      .expect(403)
      .end(function (asientoSaveErr, asientoSaveRes) {
        // Call the assertion callback
        done(asientoSaveErr);
      });
  });

  it('should not be able to save an Asiento if no name is provided', function (done) {
    // Invalidate name field
    asiento.name = '';

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

        // Save a new Asiento
        agent.post('/api/asientos')
          .send(asiento)
          .expect(400)
          .end(function (asientoSaveErr, asientoSaveRes) {
            // Set message assertion
            (asientoSaveRes.body.message).should.match('Please fill Asiento name');

            // Handle Asiento save error
            done(asientoSaveErr);
          });
      });
  });

  it('should be able to update an Asiento if signed in', function (done) {
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

        // Save a new Asiento
        agent.post('/api/asientos')
          .send(asiento)
          .expect(200)
          .end(function (asientoSaveErr, asientoSaveRes) {
            // Handle Asiento save error
            if (asientoSaveErr) {
              return done(asientoSaveErr);
            }

            // Update Asiento name
            asiento.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Asiento
            agent.put('/api/asientos/' + asientoSaveRes.body._id)
              .send(asiento)
              .expect(200)
              .end(function (asientoUpdateErr, asientoUpdateRes) {
                // Handle Asiento update error
                if (asientoUpdateErr) {
                  return done(asientoUpdateErr);
                }

                // Set assertions
                (asientoUpdateRes.body._id).should.equal(asientoSaveRes.body._id);
                (asientoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Asientos if not signed in', function (done) {
    // Create new Asiento model instance
    var asientoObj = new Asiento(asiento);

    // Save the asiento
    asientoObj.save(function () {
      // Request Asientos
      request(app).get('/api/asientos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Asiento if not signed in', function (done) {
    // Create new Asiento model instance
    var asientoObj = new Asiento(asiento);

    // Save the Asiento
    asientoObj.save(function () {
      request(app).get('/api/asientos/' + asientoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', asiento.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Asiento with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/asientos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Asiento is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Asiento which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Asiento
    request(app).get('/api/asientos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Asiento with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Asiento if signed in', function (done) {
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

        // Save a new Asiento
        agent.post('/api/asientos')
          .send(asiento)
          .expect(200)
          .end(function (asientoSaveErr, asientoSaveRes) {
            // Handle Asiento save error
            if (asientoSaveErr) {
              return done(asientoSaveErr);
            }

            // Delete an existing Asiento
            agent.delete('/api/asientos/' + asientoSaveRes.body._id)
              .send(asiento)
              .expect(200)
              .end(function (asientoDeleteErr, asientoDeleteRes) {
                // Handle asiento error error
                if (asientoDeleteErr) {
                  return done(asientoDeleteErr);
                }

                // Set assertions
                (asientoDeleteRes.body._id).should.equal(asientoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Asiento if not signed in', function (done) {
    // Set Asiento user
    asiento.user = user;

    // Create new Asiento model instance
    var asientoObj = new Asiento(asiento);

    // Save the Asiento
    asientoObj.save(function () {
      // Try deleting Asiento
      request(app).delete('/api/asientos/' + asientoObj._id)
        .expect(403)
        .end(function (asientoDeleteErr, asientoDeleteRes) {
          // Set message assertion
          (asientoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Asiento error error
          done(asientoDeleteErr);
        });

    });
  });

  it('should be able to get a single Asiento that has an orphaned user reference', function (done) {
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

          // Save a new Asiento
          agent.post('/api/asientos')
            .send(asiento)
            .expect(200)
            .end(function (asientoSaveErr, asientoSaveRes) {
              // Handle Asiento save error
              if (asientoSaveErr) {
                return done(asientoSaveErr);
              }

              // Set assertions on new Asiento
              (asientoSaveRes.body.name).should.equal(asiento.name);
              should.exist(asientoSaveRes.body.user);
              should.equal(asientoSaveRes.body.user._id, orphanId);

              // force the Asiento to have an orphaned user reference
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

                    // Get the Asiento
                    agent.get('/api/asientos/' + asientoSaveRes.body._id)
                      .expect(200)
                      .end(function (asientoInfoErr, asientoInfoRes) {
                        // Handle Asiento error
                        if (asientoInfoErr) {
                          return done(asientoInfoErr);
                        }

                        // Set assertions
                        (asientoInfoRes.body._id).should.equal(asientoSaveRes.body._id);
                        (asientoInfoRes.body.name).should.equal(asiento.name);
                        should.equal(asientoInfoRes.body.user, undefined);

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
      Asiento.remove().exec(done);
    });
  });
});
