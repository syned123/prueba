'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Bus = mongoose.model('Bus'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  bus;

/**
 * Bus routes tests
 */
describe('Bus CRUD tests', function () {

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

    // Save a user to the test db and create new Bus
    user.save(function () {
      bus = {
        name: 'Bus name'
      };

      done();
    });
  });

  it('should be able to save a Bus if logged in', function (done) {
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

        // Save a new Bus
        agent.post('/api/buses')
          .send(bus)
          .expect(200)
          .end(function (busSaveErr, busSaveRes) {
            // Handle Bus save error
            if (busSaveErr) {
              return done(busSaveErr);
            }

            // Get a list of Buses
            agent.get('/api/buses')
              .end(function (busesGetErr, busesGetRes) {
                // Handle Buses save error
                if (busesGetErr) {
                  return done(busesGetErr);
                }

                // Get Buses list
                var buses = busesGetRes.body;

                // Set assertions
                (buses[0].user._id).should.equal(userId);
                (buses[0].name).should.match('Bus name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Bus if not logged in', function (done) {
    agent.post('/api/buses')
      .send(bus)
      .expect(403)
      .end(function (busSaveErr, busSaveRes) {
        // Call the assertion callback
        done(busSaveErr);
      });
  });

  it('should not be able to save an Bus if no name is provided', function (done) {
    // Invalidate name field
    bus.name = '';

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

        // Save a new Bus
        agent.post('/api/buses')
          .send(bus)
          .expect(400)
          .end(function (busSaveErr, busSaveRes) {
            // Set message assertion
            (busSaveRes.body.message).should.match('Please fill Bus name');

            // Handle Bus save error
            done(busSaveErr);
          });
      });
  });

  it('should be able to update an Bus if signed in', function (done) {
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

        // Save a new Bus
        agent.post('/api/buses')
          .send(bus)
          .expect(200)
          .end(function (busSaveErr, busSaveRes) {
            // Handle Bus save error
            if (busSaveErr) {
              return done(busSaveErr);
            }

            // Update Bus name
            bus.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Bus
            agent.put('/api/buses/' + busSaveRes.body._id)
              .send(bus)
              .expect(200)
              .end(function (busUpdateErr, busUpdateRes) {
                // Handle Bus update error
                if (busUpdateErr) {
                  return done(busUpdateErr);
                }

                // Set assertions
                (busUpdateRes.body._id).should.equal(busSaveRes.body._id);
                (busUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Buses if not signed in', function (done) {
    // Create new Bus model instance
    var busObj = new Bus(bus);

    // Save the bus
    busObj.save(function () {
      // Request Buses
      request(app).get('/api/buses')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Bus if not signed in', function (done) {
    // Create new Bus model instance
    var busObj = new Bus(bus);

    // Save the Bus
    busObj.save(function () {
      request(app).get('/api/buses/' + busObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', bus.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Bus with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/buses/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Bus is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Bus which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Bus
    request(app).get('/api/buses/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Bus with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Bus if signed in', function (done) {
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

        // Save a new Bus
        agent.post('/api/buses')
          .send(bus)
          .expect(200)
          .end(function (busSaveErr, busSaveRes) {
            // Handle Bus save error
            if (busSaveErr) {
              return done(busSaveErr);
            }

            // Delete an existing Bus
            agent.delete('/api/buses/' + busSaveRes.body._id)
              .send(bus)
              .expect(200)
              .end(function (busDeleteErr, busDeleteRes) {
                // Handle bus error error
                if (busDeleteErr) {
                  return done(busDeleteErr);
                }

                // Set assertions
                (busDeleteRes.body._id).should.equal(busSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Bus if not signed in', function (done) {
    // Set Bus user
    bus.user = user;

    // Create new Bus model instance
    var busObj = new Bus(bus);

    // Save the Bus
    busObj.save(function () {
      // Try deleting Bus
      request(app).delete('/api/buses/' + busObj._id)
        .expect(403)
        .end(function (busDeleteErr, busDeleteRes) {
          // Set message assertion
          (busDeleteRes.body.message).should.match('User is not authorized');

          // Handle Bus error error
          done(busDeleteErr);
        });

    });
  });

  it('should be able to get a single Bus that has an orphaned user reference', function (done) {
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

          // Save a new Bus
          agent.post('/api/buses')
            .send(bus)
            .expect(200)
            .end(function (busSaveErr, busSaveRes) {
              // Handle Bus save error
              if (busSaveErr) {
                return done(busSaveErr);
              }

              // Set assertions on new Bus
              (busSaveRes.body.name).should.equal(bus.name);
              should.exist(busSaveRes.body.user);
              should.equal(busSaveRes.body.user._id, orphanId);

              // force the Bus to have an orphaned user reference
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

                    // Get the Bus
                    agent.get('/api/buses/' + busSaveRes.body._id)
                      .expect(200)
                      .end(function (busInfoErr, busInfoRes) {
                        // Handle Bus error
                        if (busInfoErr) {
                          return done(busInfoErr);
                        }

                        // Set assertions
                        (busInfoRes.body._id).should.equal(busSaveRes.body._id);
                        (busInfoRes.body.name).should.equal(bus.name);
                        should.equal(busInfoRes.body.user, undefined);

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
      Bus.remove().exec(done);
    });
  });
});
