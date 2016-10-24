'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Reserva = mongoose.model('Reserva'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  reserva;

/**
 * Reserva routes tests
 */
describe('Reserva CRUD tests', function () {

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

    // Save a user to the test db and create new Reserva
    user.save(function () {
      reserva = {
        name: 'Reserva name'
      };

      done();
    });
  });

  it('should be able to save a Reserva if logged in', function (done) {
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

        // Save a new Reserva
        agent.post('/api/reservas')
          .send(reserva)
          .expect(200)
          .end(function (reservaSaveErr, reservaSaveRes) {
            // Handle Reserva save error
            if (reservaSaveErr) {
              return done(reservaSaveErr);
            }

            // Get a list of Reservas
            agent.get('/api/reservas')
              .end(function (reservasGetErr, reservasGetRes) {
                // Handle Reservas save error
                if (reservasGetErr) {
                  return done(reservasGetErr);
                }

                // Get Reservas list
                var reservas = reservasGetRes.body;

                // Set assertions
                (reservas[0].user._id).should.equal(userId);
                (reservas[0].name).should.match('Reserva name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Reserva if not logged in', function (done) {
    agent.post('/api/reservas')
      .send(reserva)
      .expect(403)
      .end(function (reservaSaveErr, reservaSaveRes) {
        // Call the assertion callback
        done(reservaSaveErr);
      });
  });

  it('should not be able to save an Reserva if no name is provided', function (done) {
    // Invalidate name field
    reserva.name = '';

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

        // Save a new Reserva
        agent.post('/api/reservas')
          .send(reserva)
          .expect(400)
          .end(function (reservaSaveErr, reservaSaveRes) {
            // Set message assertion
            (reservaSaveRes.body.message).should.match('Please fill Reserva name');

            // Handle Reserva save error
            done(reservaSaveErr);
          });
      });
  });

  it('should be able to update an Reserva if signed in', function (done) {
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

        // Save a new Reserva
        agent.post('/api/reservas')
          .send(reserva)
          .expect(200)
          .end(function (reservaSaveErr, reservaSaveRes) {
            // Handle Reserva save error
            if (reservaSaveErr) {
              return done(reservaSaveErr);
            }

            // Update Reserva name
            reserva.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Reserva
            agent.put('/api/reservas/' + reservaSaveRes.body._id)
              .send(reserva)
              .expect(200)
              .end(function (reservaUpdateErr, reservaUpdateRes) {
                // Handle Reserva update error
                if (reservaUpdateErr) {
                  return done(reservaUpdateErr);
                }

                // Set assertions
                (reservaUpdateRes.body._id).should.equal(reservaSaveRes.body._id);
                (reservaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Reservas if not signed in', function (done) {
    // Create new Reserva model instance
    var reservaObj = new Reserva(reserva);

    // Save the reserva
    reservaObj.save(function () {
      // Request Reservas
      request(app).get('/api/reservas')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Reserva if not signed in', function (done) {
    // Create new Reserva model instance
    var reservaObj = new Reserva(reserva);

    // Save the Reserva
    reservaObj.save(function () {
      request(app).get('/api/reservas/' + reservaObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', reserva.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Reserva with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/reservas/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Reserva is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Reserva which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Reserva
    request(app).get('/api/reservas/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Reserva with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Reserva if signed in', function (done) {
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

        // Save a new Reserva
        agent.post('/api/reservas')
          .send(reserva)
          .expect(200)
          .end(function (reservaSaveErr, reservaSaveRes) {
            // Handle Reserva save error
            if (reservaSaveErr) {
              return done(reservaSaveErr);
            }

            // Delete an existing Reserva
            agent.delete('/api/reservas/' + reservaSaveRes.body._id)
              .send(reserva)
              .expect(200)
              .end(function (reservaDeleteErr, reservaDeleteRes) {
                // Handle reserva error error
                if (reservaDeleteErr) {
                  return done(reservaDeleteErr);
                }

                // Set assertions
                (reservaDeleteRes.body._id).should.equal(reservaSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Reserva if not signed in', function (done) {
    // Set Reserva user
    reserva.user = user;

    // Create new Reserva model instance
    var reservaObj = new Reserva(reserva);

    // Save the Reserva
    reservaObj.save(function () {
      // Try deleting Reserva
      request(app).delete('/api/reservas/' + reservaObj._id)
        .expect(403)
        .end(function (reservaDeleteErr, reservaDeleteRes) {
          // Set message assertion
          (reservaDeleteRes.body.message).should.match('User is not authorized');

          // Handle Reserva error error
          done(reservaDeleteErr);
        });

    });
  });

  it('should be able to get a single Reserva that has an orphaned user reference', function (done) {
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

          // Save a new Reserva
          agent.post('/api/reservas')
            .send(reserva)
            .expect(200)
            .end(function (reservaSaveErr, reservaSaveRes) {
              // Handle Reserva save error
              if (reservaSaveErr) {
                return done(reservaSaveErr);
              }

              // Set assertions on new Reserva
              (reservaSaveRes.body.name).should.equal(reserva.name);
              should.exist(reservaSaveRes.body.user);
              should.equal(reservaSaveRes.body.user._id, orphanId);

              // force the Reserva to have an orphaned user reference
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

                    // Get the Reserva
                    agent.get('/api/reservas/' + reservaSaveRes.body._id)
                      .expect(200)
                      .end(function (reservaInfoErr, reservaInfoRes) {
                        // Handle Reserva error
                        if (reservaInfoErr) {
                          return done(reservaInfoErr);
                        }

                        // Set assertions
                        (reservaInfoRes.body._id).should.equal(reservaSaveRes.body._id);
                        (reservaInfoRes.body.name).should.equal(reserva.name);
                        should.equal(reservaInfoRes.body.user, undefined);

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
      Reserva.remove().exec(done);
    });
  });
});
