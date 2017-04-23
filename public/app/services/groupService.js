angular.module('app').factory('groupService', function ($http, $q, Group) {
    return {
        getCurrentSemester: function () {
            return $http.get('/api/groups/getSemester')
                .then(function (response) {
                    return response.data.name;
                });
        },
        startNewSemester: function (name) {
            return $http.post('/api/groups/addSemester', { semesterName: name });
        },
        emailGroupReportToSelf: function () {
            return Group.emailGroupReportToSelf();
        },
        emailUniqueReportToSelf: function () {
            return Group.emailUniqueReportToSelf();
        },

        getGroups: function () {
            return Group.query();
        },

        getGroup: function (id) {
            return Group.get({
                id: id
            });
        },

        deleteGroup: function (group) {
            var dfd = $q.defer();
            group.$delete().then(function () {
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        saveGroup: function (group) {
            var deferred = $q.defer();
            var groupToSave;
            if (!group._id) {
                groupToSave = new Group(group);
            } else {
                groupToSave = group;
            }
            groupToSave.$save().then(function (group) {
                deferred.resolve(group);
            }, function (response) {
                deferred.reject(response.data.reason);
            });
            return deferred.promise;
        },

        addMember: function (group) {
            var deferred = $q.defer();
            group.$addMember().then(function () {
                deferred.resolve();
            }, function (response) {
                var reason = '';
                if (response.data && response.data.reason) {
                    reason = response.data.reason;
                }
                deferred.reject(reason);
            });
            return deferred.promise;
        }
    };
});