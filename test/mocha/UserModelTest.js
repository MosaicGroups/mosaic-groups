var expect = require('expect.js');
require('./common');

var User = require('mongoose').model('User');

describe('User Model', () => {
    let user = {
        'firstName': 'test',
        'lastName': 'user',
        'phone': '1238675309',
        'preferContactVia': 'phone',
        'salt': '1',
        'hashed_pwd' :1
    };
    
    it('Should fail on missing first name', () => {
        let noFirstName = Object.assign({},user);
        noFirstName.username = 'nofirst@email.com';
        delete noFirstName.firstName;
        
        return User.create(noFirstName)
        .then(
            () => { expect().fail('User Should not Exist');},
            (err) => { expect(err.name).to.be('ValidationError');}
        );  
    });
    
    it('Should fail on missing username', () => {
        let noUsername = Object.assign({},user);
        delete noUsername.username;
        
        return User.create(noUsername)
        .then(
            () => { expect().fail('User Should not Exist');},
            (err) => { expect(err.name).to.be('ValidationError');}
        );  
    });
    
    it('Should create a valid user', () => {
        user.username = 'validuser@email.com';
        return User.create(user)
        .then(
            (newUser) => { expect(newUser.username).to.be(user.username);},
            (err) => { expect().fail(err); }
        );      
    });
});