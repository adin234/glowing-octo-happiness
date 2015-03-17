'use strict';

var eventsHtml = [],
	eventsOption = {
		paddingTop: 60,
		height: 37
	},
	daysOfWeek = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'],
	monthName = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
	schedules = {},

	get24Hour = function (time) {
		var x = time.substr(-2);
		var my_time = time.replace(x, '');

		if(x !== 'am') {
			my_time = parseInt(my_time)+12;
		}

		return my_time;
	};

page_data = $.parseJSON(page_data);

$('#lanparty_content').html(
		page_data.lanparty_what.
			replace(/\r/g, '<br>').
			replace(/\n/g, '<br>')
);
$('#lanparty_activities').html(
	page_data.lanparty_activities.
		replace(/\r/g, '<br>').
		replace(/\n/g, '<br>')
);

page_data.lanparty_schedule.forEach(function(item) {
	var index = item.date_day+''+item.date_month+''+item.date_year;
	if(typeof schedules[index] === 'undefined') {
		schedules[index] = [];
	}
	schedules[index].push(item);
});

for (var key in schedules) {
   var data = schedules[key];
   var itemDate = '';
   var timeHtml = [];

	data.forEach(function(item) {
		var date = new Date(
			item.date_month + ' ' +
			item.date_day + ' ' +
			item.date_year).
			setHours(0, 0, 0, 0),
			start = get24Hour(item.time_start),
			end = get24Hour(item.time_end),
			height = (end - start) * eventsOption.height + 'px',
			topPosition = (start * eventsOption.height) + eventsOption.paddingTop + 'px',
			dateTemp = new Date(date);

		itemDate = monthName[dateTemp.getMonth()]+'/'+('0' + dateTemp.getDate()).slice(-2)+' '+ daysOfWeek[dateTemp.getDay()];

		var tempdata = {
			top: topPosition,
			height: height,
			title: item.game,
			start: item.time_start,
			end: item.time_end,
			date: itemDate
		};

		timeHtml.push(template(
			$('#eventItemTime').html(), tempdata)
		);
	});

	var tempdata = {
		date: itemDate,
		time: timeHtml.join('')
	};

	eventsHtml.push(template(
		$('#eventItemTpl').html(), tempdata)
	);
}

$('#lanparty_event').html(
	eventsHtml.join('')
);

$('#lanparty_event').css(
	'width', Object.keys(schedules).length*211+150+'px'
);

$('#event-container').mCustomScrollbar({
	horizontalScroll: true,
	advanced: { updateOnContentResize: true, updateOnBrowserResize: true },
	theme: 'dark'
});
