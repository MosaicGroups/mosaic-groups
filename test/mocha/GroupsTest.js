let request = require('supertest');
let session = require('supertest-session');
let expect = require('expect.js');
let app = require('./common').app;
//var app = require('./common').app;

let groupService = require('../../server/services/groupsService');
let Group = require('mongoose').model('Group');
let semesterService = require('../../server/services/semesterService');

describe('Groups Manipulation', function () {

    it('Should add a new semester', function (done) {
        semesterService.addSemester('DummySemester')
            .then(semester => {
                expect(semester.name).to.be('DummySemester');
                done();
            })
            .catch(err => {
                throw err;
            });

    });

    let groups = [];
    let group = {
        title: 'testG',
        memberLimit: 15,
        location: 'my house',
        dayOfTheWeek: 'Mon',
        meetingTime: '6 AM',
        audienceType: 'zombies',
        description: 'test description',
    };
    it('Should add a new group', function (done) {
        groupService.saveGroup(group).then(g => {
            expect(g.title).to.equal('testG');
            groups.push(g);
            done();
        }).catch(err => {
            throw err;
        });

    });
    it('Should add a second new group', function (done) {
        group.title = 'test2';
        groupService.saveGroup(group)
            .then(g => {
                expect(g.title).to.equal('test2');
                groups.push(g);
                done();
            }).catch(err => {
                throw err;
            });

    });
    it('Should contain two groups', function (done) {
        request(app)
            .get('/api/groups/')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                expect(res.body.length).to.equal(2);
                done();
            });
    });
    it('Should not add a new group', function (done) {
        group.title = undefined;
        groupService.saveGroup(group)
            .then(g => {
                expect(g).to.be(undefined);
                done();
            }).catch(err => {
                expect(err.name).to.be('ValidationError');
                done();
            });

    });
    var studentMember = {
        firstName: 'Little Bobby',
        lastName: 'Jones',
        email: 'lilbobby@isp.test',
        phone: '1112223333',
        status: 'PENDING',
        joinDate: new Date(),
        emergency_contact: {
            firstName: 'Concerned',
            lastName: 'Parent',
            email: 'helicopter@parent.com',
            phone: '5556667777',
        }
    };

    it('Should add a group with emergency contact', function (done) {
        group.title = 'sGroup'; //Fix from previous test that breaks group
        group.members = [studentMember];
        Group.create(group, function (err, g) {
            if (err) throw err;
            expect(g.members[0].emergency_contact.firstName).to.equal('Concerned');
            done();
        });
    });

    it('Should not add broken contact', function (done) {
        group.members[0].firstName = undefined;
        Group.create(group, function (err, g) {
            expect(err.name).to.be('ValidationError');
            done();
        });
    });

    it('Should archive groups when a new semester is added', function (done) {
        semesterService.addSemester('DummySemester2')
            .then(semester => {
                expect(semester.name).to.be('DummySemester2');

                request(app)
                    .get('/api/groups/')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) throw err;
                        expect(res.body.length).to.equal(0);
                        done();
                    });
            })
            .catch(err => {
                throw err;
            });

    });



});
describe('Anthenticated Group Member Manipulation', function () {

    let coupleGroup = {
        title: 'couplesgroup',
        memberLimit: 3,
        location: 'my house',
        dayOfTheWeek: 'Mon',
        meetingTime: '6 AM',
        audienceType: 'Couples',
        description: 'test description',
    };
    let group2 = Object.assign({}, coupleGroup, { title: 'group2' });
    let group3 = Object.assign({}, coupleGroup, { title: 'group3' });
    let member = {
        firstName: 'Little Bobby',
        lastName: 'Jones',
        email: 'lilbobby@isp.test2',
        phone: '1112223333',
    };


    before(function (done) {
        groupService.saveGroup(coupleGroup).then(group => {
            coupleGroup._id = group._id;
            return groupService.saveGroup(group2);
        })
            .then(group => {
                group2._id = group._id;
                return groupService.saveGroup(group3);
            })
            .then(group => {

                group3._id = group._id;
                done();
            });

    });


    it('Should add 2 members', function (done) {
        request(app)
            .post(`/api/groups/${coupleGroup._id}/add-member`)
            .send({ newMember: member, newMemberSpouse: member })
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;

                expect(res.body.success).to.equal(true);
                done();
            });
    });

    it('should fail if same emails signs up for more than 2 groups', function (done) {
        request(app)
            .post(`/api/groups/${group2._id}/add-member`)
            .send({ newMember: member })
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                request(app)
                    .post(`/api/groups/${group3._id}/add-member`)
                    .send({ newMember: member })
                    .expect(400)
                    .end(function (err, res) {
                        if (err) throw err;
                        expect(res.body.success).to.equal(undefined);
                        done();

                    });
            });
    });

});

