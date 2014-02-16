describe('User', function() {
  beforeEach(module('app'));

  describe('isAdmin', function() {
    it('should return false if the roles array does not have an admin entry', inject(function(User) {
      var user = new User();
      user.roles = ['not admin'];
      expect(user.isAdmin()).to.be.falsey;
    }));

    it('should return true if the roles array has an admin entry', inject(function(User) {
      var user = new User();
      user.roles = ['admin'];
      expect(user.isAdmin()).to.be.true;
    }));

    it('should return false if the roles array does not have a superadmin entry', inject(function(User) {
      var user = new User();
      user.roles = ['not admin'];
      expect(user.isSuperAdmin()).to.be.falsey;
    }));

    it('should return true if the roles array has a superadmin entry', inject(function(User) {
      var user = new User();
      user.roles = ['superadmin'];
      expect(user.isSuperAdmin()).to.be.true;
    }))
  })
})