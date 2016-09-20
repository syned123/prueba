'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Asistente = mongoose.model('Asistente'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  asistente;

/**
 * Asistente routes tests
 */
describe('Asistente CRUD tests', function () {

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

    // Save a user to the test db and create new Asistente
    user.save(function () {
      asistente = {
        name: 'Asistente name'
      };

      done();
    });
  });

  it('should be able to save a Asistente if logged in', function (done) {
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

        // Save a new Asistente
        agent.post('/api/asistentes')
          .send(asistente)
          .expect(200)
          .end(function (asistenteSaveErr, asistenteSaveRes) {
            // Handle Asistente save error
            if (asistenteSaveErr) {
              return done(asistenteSaveErr);
            }

            // Get a list of Asistentes
            agent.get('/api/asistentes')
              .end(function (asistentesGetErr, asistentesGetRes) {
                // Handle Asistentes save error
                if (asistentesGetErr) {
                  return done(asistentesGetErr);
                }

                // Get Asistentes list
                var asistentes = asistentesGetRes.body;

                // Set assertions
                (asistentes[0].user._id).should.equal(userId);
                (asistentes[0].name).should.match('Asistente name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Asistente if not logged in', function (done) {
    agent.post('/api/asistentes')
      .send(asistente)
      .expect(403)
      .end(function (asistenteSaveErr, asistenteSaveRes) {
        // Call the assertion callback
        done(asistenteSaveErr);
      });
  });

  it('should not be able to save an Asistente if no name is provided', function (done) {
    // Invalidate name field
    asistente.name = '';

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

        // Save a new Asistente
        agent.post('/api/asistentes')
          .send(asistente)
          .expect(400)
          .end(function (asistenteSaveErr, asistenteSaveRes) {
            // Set message assertion
            (asistenteSaveRes.body.message).should.match('Please fill Asistente name');

            // Handle Asistente save error
            done(asistenteSaveErr);
          });
      });
  });

  it('should be able to update an Asistente if signed in', function (done) {
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

        // Save a new Asistente
        agent.post('/api/asistentes')
          .send(asistente)
          .expect(200)
          .end(function (asistenteSaveErr, asistenteSaveRes) {
            // Handle Asistente save error
            if (asistenteSaveErr) {
              return done(asistenteSaveErr);
            }

            // Update Asistente name
            asistente.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Asistente
            agent.put('/api/asistentes/' + asistenteSaveRes.body._id)
              .send(asistente)
              .expect(200)
              .end(function (asistenteUpdateErr, asistenteUpdateRes) {
                // Handle Asistente update error
                if (asistenteUpdateErr) {
                  return done(asistenteUpdateErr);
                }

                // Set assertions
                (asistenteUpdateRes.body._id).should.equal(asistenteSaveRes.body._id);
                (asistenteUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Asistentes if not signed in', function (done) {
    // Create new Asistente model instance
    var asistenteObj = new Asistente(asistente);

    // Save the asistente
    asistenteObj.save(function () {
      // Request Asistentes
      request(app).get('/api/asistentes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Asistente if not signed in', function (done) {
    // Create new Asistente model instance
    var asistenteObj = new Asistente(asistente);

    // Save the Asistente
    asistenteObj.save(function () {
      request(app).get('/api/asistentes/' + asistenteObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', asistente.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Asistente with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/asistentes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Asistente is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Asistente which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Asistente
    request(app).get('/api/asistentes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Asistente with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Asistente if signed in', function (done) {
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

        // Save a new Asistente
        agent.post('/api/asistentes')
          .send(asistente)
          .expect(200)
          .end(function (asistenteSaveErr, asistenteSaveRes) {
            // Handle Asistente save error
            if (asistenteSaveErr) {
              return done(asistenteSaveErr);
            }

            // Delete an existing Asistente
            agent.delete('/api/asistentes/' + asistenteSaveRes.body._id)
              .send(asistente)
              .expect(200)
              .end(function (asistenteDeleteErr, asistenteDeleteRes) {
                // Handle asistente error error
                if (asistenteDeleteErr) {
                  return done(asistenteDeleteErr);
                }

                // Set assertions
                (asistenteDeleteRes.body._id).should.equal(asistenteSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Asistente if not signed in', function (done) {
    // Set Asistente user
    asistente.user = user;

    // Create new Asistente model instance
    var asistenteObj = new Asistente(asistente);

    // Save the Asistente
    asistenteObj.save(function () {
      // Try deleting Asistente
      request(app).delete('/api/asistentes/' + asistenteObj._id)
        .expect(403)
        .end(function (asistenteDeleteErr, asistenteDeleteRes) {
          // Set message assertion
          (asistenteDeleteRes.body.message).should.match('User is not authorized');

          // Handle Asistente error error
          done(asistenteDeleteErr);
        });

    });
  });

  it('should be able to get a single Asistente that has an orphaned user reference', function (done) {
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

          // Save a new Asistente
          agent.post('/api/asistentes')
            .send(asistente)
            .expect(200)
            .end(function (asistenteSaveErr, asistenteSaveRes) {
              // Handle Asistente save error
              if (asistenteSaveErr) {
                return done(asistenteSaveErr);
              }

              // Set assertions on new Asistente
              (asistenteSaveRes.body.name).should.equal(asistente.name);
              should.exist(asistenteSaveRes.body.user);
              should.equal(asistenteSaveRes.body.user._id, orphanId);

              // force the Asistente to have an orphaned user reference
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

                    // Get the Asistente
                    agent.get('/api/asistentes/' + asistenteSaveRes.body._id)
                      .expect(200)
                      .end(function (asistenteInfoErr, asistenteInfoRes) {
                        // Handle Asistente error
                        if (asistenteInfoErr) {
                          return done(asistenteInfoErr);
                        }

                        // Set assertions
                        (asistenteInfoRes.body._id).should.equal(asistenteSaveRes.body._id);
                        (asistenteInfoRes.body.name).should.equal(asistente.name);
                        should.equal(asistenteInfoRes.body.user, undefined);

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
      Asistente.remove().exec(done);
    });
  });
});
