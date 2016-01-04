var expect = require('expect.js');
require('./common');

var User = require('mongoose').model('User');

describe("User Model", function () {
    var user = {};
    user.firstName = "test";
    user.lastName = "user";
    user.username = "user@user.com";
    user.salt = "1";
    user.hashed_pwd = "1";
    it("Should create a valid User", function (done) {

        User.create(user, function (err, u) {
            if (err) {
                console.log(err);
            }
            else {
                expect(u.firstName).to.equal("test");
            }

            done(err);

        });
    });

    it("Should fail on missing first name", function (done) {
        user.firstName = null;
        User.create(user, function (err, p) {

            expect(p).to.be(undefined);
            done();
        });
    });
});