'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Viaje = mongoose.model('Viaje'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  viaje;

/**
 * Viaje routes tests
 */
describe('Viaje CRUD tests', function () {

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

    // Save a user to the test db and create new Viaje
    user.save(function () {
      viaje = {
        name: 'Viaje name'
      };

      done();
    });
  });

  it('should be able to save a Viaje if logged in', function (done) {
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

        // Save a new Viaje
        agent.post('/api/viajes')
          .send(viaje)
          .expect(200)
          .end(function (viajeSaveErr, viajeSaveRes) {
            // Handle Viaje save error
            if (viajeSaveErr) {
              return done(viajeSaveErr);
            }

            // Get a list of Viajes
            agent.get('/api/viajes')
              .end(function (viajesGetErr, viajesGetRes) {
                // Handle Viajes save error
                if (viajesGetErr) {
                  return done(viajesGetErr);
                }

                // Get Viajes list
                var viajes = viajesGetRes.body;

                // Set assertions
                (viajes[0].user._id).should.equal(userId);
                (viajes[0].name).should.match('Viaje name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Viaje if not logged in', function (done) {
    agent.post('/api/viajes')
      .send(viaje)
      .expect(403)
      .end(function (viajeSaveErr, viajeSaveRes) {
        // Call the assertion callback
        done(viajeSaveErr);
      });
  });

  it('should not be able to save an Viaje if no name is provided', function (done) {
    // Invalidate name field
    viaje.name = '';

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

        // Save a new Viaje
        agent.post('/api/viajes')
          .send(viaje)
          .expect(400)
          .end(function (viajeSaveErr, viajeSaveRes) {
            // Set message assertion
            (viajeSaveRes.body.message).should.match('Please fill Viaje name');

            // Handle Viaje save error
            done(viajeSaveErr);
          });
      });
  });

  it('should be able to update an Viaje if signed in', function (done) {
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

        // Save a new Viaje
        agent.post('/api/viajes')
          .send(viaje)
          .expect(200)
          .end(function (viajeSaveErr, viajeSaveRes) {
            // Handle Viaje save error
            if (viajeSaveErr) {
              return done(viajeSaveErr);
            }

            // Update Viaje name
            viaje.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Viaje
            agent.put('/api/viajes/' + viajeSaveRes.body._id)
              .send(viaje)
              .expect(200)
              .end(function (viajeUpdateErr, viajeUpdateRes) {
                // Handle Viaje update error
                if (viajeUpdateErr) {
                  return done(viajeUpdateErr);
                }

                // Set assertions
                (viajeUpdateRes.body._id).should.equal(viajeSaveRes.body._id);
                (viajeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Viajes if not signed in', function (done) {
    // Create new Viaje model instance
    var viajeObj = new Viaje(viaje);

    // Save the viaje
    viajeObj.save(function () {
      // Request Viajes
      request(app).get('/api/viajes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Viaje if not signed in', function (done) {
    // Create new Viaje model instance
    var viajeObj = new Viaje(viaje);

    // Save the Viaje
    viajeObj.save(function () {
      request(app).get('/api/viajes/' + viajeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', viaje.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Viaje with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/viajes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Viaje is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Viaje which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Viaje
    request(app).get('/api/viajes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Viaje with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Viaje if signed in', function (done) {
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

        // Save a new Viaje
        agent.post('/api/viajes')
          .send(viaje)
          .expect(200)
          .end(function (viajeSaveErr, viajeSaveRes) {
            // Handle Viaje save error
            if (viajeSaveErr) {
              return done(viajeSaveErr);
            }

            // Delete an existing Viaje
            agent.delete('/api/viajes/' + viajeSaveRes.body._id)
              .send(viaje)
              .expect(200)
              .end(function (viajeDeleteErr, viajeDeleteRes) {
                // Handle viaje error error
                if (viajeDeleteErr) {
                  return done(viajeDeleteErr);
                }

                // Set assertions
                (viajeDeleteRes.body._id).should.equal(viajeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Viaje if not signed in', function (done) {
    // Set Viaje user
    viaje.user = user;

    // Create new Viaje model instance
    var viajeObj = new Viaje(viaje);

    // Save the Viaje
    viajeObj.save(function () {
      // Try deleting Viaje
      request(app).delete('/api/viajes/' + viajeObj._id)
        .expect(403)
        .end(function (viajeDeleteErr, viajeDeleteRes) {
          // Set message assertion
          (viajeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Viaje error error
          done(viajeDeleteErr);
        });

    });
  });

  it('should be able to get a single Viaje that has an orphaned user reference', function (done) {
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

          // Save a new Viaje
          agent.post('/api/viajes')
            .send(viaje)
            .expect(200)
            .end(function (viajeSaveErr, viajeSaveRes) {
              // Handle Viaje save error
              if (viajeSaveErr) {
                return done(viajeSaveErr);
              }

              // Set assertions on new Viaje
              (viajeSaveRes.body.name).should.equal(viaje.name);
              should.exist(viajeSaveRes.body.user);
              should.equal(viajeSaveRes.body.user._id, orphanId);

              // force the Viaje to have an orphaned user reference
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

                    // Get the Viaje
                    agent.get('/api/viajes/' + viajeSaveRes.body._id)
                      .expect(200)
                      .end(function (viajeInfoErr, viajeInfoRes) {
                        // Handle Viaje error
                        if (viajeInfoErr) {
                          return done(viajeInfoErr);
                        }

                        // Set assertions
                        (viajeInfoRes.body._id).should.equal(viajeSaveRes.body._id);
                        (viajeInfoRes.body.name).should.equal(viaje.name);
                        should.equal(viajeInfoRes.body.user, undefined);

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
      Viaje.remove().exec(done);
    });
  });
});
