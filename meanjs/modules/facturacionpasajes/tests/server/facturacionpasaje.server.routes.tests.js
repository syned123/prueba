'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Facturacionpasaje = mongoose.model('Facturacionpasaje'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  facturacionpasaje;

/**
 * Facturacionpasaje routes tests
 */
describe('Facturacionpasaje CRUD tests', function () {

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

    // Save a user to the test db and create new Facturacionpasaje
    user.save(function () {
      facturacionpasaje = {
        name: 'Facturacionpasaje name'
      };

      done();
    });
  });

  it('should be able to save a Facturacionpasaje if logged in', function (done) {
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

        // Save a new Facturacionpasaje
        agent.post('/api/facturacionpasajes')
          .send(facturacionpasaje)
          .expect(200)
          .end(function (facturacionpasajeSaveErr, facturacionpasajeSaveRes) {
            // Handle Facturacionpasaje save error
            if (facturacionpasajeSaveErr) {
              return done(facturacionpasajeSaveErr);
            }

            // Get a list of Facturacionpasajes
            agent.get('/api/facturacionpasajes')
              .end(function (facturacionpasajesGetErr, facturacionpasajesGetRes) {
                // Handle Facturacionpasajes save error
                if (facturacionpasajesGetErr) {
                  return done(facturacionpasajesGetErr);
                }

                // Get Facturacionpasajes list
                var facturacionpasajes = facturacionpasajesGetRes.body;

                // Set assertions
                (facturacionpasajes[0].user._id).should.equal(userId);
                (facturacionpasajes[0].name).should.match('Facturacionpasaje name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Facturacionpasaje if not logged in', function (done) {
    agent.post('/api/facturacionpasajes')
      .send(facturacionpasaje)
      .expect(403)
      .end(function (facturacionpasajeSaveErr, facturacionpasajeSaveRes) {
        // Call the assertion callback
        done(facturacionpasajeSaveErr);
      });
  });

  it('should not be able to save an Facturacionpasaje if no name is provided', function (done) {
    // Invalidate name field
    facturacionpasaje.name = '';

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

        // Save a new Facturacionpasaje
        agent.post('/api/facturacionpasajes')
          .send(facturacionpasaje)
          .expect(400)
          .end(function (facturacionpasajeSaveErr, facturacionpasajeSaveRes) {
            // Set message assertion
            (facturacionpasajeSaveRes.body.message).should.match('Please fill Facturacionpasaje name');

            // Handle Facturacionpasaje save error
            done(facturacionpasajeSaveErr);
          });
      });
  });

  it('should be able to update an Facturacionpasaje if signed in', function (done) {
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

        // Save a new Facturacionpasaje
        agent.post('/api/facturacionpasajes')
          .send(facturacionpasaje)
          .expect(200)
          .end(function (facturacionpasajeSaveErr, facturacionpasajeSaveRes) {
            // Handle Facturacionpasaje save error
            if (facturacionpasajeSaveErr) {
              return done(facturacionpasajeSaveErr);
            }

            // Update Facturacionpasaje name
            facturacionpasaje.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Facturacionpasaje
            agent.put('/api/facturacionpasajes/' + facturacionpasajeSaveRes.body._id)
              .send(facturacionpasaje)
              .expect(200)
              .end(function (facturacionpasajeUpdateErr, facturacionpasajeUpdateRes) {
                // Handle Facturacionpasaje update error
                if (facturacionpasajeUpdateErr) {
                  return done(facturacionpasajeUpdateErr);
                }

                // Set assertions
                (facturacionpasajeUpdateRes.body._id).should.equal(facturacionpasajeSaveRes.body._id);
                (facturacionpasajeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Facturacionpasajes if not signed in', function (done) {
    // Create new Facturacionpasaje model instance
    var facturacionpasajeObj = new Facturacionpasaje(facturacionpasaje);

    // Save the facturacionpasaje
    facturacionpasajeObj.save(function () {
      // Request Facturacionpasajes
      request(app).get('/api/facturacionpasajes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Facturacionpasaje if not signed in', function (done) {
    // Create new Facturacionpasaje model instance
    var facturacionpasajeObj = new Facturacionpasaje(facturacionpasaje);

    // Save the Facturacionpasaje
    facturacionpasajeObj.save(function () {
      request(app).get('/api/facturacionpasajes/' + facturacionpasajeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', facturacionpasaje.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Facturacionpasaje with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/facturacionpasajes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Facturacionpasaje is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Facturacionpasaje which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Facturacionpasaje
    request(app).get('/api/facturacionpasajes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Facturacionpasaje with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Facturacionpasaje if signed in', function (done) {
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

        // Save a new Facturacionpasaje
        agent.post('/api/facturacionpasajes')
          .send(facturacionpasaje)
          .expect(200)
          .end(function (facturacionpasajeSaveErr, facturacionpasajeSaveRes) {
            // Handle Facturacionpasaje save error
            if (facturacionpasajeSaveErr) {
              return done(facturacionpasajeSaveErr);
            }

            // Delete an existing Facturacionpasaje
            agent.delete('/api/facturacionpasajes/' + facturacionpasajeSaveRes.body._id)
              .send(facturacionpasaje)
              .expect(200)
              .end(function (facturacionpasajeDeleteErr, facturacionpasajeDeleteRes) {
                // Handle facturacionpasaje error error
                if (facturacionpasajeDeleteErr) {
                  return done(facturacionpasajeDeleteErr);
                }

                // Set assertions
                (facturacionpasajeDeleteRes.body._id).should.equal(facturacionpasajeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Facturacionpasaje if not signed in', function (done) {
    // Set Facturacionpasaje user
    facturacionpasaje.user = user;

    // Create new Facturacionpasaje model instance
    var facturacionpasajeObj = new Facturacionpasaje(facturacionpasaje);

    // Save the Facturacionpasaje
    facturacionpasajeObj.save(function () {
      // Try deleting Facturacionpasaje
      request(app).delete('/api/facturacionpasajes/' + facturacionpasajeObj._id)
        .expect(403)
        .end(function (facturacionpasajeDeleteErr, facturacionpasajeDeleteRes) {
          // Set message assertion
          (facturacionpasajeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Facturacionpasaje error error
          done(facturacionpasajeDeleteErr);
        });

    });
  });

  it('should be able to get a single Facturacionpasaje that has an orphaned user reference', function (done) {
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

          // Save a new Facturacionpasaje
          agent.post('/api/facturacionpasajes')
            .send(facturacionpasaje)
            .expect(200)
            .end(function (facturacionpasajeSaveErr, facturacionpasajeSaveRes) {
              // Handle Facturacionpasaje save error
              if (facturacionpasajeSaveErr) {
                return done(facturacionpasajeSaveErr);
              }

              // Set assertions on new Facturacionpasaje
              (facturacionpasajeSaveRes.body.name).should.equal(facturacionpasaje.name);
              should.exist(facturacionpasajeSaveRes.body.user);
              should.equal(facturacionpasajeSaveRes.body.user._id, orphanId);

              // force the Facturacionpasaje to have an orphaned user reference
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

                    // Get the Facturacionpasaje
                    agent.get('/api/facturacionpasajes/' + facturacionpasajeSaveRes.body._id)
                      .expect(200)
                      .end(function (facturacionpasajeInfoErr, facturacionpasajeInfoRes) {
                        // Handle Facturacionpasaje error
                        if (facturacionpasajeInfoErr) {
                          return done(facturacionpasajeInfoErr);
                        }

                        // Set assertions
                        (facturacionpasajeInfoRes.body._id).should.equal(facturacionpasajeSaveRes.body._id);
                        (facturacionpasajeInfoRes.body.name).should.equal(facturacionpasaje.name);
                        should.equal(facturacionpasajeInfoRes.body.user, undefined);

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
      Facturacionpasaje.remove().exec(done);
    });
  });
});
