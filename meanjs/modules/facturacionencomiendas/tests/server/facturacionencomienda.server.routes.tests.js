'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Facturacionencomienda = mongoose.model('Facturacionencomienda'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  facturacionencomienda;

/**
 * Facturacionencomienda routes tests
 */
describe('Facturacionencomienda CRUD tests', function () {

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

    // Save a user to the test db and create new Facturacionencomienda
    user.save(function () {
      facturacionencomienda = {
        name: 'Facturacionencomienda name'
      };

      done();
    });
  });

  it('should be able to save a Facturacionencomienda if logged in', function (done) {
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

        // Save a new Facturacionencomienda
        agent.post('/api/facturacionencomiendas')
          .send(facturacionencomienda)
          .expect(200)
          .end(function (facturacionencomiendaSaveErr, facturacionencomiendaSaveRes) {
            // Handle Facturacionencomienda save error
            if (facturacionencomiendaSaveErr) {
              return done(facturacionencomiendaSaveErr);
            }

            // Get a list of Facturacionencomiendas
            agent.get('/api/facturacionencomiendas')
              .end(function (facturacionencomiendasGetErr, facturacionencomiendasGetRes) {
                // Handle Facturacionencomiendas save error
                if (facturacionencomiendasGetErr) {
                  return done(facturacionencomiendasGetErr);
                }

                // Get Facturacionencomiendas list
                var facturacionencomiendas = facturacionencomiendasGetRes.body;

                // Set assertions
                (facturacionencomiendas[0].user._id).should.equal(userId);
                (facturacionencomiendas[0].name).should.match('Facturacionencomienda name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Facturacionencomienda if not logged in', function (done) {
    agent.post('/api/facturacionencomiendas')
      .send(facturacionencomienda)
      .expect(403)
      .end(function (facturacionencomiendaSaveErr, facturacionencomiendaSaveRes) {
        // Call the assertion callback
        done(facturacionencomiendaSaveErr);
      });
  });

  it('should not be able to save an Facturacionencomienda if no name is provided', function (done) {
    // Invalidate name field
    facturacionencomienda.name = '';

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

        // Save a new Facturacionencomienda
        agent.post('/api/facturacionencomiendas')
          .send(facturacionencomienda)
          .expect(400)
          .end(function (facturacionencomiendaSaveErr, facturacionencomiendaSaveRes) {
            // Set message assertion
            (facturacionencomiendaSaveRes.body.message).should.match('Please fill Facturacionencomienda name');

            // Handle Facturacionencomienda save error
            done(facturacionencomiendaSaveErr);
          });
      });
  });

  it('should be able to update an Facturacionencomienda if signed in', function (done) {
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

        // Save a new Facturacionencomienda
        agent.post('/api/facturacionencomiendas')
          .send(facturacionencomienda)
          .expect(200)
          .end(function (facturacionencomiendaSaveErr, facturacionencomiendaSaveRes) {
            // Handle Facturacionencomienda save error
            if (facturacionencomiendaSaveErr) {
              return done(facturacionencomiendaSaveErr);
            }

            // Update Facturacionencomienda name
            facturacionencomienda.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Facturacionencomienda
            agent.put('/api/facturacionencomiendas/' + facturacionencomiendaSaveRes.body._id)
              .send(facturacionencomienda)
              .expect(200)
              .end(function (facturacionencomiendaUpdateErr, facturacionencomiendaUpdateRes) {
                // Handle Facturacionencomienda update error
                if (facturacionencomiendaUpdateErr) {
                  return done(facturacionencomiendaUpdateErr);
                }

                // Set assertions
                (facturacionencomiendaUpdateRes.body._id).should.equal(facturacionencomiendaSaveRes.body._id);
                (facturacionencomiendaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Facturacionencomiendas if not signed in', function (done) {
    // Create new Facturacionencomienda model instance
    var facturacionencomiendaObj = new Facturacionencomienda(facturacionencomienda);

    // Save the facturacionencomienda
    facturacionencomiendaObj.save(function () {
      // Request Facturacionencomiendas
      request(app).get('/api/facturacionencomiendas')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Facturacionencomienda if not signed in', function (done) {
    // Create new Facturacionencomienda model instance
    var facturacionencomiendaObj = new Facturacionencomienda(facturacionencomienda);

    // Save the Facturacionencomienda
    facturacionencomiendaObj.save(function () {
      request(app).get('/api/facturacionencomiendas/' + facturacionencomiendaObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', facturacionencomienda.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Facturacionencomienda with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/facturacionencomiendas/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Facturacionencomienda is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Facturacionencomienda which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Facturacionencomienda
    request(app).get('/api/facturacionencomiendas/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Facturacionencomienda with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Facturacionencomienda if signed in', function (done) {
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

        // Save a new Facturacionencomienda
        agent.post('/api/facturacionencomiendas')
          .send(facturacionencomienda)
          .expect(200)
          .end(function (facturacionencomiendaSaveErr, facturacionencomiendaSaveRes) {
            // Handle Facturacionencomienda save error
            if (facturacionencomiendaSaveErr) {
              return done(facturacionencomiendaSaveErr);
            }

            // Delete an existing Facturacionencomienda
            agent.delete('/api/facturacionencomiendas/' + facturacionencomiendaSaveRes.body._id)
              .send(facturacionencomienda)
              .expect(200)
              .end(function (facturacionencomiendaDeleteErr, facturacionencomiendaDeleteRes) {
                // Handle facturacionencomienda error error
                if (facturacionencomiendaDeleteErr) {
                  return done(facturacionencomiendaDeleteErr);
                }

                // Set assertions
                (facturacionencomiendaDeleteRes.body._id).should.equal(facturacionencomiendaSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Facturacionencomienda if not signed in', function (done) {
    // Set Facturacionencomienda user
    facturacionencomienda.user = user;

    // Create new Facturacionencomienda model instance
    var facturacionencomiendaObj = new Facturacionencomienda(facturacionencomienda);

    // Save the Facturacionencomienda
    facturacionencomiendaObj.save(function () {
      // Try deleting Facturacionencomienda
      request(app).delete('/api/facturacionencomiendas/' + facturacionencomiendaObj._id)
        .expect(403)
        .end(function (facturacionencomiendaDeleteErr, facturacionencomiendaDeleteRes) {
          // Set message assertion
          (facturacionencomiendaDeleteRes.body.message).should.match('User is not authorized');

          // Handle Facturacionencomienda error error
          done(facturacionencomiendaDeleteErr);
        });

    });
  });

  it('should be able to get a single Facturacionencomienda that has an orphaned user reference', function (done) {
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

          // Save a new Facturacionencomienda
          agent.post('/api/facturacionencomiendas')
            .send(facturacionencomienda)
            .expect(200)
            .end(function (facturacionencomiendaSaveErr, facturacionencomiendaSaveRes) {
              // Handle Facturacionencomienda save error
              if (facturacionencomiendaSaveErr) {
                return done(facturacionencomiendaSaveErr);
              }

              // Set assertions on new Facturacionencomienda
              (facturacionencomiendaSaveRes.body.name).should.equal(facturacionencomienda.name);
              should.exist(facturacionencomiendaSaveRes.body.user);
              should.equal(facturacionencomiendaSaveRes.body.user._id, orphanId);

              // force the Facturacionencomienda to have an orphaned user reference
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

                    // Get the Facturacionencomienda
                    agent.get('/api/facturacionencomiendas/' + facturacionencomiendaSaveRes.body._id)
                      .expect(200)
                      .end(function (facturacionencomiendaInfoErr, facturacionencomiendaInfoRes) {
                        // Handle Facturacionencomienda error
                        if (facturacionencomiendaInfoErr) {
                          return done(facturacionencomiendaInfoErr);
                        }

                        // Set assertions
                        (facturacionencomiendaInfoRes.body._id).should.equal(facturacionencomiendaSaveRes.body._id);
                        (facturacionencomiendaInfoRes.body.name).should.equal(facturacionencomienda.name);
                        should.equal(facturacionencomiendaInfoRes.body.user, undefined);

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
      Facturacionencomienda.remove().exec(done);
    });
  });
});
