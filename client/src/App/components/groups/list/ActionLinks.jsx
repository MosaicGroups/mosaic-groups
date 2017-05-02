import React from 'react';
import { connect } from 'react-redux';
import { groupDisabled, groupIsFull, userCanEditGroup } from '../../../utils/index.js';
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
   

    return (<div>
        {userCanEditGroup(group, identity) ? <a href={`/group/createEdit/${group._id}`}>Edit</a> : null}
        {!groupIsFull(group) && !groupDisabled(group, settings) ? <a href={`/group/join/${group._id}`}>Join</a> : null}
        ({`${group.members.length} of ${group.memberLimit}`})
    </div>);
};

const mapStateToProps = state => {

    return {
        settings: state.settings,
        identity: state.identity
    };
};
export default connect(mapStateToProps)(ActionLinks);