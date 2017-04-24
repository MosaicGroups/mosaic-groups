let logger = require('../config/logger');
let hash = require('ys-hash');
let config = require('../config/config');
let json2csv = require('json2csv');
let semesterService = require('../services/semesterService');

exports.generateDistinctUsersReport = async function (Groups, callback) {
    let allMembers = [];
    let fields = ['first', 'last'];

    let mostRecentSemester = await semesterService.getMostRecentSemesterSingleton();
    Groups.aggregate()
        //we dont want to include disabled groups
        .match({
            disabled: false,
            semesterId: mostRecentSemester._id
        })
        //explode all groups by member
        .unwind('members')
        // this is what makes the returned list unique.
        .group({
            _id: {
                last: {
                    $toLower: '$members.lastName'
                },
                first: {
                    $toLower: '$members.firstName'
                },

            }
        })
        //sort by last then first
        .sort({
            '_id.last': 1,
            '_id.first': 1
        })
        // do something with the results
        .exec(function (err, members) {


            members.forEach(function (member) {
                allMembers.push(member._id);
            });
            //console.log(allMembers);

            json2csv({
                data: allMembers,
                fields: fields
            }, function (err, csv) {
                if (err) logger.log(err);
                callback(csv);
            });
        });
};

exports.createDailyReport = function (groups) {
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    let numMembers = 0;
    let numNewMembers = 0;
    let numUniqueMembers = 0;
    let reportHtml = '',
        membersHtml = '';
    var uniqueMembers = [];

    reportHtml += '<h3>Mosaic Groups Daily Report for ' + today.toDateString() + '</h3>';

    membersHtml += '<ul>';
    for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        membersHtml += '<li>';
        if (group.members.length >= group.memberLimit) {
            membersHtml += '<b>(FULL)</b> ';
        }
        membersHtml += '<b>\'' + group.title + '\'</b> on ' + group.dayOfTheWeek + ' in ' + group.location;
        membersHtml += ' with <b>' + group.members.length + ' members</b>';
        membersHtml += ' lead by: ';
        for (let j = 0; j < group.leaders.length; j++) {
            let leader = group.leaders[j];
            membersHtml += leader.firstName + ' ' + leader.lastName + ' &lt;' + leader.username + '&gt; ';
            if (j + 1 < group.leaders.length) membersHtml += ', ';
        }
        membersHtml += '</li>';

        membersHtml += '<ul>';
        for (let j = 0; j < group.members.length; j++) {
            numMembers++;
            let member = groups[i].members[j];
            let memberHashStr = generateUniqueMemberId(member);
            if (uniqueMembers.indexOf(memberHashStr) < 0) {
                uniqueMembers.push(memberHashStr);
                numUniqueMembers++;
            }
            let joinDate;
            try {
                joinDate = member.joinDate.toDateString();
            } catch (err) {
                joinDate = '<span  style=\'color:red\'><b> -ERROR getting join date value is: \'' + member.joinDate + '\'- </b></span>';
            }
            let memberHtml = member.firstName + ' ' + member.lastName + ' &lt;' + member.email + '&gt; joined on ' + joinDate + '</li>';
            if (member.joinDate > yesterday) {
                numNewMembers++;
                membersHtml += '<li style=\'color:green\'><b>' + memberHtml + '</b></li>';
            } else {
                membersHtml += '<li>' + memberHtml + '</li>';
            }
        }
        membersHtml += '</ul>';
    }
    membersHtml += '</ul>';
    reportHtml +=
    '<p>' +
    '<div>There are <b>' + numMembers + '</b> members total signed up for growth groups</div>' +
    '<div>There are <b>' + numUniqueMembers + ' unique</b> members signed up for growth groups</div>' +
    '<div>There were <span style=\'color:green\'><b>' + numNewMembers + '</b></span> new members total in the past 24hours (highlighted in <span style=\'color:green\'><b>green</b></span> below)</div>' +
    '</p>';
    reportHtml += membersHtml;
    return reportHtml;
};

let generateUniqueMemberId = function (member) {
    let uniqueString = member.firstName.trim().toLowerCase() + member.lastName.trim().toLowerCase() + member.email.trim().toLowerCase();
    let memberHashStr = hash.hash_str(uniqueString);
    return memberHashStr;
};