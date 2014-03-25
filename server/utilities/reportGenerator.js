exports.createDailyReport = function(groups) {
  var today = new Date();
  var yesterday = new Date();
  yesterday.setDate(today.getDate()-1);
  var numNewMembers = 0;
  var reportHtml = "", membersHtml = "";

  reportHtml += "<h3>Mosaic Groups Daily Report for " + today.toDateString() + "</h3>";
  reportHtml += "<p>The names highlighted in <span style='color:green'>green</span> are from people who signed up in the past 24hrs</p>";

  membersHtml += "<ul>";
  for (var i = 0; i < groups.length; i++) {
    var group = groups[i];
    membersHtml += "<li>" + group.title + " on " + group.dayOfTheWeek + " in " + group.location + " lead by: ";
    for (var j = 0; j < group.leaders.length; j++) {
      var leader = group.leaders[j];
      membersHtml += leader.firstName + " " + leader.lastName + " &lt;" + leader.username + "&gt; ";
      if (j+1 < group.leaders.length) membersHtml += ", ";
    }
    membersHtml += "</li>";

    membersHtml += "<ul>";
    for (var j = 0; j < group.members.length; j++) {
      var member = groups[i].members[j];
      var memberHtml = member.firstName + " " + member.lastName + " &lt;" +  member.email + "&gt; " + member.joinDate.toDateString() + "</li>";
      if (member.joinDate > yesterday) {
        numNewMembers++;
        membersHtml += "<li style='color:green'>" + memberHtml + "</li>";
      } else {
        membersHtml += "<li>" + memberHtml + "</li>";
      }
    }
    membersHtml += "</ul>";
  }
  membersHtml += "</ul>";
  reportHtml += "<p>There were <span style='color:green'>" + numNewMembers + "</span> new members in the past 24hours";
  reportHtml += membersHtml;
  return reportHtml;
};
