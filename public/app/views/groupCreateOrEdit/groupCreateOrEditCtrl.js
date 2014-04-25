angular.module('app').controller('groupCreateOrEditCtrl', function($scope, $route, $location, $modal, genderTypes, daysOfTheWeek, availableTopics, statusTypes, groupService, notifierService, identityService, userService, meetingTimes) {
  var groupId = $route.current.params.id;
  $scope.identity = identityService;
  $scope.group = {};
  $scope.leaderIds = [];

  $scope.genderTypes = genderTypes;
  $scope.daysOfTheWeek = daysOfTheWeek;
  $scope.availableTopics = availableTopics;
  $scope.meetingTimes = meetingTimes;
  $scope.statusTypes = statusTypes;

  if (groupId) {
    groupService.getGroup(groupId).$promise.then(function(data) {
      $scope.group = data;
      $scope.leaderIds = [];
      for (var i = 0; i < data.leaders.length; i++) {
        $scope.leaderIds.push(data.leaders[i]._id);
      }
    });
  } else {
    $scope.group.title = "";
    $scope.group.location = "";
    $scope.group.dayOfWeek = "";
    $scope.group.meetingTime = "";
    $scope.group.memberLimit = "";
    $scope.group.genderType = "";
    $scope.group.childcare = true;
    $scope.group.topics = [];
    $scope.group.description = "";
    $scope.leaderIds = [];
  }

  // if the current user is an admin then they have the ability to create a group
  // and assign the leader as another person otherwise the group leader will be
  // set to the person who creates the group
  userService.getUsers().$promise.then(function(data) {
    $scope.users = [];
    for (var i = 0; i < data.length; i++) {
      $scope.users[i] = {};
      $scope.users[i].name = data[i].firstName + " " + data[i].lastName;
      $scope.users[i]._id = data[i]._id;
    }
  });

  $scope.saveGroup = function() {
    // if the form is valid then submit to the server
    if ($scope.groupCreateOrEditForm.$valid) {
      $scope.group.leaders = [];
      for (var i = 0; i < $scope.leaderIds.length; i++) {
        $scope.group.leaders.push($scope.leaderIds[i]);
      }
      groupService.saveGroup($scope.group).then(function(group) {
        if ($scope.group._id) {
          notifierService.notify('Group ' + $scope.group.title + ' has been updated');
          $location.path('/views/groupList/group-list');
        } else {
          notifierService.notify('Group ' + $scope.group.title + ' has been created');
          $location.path('/views/groupList/group-list');
        }
      }, function(reason) {
        notifierService.error(reason);
      })
    }
  }

  $scope.listMemberEmails = function() {
    var modalInstance = $modal.open({
      templateUrl: '/partials/groupCreateOrEdit/list-emails-modal',
      controller: listEmailsCtrl,
      resolve: {
        group: function () {
          return $scope.group;
        },
        title: function() {
          return "Group Member Emails"
        }
      }
    });
  }

  $scope.addMember = function(group) {
    var newMember = {
      firstName: "",
      lastName: "",
      email: "",
      status: "PENDING"
    };
    if (!$scope.group.members) {
      $scope.group.members = [];
    }
    $scope.group.members.push(newMember);
  }

  $scope.removeMember = function(memberToRemove) {
    $scope.memberToRemove = memberToRemove;

    var modalInstance = $modal.open({
      templateUrl: '/partials/groupCreateOrEdit/confirm-remove-member-modal',
      controller: confirmRemoveMemberCtrl,
      resolve: {
        group: function () {
          return $scope.group;
        },
        memberToRemove: function () {
          return $scope.memberToRemove;
        }
      }
    });
    modalInstance.result.then(function() {
      var index = $scope.group.members.indexOf(memberToRemove);
      $scope.group.members.splice(index, 1);
    });
  }
});

var listEmailsCtrl = function($scope, $modalInstance, title, group) {
  $scope.title = title;
  $scope.group = group;

  $scope.ok = function () {
    $modalInstance.close();
  };
};

var confirmRemoveMemberCtrl = function($scope, $modalInstance, group, memberToRemove) {
  $scope.memberToRemove = memberToRemove;
  $scope.confirm = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss();
  };
}
