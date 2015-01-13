page_data = $.parseJSON(page_data);

$('#lanparty_content').html(page_data.lanparty_what.replace(/\r/g, '<br>').replace(/\n/g, '<br>'));
$('#lanparty_activities').html(page_data.lanparty_activities.replace(/\r/g, '<br>').replace(/\n/g, '<br>'));

function get24Hour(time) {
	var x = time.substr(-2);
	var time = time.replace(x, '');

	if(x != 'am') {
		time = parseInt(time)+12;
	}

	return time;
}

var eventsHtml = [];
var eventsOption = {
	paddingTop: 60,
	height: 37
};
var daysOfWeek = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
var monthName = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var schedules = {};

page_data.lanparty_schedule.forEach(function(item) {
	var index = item.date_day+''+item.date_month+''+item.date_year;
	if(typeof schedules[index] == 'undefined') {
		schedules[index] = [];
	}
	schedules[index].push(item);
});

for (var key in schedules) {
   var data = schedules[key];
   var itemDate = '';
   var timeHtml = [];

	data.forEach(function(item) {
		var date = new Date(item.date_month + ' ' + item.date_day + ' ' + item.date_year).setHours(0, 0, 0, 0);
		var dateNow = new Date().setHours(0, 0, 0, 0);

		var start = get24Hour(item.time_start);
		var end = get24Hour(item.time_end);

		var height = (end - start) * eventsOption.height + 'px';
		var topPosition = (start * eventsOption.height) + eventsOption.paddingTop + 'px';

		var dateTemp = new Date(date);

		itemDate = monthName[dateTemp.getMonth()]+'/'+('0' + dateTemp.getDate()).slice(-2)+' '+ daysOfWeek[dateTemp.getDay()];

		var tempdata = {
			top: topPosition,
			height: height,
			title: item.game,
			start: item.time_start,
			end: item.time_end,
			date: itemDate
		};

		timeHtml.push(template($('#eventItemTime').html(), tempdata));
	});

	var tempdata = {
		date: itemDate,
		time: timeHtml.join('')
	};

	eventsHtml.push(template($('#eventItemTpl').html(), tempdata));
}

$('#lanparty_event').html(eventsHtml.join(''));
$('#lanparty_event').css('width', Object.keys(schedules).length*211+150+'px');
$('#event-container').mCustomScrollbar({
  horizontalScroll: true,
  advanced: { updateOnContentResize: true, updateOnBrowserResize: true },
  theme: "dark"
});

 $(".sf-menu").superfish();