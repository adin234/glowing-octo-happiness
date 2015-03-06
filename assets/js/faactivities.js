'use strict';
var all_events = [];

function get_user_info() {
    var userinfo = $.parseJSON(utilCookie.get('user')),
        user_id = userinfo.user_id;


    console.log(user_id);

    // if(user_id === 18){
    //          addEventForm();
    //  }else if(user_id != 18){ console.log('Not an admin!');
    // }else if(user_id == null){
    //      console.log('No one logged in');
    //  }
}

function addEventForm() {


    var html = [];

    html.push('<div id="add_event_header">Add an Event</div>')
        .push('<div id="addForm"><form>')
        .push(
            '<p id="e_title">Title</p> <input type="text" name="event_name" placeholder="Event Title" id="event_name">'
        )
        .push(
            '<p id="e_s_date">Start Date</p> < input type = "date"' +
            'name = "event_start_date"' +
            'placeholder = "Event Start Date"' +
            'id = "event_start_date" > '
        )
        .push(
            '<p id="e_e_date">End Date</p> <input type="date"' +
            'name="event_end_date" placeholder="Event End Date"' +
            ' id="event_end_date">'
        )
        .push(
            '<p id="s_time">Start Time</p> <input type="time"' +
            ' name="event_start_time"' +
            'placeholder="Event Start Time" id="event_start_time">'
        )
        .push(
            '<p id="e_time">End Time</p> <input type="time"' +
            'name="event_end_time"' +
            'placeholder="Event End Time" id="event_end_time">'
        )
        .push('<p id="e_desc">Event Description</p>')
        .push('<textarea id="event_desc" name="event_desc" placeholder="Event Description"></textarea>')
        .push('<button onclick="add_event()">ADD EVENT</button>')
        .push(
            '</form><button onclick="get_events()">' +
            'SHOW EVENTS</button><button onclick="get_data()">' +
            'Get Data</button></div>'
        );

    $('.add_events_form').html(html.join(''));


    get_user_info();

}


function add_event() {

    $.ajax({

            url: server + 'freedom_events/add',
            type: 'post',
            data: {

                'event_title': $('#event_name').val(),
                'start_date': $('#event_start_date').val(),
                'end_date': $('#event_end_date').val(),
                'start_time': $('#event_start_time').val(),
                'end_time': $('#event_end_time').val(),
                'e_description': $('#event_desc').val()
            }

        })
        .success(function (data) {

            console.log(data);
            console.log('success');
        })
        .fail(function (data) {
            console.log(data);
            console.log('Fail');

        });

}

function get_data() {

    $.ajax({
            dataType: 'json',
            url: server + 'freedom_events',
            type: 'get',
            data: {
                'event_title': $('#event_name').val(),
                'start_date': $('#event_start_date').val(),
                'end_date': $('#event_end_date').val(),
                'start_time': $('#event_start_time').val(),
                'end_time': $('#event_end_time').val(),
                'e_description': $('#event_desc').val()
            }

        })
        .success(function (data) {
            all_events.fetched_data = data;
        })
        .fail(function (data) {
            console.log(data);
            console.log('failure');
        });
}

function get_events() {


    var html = [];
    html.push('<div id="backButton">' + '<a href="' + origin + 'freedom">' +
        '<img src="/assets/images/back_button.png"></a>' + '</div>');

    all_events.fetched_data.forEach(function (item) {
        html.push('<div id="title">' + item.event_title + '</div>')
            .push('<div id="startDate">' + item.start_date + '</div>')
            .push('<div id="endDate">' + item.end_date + '</div>')
            .push('<div id="startTime">' + item.start_time + '</div>')
            .push('<div id="endTime">' + item.end_time + '</div>')
            .push('<div id="e-desc">' + item.e_description + '</div>')
            .push('<div id="join-event">' + '<button onclick="join_event()">JOIN EVENT</buttton>' +
                '</div>')
            .push('<div id="join-link">' + '<p>ENTER JOIN EVENT LINK</p>' +
                '<input type="text" name="event_link" id="event_link">' + '</div>');
    });

    $('.add_events_form').hide();
    $('#show_events').html(html.join(''));
    $('#editEvent').html('<div id="edit_event">' +
        '<button onclick="update_events()"><img src="/assets/images/pencil.jpg">EDIT EVENT</button>' + '</div>'
    );
}

function delete_events() {



}


function search_events(eventTitle) {

    var search_query = [];

    $.ajax({
        dataType: 'json',
        url: server + 'freedom_events',
        type: 'get',
        data: {
            'event_search': $('#search_event').val(),
        }
    }).success(function (data) {
        all_events.fetched_data.forEach(function (item) {
            if (eventTitle === item.event_title) {
                search_query.push(item.event_title);
            }
        });

    }).fail(function (data) {

    });

    console.log(search_query);
}

function edit_events() {

}

function get_date_diff() {

    var status = [];

    var date = new Date();
    var dateLocal = date.toLocaleDateString();

    all_events.fetched_data.forEach(function (item) {

        var end = item.end_date;

        if (end < dateLocal) {
            status.push('Ended');
        }
        else {
            status.push('Ongoing');
        }
    });
}


function get_schedule() {

    var html = [];

    all_events.fetched_data.forEach(function (item) {

        html.push('<div class="activity">')
            .push('<div class="left">')
            .push('<div id="startEventDate">' + item.start_date + '</div>' +
                '<div id="endEventDate">' + item.end_date + '</div>')
            .push('<div id="startEventTime">' + item.start_time + '</div>' +
                '<div id="endEventTime">' + item.end_time + '</div>')
            .push('</div>')
            .push('<div class="center">')
            .push('<div id="eventHeader">' + item.event_title + '</div>' +
                '<div id="e_status"></div>')
            .push('</div>')
            .push('</div>');
    });

    $('#all_schedule').html(html.join(''));
    var difference = get_date_diff();
    console.log(difference);
}



function get_archive() {

    var html = [];
    var eventStatus = 'Ended';


    all_events.fetched_data.forEach(function (item) {

        html.push('<div class="activity">')
            .push('<div class="left">')
            .push('<div id="startEventDate">' + item.start_date + '</div>' + '<p> - </p>' +
                '<div id="endEventDate">' + item.end_date + '</div>')
            .push('<div id="startEventTime">' + item.start_time + '</div>' + '<p> - </p>' +
                '<div id="endEventTime">' + item.end_time + '</div>')
            .push('</div>')
            .push('<div class="center">')
            .push('<div id="eventHeader">' + item.event_title + '</div>')
            .push('</div>')
            .push('<div class="right">')
            .push('<div id="eventStatus">' + eventStatus + '</div>')
            .push('</div>')
            .push('</div>');
    });

    $('#archive_schedule').html(html.join(''));

}