describe('Anthenticated Group Manipulation', function () {
    let unauthSession, authSession;
    beforeEach(function () {
        unauthSession = session(app);
    });

    it('Unauthenticated user cannot delete a group', function (done) {
        unauthSession
            .get('/api/groups/')
            .expect(200)
            .end(function (err, res) {

                unauthSession
                    .delete(`/api/groups/${res.body[1]._id}`)
                    .expect(403)
                    .end(function () {

                        done();
                    });
            });
    });

    it('User should authenticate', function (done) {
        unauthSession
            .post('/login/')
            .send({ username: 'pblair12@gmail.com', password: 'p' })
            .expect(200)
            .end(function (err, res) {
                expect(res.body.user.username).to.equal('pblair12@gmail.com');
                authSession = unauthSession;
                done();

            });
    });

    it('Authenticated user can delete a group', function (done) {

        authSession
            .get('/api/groups/')
            .expect(200)
            .end(function (err, res) {

                authSession
                    .delete(`/api/groups/${res.body[1]._id}`)
                    .expect(200)
                    .end(function (deleteErr, deleteRes) {
                        //console.log(deleteRes);
                        expect(deleteRes.statusCode).to.equal(200);

                        done();
                    });
            });
    });

    it('Authenticated user can update a group', function (done) {

        authSession
            .get('/api/groups/')
            .expect(200)
            .end(function (err, res) {

                authSession
                    .post(`/api/groups/${res.body[1]._id}`)
                    .send({ title: 'fooy' })
                    .expect(200)
                    .end(function (updateErr, updateRes) {
                        expect(updateRes.statusCode).to.equal(200);
                        expect(updateRes.body.title).to.equal('fooy');

                        done();
                    });
            });
    });

});
/*
var g1ID, g2ID, g3ID;

async.series([
    function (outercallback) {
        describe('Groups Model', function () {
            var group = {
                title: 'testG',
                memberLimit: 15,
                location: 'my house',
                dayOfTheWeek: 'Mon',
                meetingTime: '6 AM',
                audienceType: 'zombies',
                description: 'test description',
            };

            var studentMember = {
                firstName: 'Little Bobby',
                lastName: 'Jones',
                email: 'lilbobby@isp.test',
                phone: '1112223333',
                status: 'PENDING',
                joinDate: new Date(),
                emergency_contact: {
                    firstName: 'Concerned',
                    lastName: 'Parent',
                    email: 'helicopter@parent.com',
                    phone: '5556667777',
                }
            };

            it('Should add a new group', function (done) {
                Group.create(group, function (err, g) {
                    if (err) throw err;
                    expect(g.title).to.equal('testG');
                    g1ID = g._id;
                    done();
                });

            });

            it('Should not add a new group', function (done) {
                group.title = undefined;
                Group.create(group, function (err, g) {
                    expect(err.name).to.be('ValidationError');
                    expect(g).to.be(undefined)
                    done();
                });
            });

            it('Should contain 3 groups', function (done) {
                async.series([
                    function (callback2) {
                        group.title = 'testg2';

                        Group.create(group, function (err, g) {
                            if (err) throw err;
                            g2ID = g._id;
                            expect(g.title).to.equal('testg2');
                            callback2();
                        });
                    },
                    function (callback2) {
                        group.title = 'testg3';
                        groupService.saveGroup(group, function (err, g) {
                            if (err) throw err;
                            g3ID = g._id;
                            expect(g.title).to.equal('testg3');
                            callback2();
                        });
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

            it('Should Add a Group with Emergency Contact', function (done) {
                group.title = 'sGroup' //Fix from previous test that breaks group
                group.members = [studentMember]
                Group.create(group, function (err, g) {
                    if (err) throw err;
                    expect(g.members[0].emergency_contact.firstName).to.equal('Concerned');
                    done();
                });
            });

            it('Shouldn not add Broken Contact', function (done) {
                group.members[0].firstName = undefined;
                Group.create(group, function (err, g) {
                    expect(err.name).to.be('ValidationError');
                    done();
                });
            });

        });
        describe('Groups Routes', function () {
            var user = {};
            before(function (beforeCompleted) {

                user.firstName = 'test';
                user.lastName = 'user';
                user.email = 'user@user.com';
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

            it('Should contain one member', function (done) {
                request(app)
                    .get('/api/groups/' + g1ID)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) throw err;
                        done();
                    });
            });

            it('Should contain 0 members', function (done) {
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

*/