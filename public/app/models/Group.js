angular.module('app').factory('Group', function ($resource) {
    var Group = $resource('/api/groups/:id', {
        id: "@_id"
    }, {
        addMember: {
            method: "POST",
            url: "/api/groups/:id/add-member"
        },
        emailGroupReportToSelf: {
            method: "POST",
            url: "/api/groups/emailGroupReportToSelf"
        },
        emailUniqueReportToSelf: {
            method: "POST",
            url: "/api/groups/emailUniqueReportToSelf"
        }
    });
    Group.prototype.isForLeadersOnly = function() {
      return this.audienceType && this.audienceType === 'Group Leaders';
    }
    return Group;
});