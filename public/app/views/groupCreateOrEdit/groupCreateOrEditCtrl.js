angular.module('app').controller('groupCreateOrEditCtrl', function($scope, $route, $location, $modal, genderTypes, daysOfTheWeek, availableTopics, groupService, notifierService, identityService, userService, meetingTimes) {
  var groupId = $route.current.params.id;
  $scope.identity = identityService;
  $scope.group = {};
  if (groupId) {
    groupService.getGroup(groupId).$promise.then(function(data) {
      $scope.group = data;
      $scope.group.leaderIds = [];
      for (var i = 0; i < data.leaders.length; i++) {
        $scope.group.leaderIds.push(data.leaders[i]._id);
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
    $scope.group.leaderIds = [];
  }

  // if the current user is an admin then they have the ability to create a group
  // and assign the leader as another person otherwise the group leader will be
  // set to the person who creates the group
  if (identityService.isAdmin()) {
    userService.getUsers().$promise.then(function(data) {
      $scope.users = [];
      for (var i = 0; i < data.length; i++) {
        $scope.users[i] = {};
        $scope.users[i].name = data[i].firstName + " " + data[i].lastName;
        $scope.users[i]._id = data[i]._id;
      }
    });
  }

  $scope.genderTypes = genderTypes;
  $scope.daysOfTheWeek = daysOfTheWeek;
  $scope.availableTopics = availableTopics;
  $scope.meetingTimes = meetingTimes;

  $scope.pendingMember = function(member) {
    member.status = "PENDING";
  }

  $scope.approveMember = function(member) {
    member.status = "APPROVED";
  }

  $scope.removeMember = function(group, member) {
    var index = group.members.indexOf(member);
    group.members.splice(index, 1);
  }

  $scope.saveGroup = function() {
    // if the form is valid then submit to the server
    if (groupCreateOrEditForm.checkValidity()) {
      $scope.group.leaders = [];
      if (identityService.isAdmin()) {
        for (var i = 0; i < $scope.group.leaderIds.length; i++) {
          $scope.group.leaders.push($scope.group.leaderIds[i]);
        }
      } else {
        $scope.group.leaders.push($scope.identity.currentUser._id);
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
});

var listEmailsCtrl = function($scope, $modalInstance, title, group) {
  $scope.title = title;
  $scope.group = group;

  $scope.ok = function () {
    $modalInstance.close();
  };
};
