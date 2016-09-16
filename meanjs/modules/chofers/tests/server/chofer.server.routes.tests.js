'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Chofer = mongoose.model('Chofer'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  chofer;

/**
 * Chofer routes tests
 */
describe('Chofer CRUD tests', function () {

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

    // Save a user to the test db and create new Chofer
    user.save(function () {
      chofer = {
        name: 'Chofer name'
      };

      done();
    });
  });

  it('should be able to save a Chofer if logged in', function (done) {
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

        // Save a new Chofer
        agent.post('/api/chofers')
          .send(chofer)
          .expect(200)
          .end(function (choferSaveErr, choferSaveRes) {
            // Handle Chofer save error
            if (choferSaveErr) {
              return done(choferSaveErr);
            }

            // Get a list of Chofers
            agent.get('/api/chofers')
              .end(function (chofersGetErr, chofersGetRes) {
                // Handle Chofers save error
                if (chofersGetErr) {
                  return done(chofersGetErr);
                }

                // Get Chofers list
                var chofers = chofersGetRes.body;

                // Set assertions
                (chofers[0].user._id).should.equal(userId);
                (chofers[0].name).should.match('Chofer name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Chofer if not logged in', function (done) {
    agent.post('/api/chofers')
      .send(chofer)
      .expect(403)
      .end(function (choferSaveErr, choferSaveRes) {
        // Call the assertion callback
        done(choferSaveErr);
      });
  });

  it('should not be able to save an Chofer if no name is provided', function (done) {
    // Invalidate name field
    chofer.name = '';

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

        // Save a new Chofer
        agent.post('/api/chofers')
          .send(chofer)
          .expect(400)
          .end(function (choferSaveErr, choferSaveRes) {
            // Set message assertion
            (choferSaveRes.body.message).should.match('Please fill Chofer name');

            // Handle Chofer save error
            done(choferSaveErr);
          });
      });
  });

  it('should be able to update an Chofer if signed in', function (done) {
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

        // Save a new Chofer
        agent.post('/api/chofers')
          .send(chofer)
          .expect(200)
          .end(function (choferSaveErr, choferSaveRes) {
            // Handle Chofer save error
            if (choferSaveErr) {
              return done(choferSaveErr);
            }

            // Update Chofer name
            chofer.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Chofer
            agent.put('/api/chofers/' + choferSaveRes.body._id)
              .send(chofer)
              .expect(200)
              .end(function (choferUpdateErr, choferUpdateRes) {
                // Handle Chofer update error
                if (choferUpdateErr) {
                  return done(choferUpdateErr);
                }

                // Set assertions
                (choferUpdateRes.body._id).should.equal(choferSaveRes.body._id);
                (choferUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Chofers if not signed in', function (done) {
    // Create new Chofer model instance
    var choferObj = new Chofer(chofer);

    // Save the chofer
    choferObj.save(function () {
      // Request Chofers
      request(app).get('/api/chofers')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Chofer if not signed in', function (done) {
    // Create new Chofer model instance
    var choferObj = new Chofer(chofer);

    // Save the Chofer
    choferObj.save(function () {
      request(app).get('/api/chofers/' + choferObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', chofer.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Chofer with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/chofers/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Chofer is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Chofer which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Chofer
    request(app).get('/api/chofers/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Chofer with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Chofer if signed in', function (done) {
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

        // Save a new Chofer
        agent.post('/api/chofers')
          .send(chofer)
          .expect(200)
          .end(function (choferSaveErr, choferSaveRes) {
            // Handle Chofer save error
            if (choferSaveErr) {
              return done(choferSaveErr);
            }

            // Delete an existing Chofer
            agent.delete('/api/chofers/' + choferSaveRes.body._id)
              .send(chofer)
              .expect(200)
              .end(function (choferDeleteErr, choferDeleteRes) {
                // Handle chofer error error
                if (choferDeleteErr) {
                  return done(choferDeleteErr);
                }

                // Set assertions
                (choferDeleteRes.body._id).should.equal(choferSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Chofer if not signed in', function (done) {
    // Set Chofer user
    chofer.user = user;

    // Create new Chofer model instance
    var choferObj = new Chofer(chofer);

    // Save the Chofer
    choferObj.save(function () {
      // Try deleting Chofer
      request(app).delete('/api/chofers/' + choferObj._id)
        .expect(403)
        .end(function (choferDeleteErr, choferDeleteRes) {
          // Set message assertion
          (choferDeleteRes.body.message).should.match('User is not authorized');

          // Handle Chofer error error
          done(choferDeleteErr);
        });

    });
  });

  it('should be able to get a single Chofer that has an orphaned user reference', function (done) {
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

          // Save a new Chofer
          agent.post('/api/chofers')
            .send(chofer)
            .expect(200)
            .end(function (choferSaveErr, choferSaveRes) {
              // Handle Chofer save error
              if (choferSaveErr) {
                return done(choferSaveErr);
              }

              // Set assertions on new Chofer
              (choferSaveRes.body.name).should.equal(chofer.name);
              should.exist(choferSaveRes.body.user);
              should.equal(choferSaveRes.body.user._id, orphanId);

              // force the Chofer to have an orphaned user reference
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

                    // Get the Chofer
                    agent.get('/api/chofers/' + choferSaveRes.body._id)
                      .expect(200)
                      .end(function (choferInfoErr, choferInfoRes) {
                        // Handle Chofer error
                        if (choferInfoErr) {
                          return done(choferInfoErr);
                        }

                        // Set assertions
                        (choferInfoRes.body._id).should.equal(choferSaveRes.body._id);
                        (choferInfoRes.body.name).should.equal(chofer.name);
                        should.equal(choferInfoRes.body.user, undefined);

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
      Chofer.remove().exec(done);
    });
  });
});
