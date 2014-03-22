exports.createDailyReport = function(groups) {
  var today = new Date();
  var yesterday = new Date();
  var report = "<h3>Mosaic Groups Daily Report for " + today.toDateString() + "</h3>";

  yesterday.setDate(today.getDate()-1);

  report += "<ul>";
  for (var i = 0; i < groups.length; i++) {
    var group = groups[i];
    report += "<li>" + group.title + " " + group.location + " " + group.dayOfTheWeek + "</li>";
    report += "<ul>";
    for (var j = 0; j < group.members.length; j++) {
      var member = groups[i].members[j];
      var memberHtml = member.firstName + " " + member.lastName + " " + member.email + " " + member.joinDate.toDateString() + "</li>";
      if (member.joinDate > yesterday) {
        report += "<li style='color:green'>" + memberHtml + "</li>";
      } else {
        report += "<li>" + memberHtml + "</li>";
      }
    }
    report += "</ul>";
  }
  report += "</ul>";
  return report;
};
