import React from 'react';
import { connect } from 'react-redux';
/*
$scope.joinGroup = function (group) {
    $location.path('/views/groupJoin/group-join/' + group._id);
};

$scope.showGroupFull = function (group) {
    $location.path('/views/groupJoin/group-full/' + group._id);
};

$scope.editGroup = function (group) {
    $location.path('/views/groupCreateOrEdit/group-create-or-edit/' + group._id);
};

$scope.deleteGroup = function (group) {
    var modalInstance = $modal.open({
        templateUrl: '/partials/groupList/confirm-delete-group-modal',
        controller: confirmDeleteGroupCtrl,
        resolve: {
            group: function () {
                return group;
            }
        }
    });
    modalInstance.result.then(function () {
        $scope.tableParams.reload();
    });
};*/







const ActionLinks = ({ identity, group, settings }) => {
    const groupIsDisabled = () => {
        return group.disabled;
    };
    const groupIsFull = () => {
        return group.members.length >= group.memberLimit;
    };
    const groupsDisabled = () => {
        return settings.disableGroups;
    };

    const userIsLeaderOfGroup = () => {

        // filter leaders to see if the logged in user is a leader of the group
        return group.leaders
            .filter(leader => identity._id === leader._id)
            .length > 0;
    };
    const canEdit = () => {
        let canEditGroup = false;
        if (!identity.username) {
            canEditGroup = false;
        } else if (identity.roles.includes('admin')) {
            canEditGroup = true;
        } else if (userIsLeaderOfGroup()) {
            canEditGroup = true;
        }
        return canEditGroup;
    };
   

    return (<div>{canEdit() ? <a href={`/group/createEdit/${group._id}`}>Edit</a> : 'false'}</div>);
};

const mapStateToProps = state => {

    return {
        settings: state.settings,
        identity: state.identity 
    };
};
export default connect(mapStateToProps)(ActionLinks);