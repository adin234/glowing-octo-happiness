$.get(server + "freedom_events/checkAdmin", function (data) {
    'use strict';
    show_html(data); //data for admin use only

});

$.get(server + "freedom_events", function (data) {
    'use strict';
    filter_display_events(data);
});


var show_html = function (data) {
    'use strict';
    var html = [];

    $.ajax({
            dataType: 'jsonp',
            url: server + 'logged_user',
            type: 'get'
        })
        .done(function (session) {
            if (session.message === "Not logged in.") {
                document.getElementById('all_events_form').innerHTML = "";
            }
            else {
                $.get(server + "user/" + session.user_id, function (user) {
                    if (user.is_admin === 1) {
                        data.forEach(function (item) {
                            html.push(item);
                        });
                        $('.add_events_form').html(html.join(''));
                    }
                });
            }
        });
}


var get_date_diff = function (sched, time) {
    var today = new Date(),
        currdate = today.toJSON()
        .substr(0, 10),
        currtime = today.toTimeString()
        .substr(0, 5),
        result = currdate.localeCompare(sched),
        result2 = currtime.localeCompare(time);

    if (result < 0) {
        return 'Ongoing';
    }
    else if (result === 0) {
        if (result2 <= 0) {
            return 'Ongoing';
        }
        else {
            return 'Ended';
        }
    }
    else {
        return 'Ended';
    }
};

var show_events = function (data) {

    'use strict';
    var html = [];

    data.forEach(function (item) {
        html.push('<div class="activity">');
        html.push('<div class="left">');
        html.push('<div id="startEventDate">' + item.start_date + '</div>' +
            '<p> - </p>' +
            '<div id="endEventDate">' + item.end_date + '</div>');
        html.push('<div id="startEventTime">' + item.start_time + '</div>' +
            '<p> - </p>' +
            '<div id="endEventTime">' + item.end_time + '</div>');
        html.push('</div>');
        html.push('<div class="center">');
        html.push('<div id="eventHeader">' + item.event_title + '</div>');
        html.push('</div>');
        html.push('<div class="right">');
        html.push('<div id="eventStatus">' + get_date_diff(item.end_date, item.end_time) +
            '</div>');
        html.push('</div>');
        html.push('</div>');
    });

    return html;

}


var filter_display_events = function (all_events) {

    'use strict';
    all_events.forEach(function (item) {
        if ((get_date_diff(item.end_date, item.end_time) === 'Ongoing') || (get_date_diff(item.end_date,
                item.end_time) === 'Ended')) {
            var html_content_sched = show_events(all_events);
            $('#all_schedule')
                .html(html_content_sched.join(''));
        }
    });
    all_events.forEach(function (item) {
        if (get_date_diff(item.end_date, item.end_time) === 'Ended') {
            var html_content_archive = show_events(all_events);
            $('#archive_schedule')
                .html(html_content_archive.join(''));
        }
    });
}

