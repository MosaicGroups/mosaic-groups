var request = require('supertest')
var async = require('async');
var expect = require('expect.js');
require('./common');
var app = require('./common').app;

var groupService = require('../../server/services/groupsService');
var Group = require('mongoose').model('Group');

var g1ID, g2ID, g3ID;

async.series([
    function (outercallback) {
        describe("Groups Model", function () {
            var group = {
                title: "testG",
                memberLimit: 15,
                location: "my house",
                dayOfTheWeek: "Mon",
                meetingTime: "6 AM",
                audienceType: "zombies",
                description: "test description",

            }
            it("Should add a new group", function (done) {
                Group.create(group, function (err, g) {
                    if (err) throw err;
                    expect(g.title).to.equal("testG");
                    g1ID = g._id;
                    done();
                });

            });

            it("Should not add a new group", function (done) {
                group.title = undefined;
                Group.create(group, function (err, g) {
                    expect(err.name).to.be("ValidationError");
                    expect(g).to.be(undefined)
                    done();
                });
            });

            it("Should contain 3 groups", function (done) {
                async.series([
                    function (callback2) {
                        group.title = "testg2";

                        Group.create(group, function (err, g) {
                            if (err) throw err;
                            g2ID = g._id;
                            expect(g.title).to.equal("testg2");
                            callback2();
                        });
                    },
                    function (callback2) {
                        group.title = "testg3";
                        groupService.saveGroup(group, function (err, g) {
                            if (err) throw err;
                            g3ID = g._id;
                            expect(g.title).to.equal("testg3");
                            callback2();
                        })
                    },
                    function (callback2) {
                        request(app)
                            .get('/api/groups/')
                            .expect(200)
                            .end(function (err, res) {
                                if (err) throw err;
                                expect(res.body.length).to.equal(3);
                                callback2();
                            });
                    }
                ], function (err, results) {
                    if (err) throw err;
                    done();
                    outercallback();
                });

            });
        });
        describe("Groups Routes", function () {
            var user = {};
            before(function (beforeCompleted) {

                user.firstName = "test";
                user.lastName = "user";
                user.email = "user@user.com";
                async.series([
                    function (callback2) {
                        request(app)
                            .post('/api/groups/' + g1ID + '/add-member')
                            .send({ newMember: user })
                            .expect(200)
                            .end(function (err, res) {
                                if (err) throw err;
                                callback2();
                            });

                    },
                    function (callback2) {
                        request(app)
                            .post('/api/groups/' + g2ID + '/add-member')
                            .send({ newMember: user })
                            .expect(200)
                            .end(function (err, res) {
                                if (err) throw err;
                                callback2();
                            });

                    },
                    function (callback2) {
                        request(app)
                            .post('/api/groups/' + g3ID + '/add-member')
                            .send({ newMember: user })
                            .expect(200)
                            .end(function (err, res) {
                                expect(err).to.not.be(undefined);
                                //if (err) throw err;
                                callback2();
                            });

                    }
                ], function () {
                    beforeCompleted();
                });
            });

            it("Should contain one member", function (done) {
                request(app)
                    .get('/api/groups/' + g1ID)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) throw err;
                        done();
                    });
            });

            it("Should contain 0 members", function (done) {
                request(app)
                    .get('/api/groups/' + g3ID)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) throw err;
                        expect(res.body.members.length).to.equal(0);
                        done(err);
                    });
            });
        });
    }
]);

