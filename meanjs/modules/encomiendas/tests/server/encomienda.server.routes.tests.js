'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Encomienda = mongoose.model('Encomienda'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  encomienda;

/**
 * Encomienda routes tests
 */
describe('Encomienda CRUD tests', function () {

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

    // Save a user to the test db and create new Encomienda
    user.save(function () {
      encomienda = {
        name: 'Encomienda name'
      };

      done();
    });
  });

  it('should be able to save a Encomienda if logged in', function (done) {
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

        // Save a new Encomienda
        agent.post('/api/encomiendas')
          .send(encomienda)
          .expect(200)
          .end(function (encomiendaSaveErr, encomiendaSaveRes) {
            // Handle Encomienda save error
            if (encomiendaSaveErr) {
              return done(encomiendaSaveErr);
            }

            // Get a list of Encomiendas
            agent.get('/api/encomiendas')
              .end(function (encomiendasGetErr, encomiendasGetRes) {
                // Handle Encomiendas save error
                if (encomiendasGetErr) {
                  return done(encomiendasGetErr);
                }

                // Get Encomiendas list
                var encomiendas = encomiendasGetRes.body;

                // Set assertions
                (encomiendas[0].user._id).should.equal(userId);
                (encomiendas[0].name).should.match('Encomienda name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Encomienda if not logged in', function (done) {
    agent.post('/api/encomiendas')
      .send(encomienda)
      .expect(403)
      .end(function (encomiendaSaveErr, encomiendaSaveRes) {
        // Call the assertion callback
        done(encomiendaSaveErr);
      });
  });

  it('should not be able to save an Encomienda if no name is provided', function (done) {
    // Invalidate name field
    encomienda.name = '';

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

        // Save a new Encomienda
        agent.post('/api/encomiendas')
          .send(encomienda)
          .expect(400)
          .end(function (encomiendaSaveErr, encomiendaSaveRes) {
            // Set message assertion
            (encomiendaSaveRes.body.message).should.match('Please fill Encomienda name');

            // Handle Encomienda save error
            done(encomiendaSaveErr);
          });
      });
  });

  it('should be able to update an Encomienda if signed in', function (done) {
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

        // Save a new Encomienda
        agent.post('/api/encomiendas')
          .send(encomienda)
          .expect(200)
          .end(function (encomiendaSaveErr, encomiendaSaveRes) {
            // Handle Encomienda save error
            if (encomiendaSaveErr) {
              return done(encomiendaSaveErr);
            }

            // Update Encomienda name
            encomienda.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Encomienda
            agent.put('/api/encomiendas/' + encomiendaSaveRes.body._id)
              .send(encomienda)
              .expect(200)
              .end(function (encomiendaUpdateErr, encomiendaUpdateRes) {
                // Handle Encomienda update error
                if (encomiendaUpdateErr) {
                  return done(encomiendaUpdateErr);
                }

                // Set assertions
                (encomiendaUpdateRes.body._id).should.equal(encomiendaSaveRes.body._id);
                (encomiendaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Encomiendas if not signed in', function (done) {
    // Create new Encomienda model instance
    var encomiendaObj = new Encomienda(encomienda);

    // Save the encomienda
    encomiendaObj.save(function () {
      // Request Encomiendas
      request(app).get('/api/encomiendas')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Encomienda if not signed in', function (done) {
    // Create new Encomienda model instance
    var encomiendaObj = new Encomienda(encomienda);

    // Save the Encomienda
    encomiendaObj.save(function () {
      request(app).get('/api/encomiendas/' + encomiendaObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', encomienda.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Encomienda with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/encomiendas/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Encomienda is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Encomienda which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Encomienda
    request(app).get('/api/encomiendas/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Encomienda with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Encomienda if signed in', function (done) {
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

        // Save a new Encomienda
        agent.post('/api/encomiendas')
          .send(encomienda)
          .expect(200)
          .end(function (encomiendaSaveErr, encomiendaSaveRes) {
            // Handle Encomienda save error
            if (encomiendaSaveErr) {
              return done(encomiendaSaveErr);
            }

            // Delete an existing Encomienda
            agent.delete('/api/encomiendas/' + encomiendaSaveRes.body._id)
              .send(encomienda)
              .expect(200)
              .end(function (encomiendaDeleteErr, encomiendaDeleteRes) {
                // Handle encomienda error error
                if (encomiendaDeleteErr) {
                  return done(encomiendaDeleteErr);
                }

                // Set assertions
                (encomiendaDeleteRes.body._id).should.equal(encomiendaSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Encomienda if not signed in', function (done) {
    // Set Encomienda user
    encomienda.user = user;

    // Create new Encomienda model instance
    var encomiendaObj = new Encomienda(encomienda);

    // Save the Encomienda
    encomiendaObj.save(function () {
      // Try deleting Encomienda
      request(app).delete('/api/encomiendas/' + encomiendaObj._id)
        .expect(403)
        .end(function (encomiendaDeleteErr, encomiendaDeleteRes) {
          // Set message assertion
          (encomiendaDeleteRes.body.message).should.match('User is not authorized');

          // Handle Encomienda error error
          done(encomiendaDeleteErr);
        });

    });
  });

  it('should be able to get a single Encomienda that has an orphaned user reference', function (done) {
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

          // Save a new Encomienda
          agent.post('/api/encomiendas')
            .send(encomienda)
            .expect(200)
            .end(function (encomiendaSaveErr, encomiendaSaveRes) {
              // Handle Encomienda save error
              if (encomiendaSaveErr) {
                return done(encomiendaSaveErr);
              }

              // Set assertions on new Encomienda
              (encomiendaSaveRes.body.name).should.equal(encomienda.name);
              should.exist(encomiendaSaveRes.body.user);
              should.equal(encomiendaSaveRes.body.user._id, orphanId);

              // force the Encomienda to have an orphaned user reference
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

                    // Get the Encomienda
                    agent.get('/api/encomiendas/' + encomiendaSaveRes.body._id)
                      .expect(200)
                      .end(function (encomiendaInfoErr, encomiendaInfoRes) {
                        // Handle Encomienda error
                        if (encomiendaInfoErr) {
                          return done(encomiendaInfoErr);
                        }

                        // Set assertions
                        (encomiendaInfoRes.body._id).should.equal(encomiendaSaveRes.body._id);
                        (encomiendaInfoRes.body.name).should.equal(encomienda.name);
                        should.equal(encomiendaInfoRes.body.user, undefined);

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
      Encomienda.remove().exec(done);
    });
  });
});
