'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Reporte = mongoose.model('Reporte'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  reporte;

/**
 * Reporte routes tests
 */
describe('Reporte CRUD tests', function () {

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

    // Save a user to the test db and create new Reporte
    user.save(function () {
      reporte = {
        name: 'Reporte name'
      };

      done();
    });
  });

  it('should be able to save a Reporte if logged in', function (done) {
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

        // Save a new Reporte
        agent.post('/api/reportes')
          .send(reporte)
          .expect(200)
          .end(function (reporteSaveErr, reporteSaveRes) {
            // Handle Reporte save error
            if (reporteSaveErr) {
              return done(reporteSaveErr);
            }

            // Get a list of Reportes
            agent.get('/api/reportes')
              .end(function (reportesGetErr, reportesGetRes) {
                // Handle Reportes save error
                if (reportesGetErr) {
                  return done(reportesGetErr);
                }

                // Get Reportes list
                var reportes = reportesGetRes.body;

                // Set assertions
                (reportes[0].user._id).should.equal(userId);
                (reportes[0].name).should.match('Reporte name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Reporte if not logged in', function (done) {
    agent.post('/api/reportes')
      .send(reporte)
      .expect(403)
      .end(function (reporteSaveErr, reporteSaveRes) {
        // Call the assertion callback
        done(reporteSaveErr);
      });
  });

  it('should not be able to save an Reporte if no name is provided', function (done) {
    // Invalidate name field
    reporte.name = '';

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

        // Save a new Reporte
        agent.post('/api/reportes')
          .send(reporte)
          .expect(400)
          .end(function (reporteSaveErr, reporteSaveRes) {
            // Set message assertion
            (reporteSaveRes.body.message).should.match('Please fill Reporte name');

            // Handle Reporte save error
            done(reporteSaveErr);
          });
      });
  });

  it('should be able to update an Reporte if signed in', function (done) {
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

        // Save a new Reporte
        agent.post('/api/reportes')
          .send(reporte)
          .expect(200)
          .end(function (reporteSaveErr, reporteSaveRes) {
            // Handle Reporte save error
            if (reporteSaveErr) {
              return done(reporteSaveErr);
            }

            // Update Reporte name
            reporte.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Reporte
            agent.put('/api/reportes/' + reporteSaveRes.body._id)
              .send(reporte)
              .expect(200)
              .end(function (reporteUpdateErr, reporteUpdateRes) {
                // Handle Reporte update error
                if (reporteUpdateErr) {
                  return done(reporteUpdateErr);
                }

                // Set assertions
                (reporteUpdateRes.body._id).should.equal(reporteSaveRes.body._id);
                (reporteUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Reportes if not signed in', function (done) {
    // Create new Reporte model instance
    var reporteObj = new Reporte(reporte);

    // Save the reporte
    reporteObj.save(function () {
      // Request Reportes
      request(app).get('/api/reportes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Reporte if not signed in', function (done) {
    // Create new Reporte model instance
    var reporteObj = new Reporte(reporte);

    // Save the Reporte
    reporteObj.save(function () {
      request(app).get('/api/reportes/' + reporteObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', reporte.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Reporte with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/reportes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Reporte is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Reporte which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Reporte
    request(app).get('/api/reportes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Reporte with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Reporte if signed in', function (done) {
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

        // Save a new Reporte
        agent.post('/api/reportes')
          .send(reporte)
          .expect(200)
          .end(function (reporteSaveErr, reporteSaveRes) {
            // Handle Reporte save error
            if (reporteSaveErr) {
              return done(reporteSaveErr);
            }

            // Delete an existing Reporte
            agent.delete('/api/reportes/' + reporteSaveRes.body._id)
              .send(reporte)
              .expect(200)
              .end(function (reporteDeleteErr, reporteDeleteRes) {
                // Handle reporte error error
                if (reporteDeleteErr) {
                  return done(reporteDeleteErr);
                }

                // Set assertions
                (reporteDeleteRes.body._id).should.equal(reporteSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Reporte if not signed in', function (done) {
    // Set Reporte user
    reporte.user = user;

    // Create new Reporte model instance
    var reporteObj = new Reporte(reporte);

    // Save the Reporte
    reporteObj.save(function () {
      // Try deleting Reporte
      request(app).delete('/api/reportes/' + reporteObj._id)
        .expect(403)
        .end(function (reporteDeleteErr, reporteDeleteRes) {
          // Set message assertion
          (reporteDeleteRes.body.message).should.match('User is not authorized');

          // Handle Reporte error error
          done(reporteDeleteErr);
        });

    });
  });

  it('should be able to get a single Reporte that has an orphaned user reference', function (done) {
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

          // Save a new Reporte
          agent.post('/api/reportes')
            .send(reporte)
            .expect(200)
            .end(function (reporteSaveErr, reporteSaveRes) {
              // Handle Reporte save error
              if (reporteSaveErr) {
                return done(reporteSaveErr);
              }

              // Set assertions on new Reporte
              (reporteSaveRes.body.name).should.equal(reporte.name);
              should.exist(reporteSaveRes.body.user);
              should.equal(reporteSaveRes.body.user._id, orphanId);

              // force the Reporte to have an orphaned user reference
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

                    // Get the Reporte
                    agent.get('/api/reportes/' + reporteSaveRes.body._id)
                      .expect(200)
                      .end(function (reporteInfoErr, reporteInfoRes) {
                        // Handle Reporte error
                        if (reporteInfoErr) {
                          return done(reporteInfoErr);
                        }

                        // Set assertions
                        (reporteInfoRes.body._id).should.equal(reporteSaveRes.body._id);
                        (reporteInfoRes.body.name).should.equal(reporte.name);
                        should.equal(reporteInfoRes.body.user, undefined);

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
      Reporte.remove().exec(done);
    });
  });
});
