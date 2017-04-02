angular.module('app').controller('groupJoinCtrl', function ($scope, $route, $location, groupService, notifierService, identityService, genders, campuses) {
    var groupId = $route.current.params.id;
    $scope.campuses = campuses;
    $scope.genders = genders;
    $scope.disableJoin = false;
    $scope.groupIsFull = false;
    $scope.emailConfirmed = '';
    $scope.joinButtonTooltip = '';

    groupService.getGroup(groupId).$promise
        .then(function (data) {
            $scope.group = data;
            $scope.group.newMember = {
                firstName: '',
                lastName: '',
                email: '',
                status: 'PENDING'
            };
            $scope.groupIsFull = $scope.group.members.length >= $scope.group.memberLimit;
            if ($scope.group.isForLeadersOnly() && !identityService.isAuthenticated()) {
                $scope.disableJoin = true;
                var errorMsg = 'You must be logged in if you want to join this group';
                $scope.joinButtonTooltip = errorMsg;
                notifierService.error(errorMsg);
            }
        });

    $scope.joinGroup = function () {
        // if the form is valid then submit to the server
        if (!$scope.groupIsFull && !$scope.disableJoin) {
            
            //remove non digit characters 
            $scope.group.newMember.phone = $scope.group.newMember.phone.replace(/\D/g,'');
            
            $scope.disableJoin = true;
            groupService.addMember($scope.group)
                .then(function () {
                    notifierService.notify('Your request to join this group has been sent');
                    $location.path('/');
                })
                .catch(function () {
                    notifierService.error('Not able to join this group at this time');
                });
        }
    };
});
