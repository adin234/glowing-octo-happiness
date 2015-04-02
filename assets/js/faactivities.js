'use strict';
/*global $,server,console,events_all*/

$.get(server + 'freedom_events', function(data) {
    filter_display_events(data);
});

$.ajax({
    dataType: 'jsonp',
    url: server + 'freedom_events/checkAdmin',
    type: 'get'
}).success(function(data) {
    show_html(data);
}).fail(function() {});

var show_html = function(data) {

    var html = [];
    $.ajax({
            dataType: 'jsonp',
            url: server + 'logged_user',
            type: 'get'
        })
        .done(function(session) {
            if (session.message === 'Not logged in.') {
                document.getElementById('add_events_form').innerHTML = '';
            } else {
                $.get(server + 'user/' + session.user_id, function(user) {
                    if (user.is_admin === 1) {
                        data.forEach(function(item) {
                            html.push(item);
                        });
                        $('.add_events_form').html(html.join(''));
                    }
                });
            }
        });

};


var get_date_diff = function(sched, time) {
    var today = new Date(),
        currdate = today.toJSON()
        .substr(0, 10),
        currtime = today.toTimeString()
        .substr(0, 5),
        result = currdate.localeCompare(sched),
        result2 = currtime.localeCompare(time);

    if (result < 0) {
        return 'Ongoing';
    } else if (result === 0) {
        if (result2 <= 0) {
            return 'Ongoing';
        } else {
            return 'Ended';
        }
    } else {
        return 'Ended';
    }
};

var show_events = function(data) {

    var html = [];


    data.forEach(function(item) {


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

};


var filter_display_events = function(all_events) {

    var all_ended = [];

    all_events.forEach(function(item) {
        if (get_date_diff(item.end_date, item.end_time) === 'Ended') {
            all_ended.push(item);
        }
    });

    var html_content_sched = show_events(all_events);
    $('#all_schedule')
        .html(html_content_sched.join(''));

    var html_content_archive = show_events(all_ended);
    $('#archive_schedule')
        .html(html_content_archive.join(''));
};


var add_event = function() {

    var start = function() {
            $.ajax({
                dataType: 'jsonp',
                url: server + 'freedom_events/validate',
                type: 'get'
            }).success(function(csrf_token) {
                if (validate(csrf_token) === true) {
                    post_event();
                }
            }).fail(function() {});
        },

        validate = function(csrf_token) {
            var csrf_in_form = $('#csrftoken').val();
            if (csrf_token === csrf_in_form) {
                return true;
            }
        },

        post_event = function() {
            $.ajax({
                url: server + 'freedom_events/add',
                type: 'post',
                data: {
                    'event_title': $('#event_name')
                        .val(),
                    'start_date': $('#event_start_date')
                        .val(),
                    'end_date': $('#event_end_date')
                        .val(),
                    'start_time': $('#event_start_time')
                        .val(),
                    'end_time': $('#event_end_time')
                        .val(),
                    'e_description': $('#event_desc')
                        .val()
                }

            }).success(function() {
                append_data();
                delete_form_content();
            });



        },
        append_data = function() {
            var html = [];

            var event_name = $('#event_name').val(),
                event_start_date = $('#event_start_date').val(),
                event_end_date = $('#event_end_date').val(),
                event_start_time = $('#event_start_time').val(),
                event_end_time = $('#event_end_time').val();

            html.push('<div class="activity">');
            html.push('<div class="left">');
            html.push('<div id="startEventDate">' + event_start_date + '</div>' +
                '<p> - </p>' +
                '<div id="endEventDate">' + event_end_date + '</div>');
            html.push('<div id="startEventTime">' + event_start_time + '</div>' +
                '<p> - </p>' +
                '<div id="endEventTime">' + event_end_time + '</div>');
            html.push('</div>');
            html.push('<div class="center">');
            html.push('<div id="eventHeader">' + event_name + '</div>');
            html.push('</div>');
            html.push('<div class="right">');
            html.push('<div id="eventStatus">' + get_date_diff(event_end_date, event_end_time) +
                '</div>');
            html.push('</div>');
            html.push('</div>');


            $('#all_schedule').append(html);
        },
        delete_form_content = function() {
            $('#event_name').val('');
            $('#event_start_date').val('');
            $('#event_end_date').val('');
            $('#event_start_time').val('');
            $('#event_end_time').val('');
            $('#event_desc').val('');
        };

    start();
};


$('body').on('click', '#add_event_button', function() {
    add_event();
});

$('body').on('submit', '#event_form', function(event) {
    event.preventDefault();
});
