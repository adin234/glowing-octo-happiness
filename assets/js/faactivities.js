$.get(server + "freedom_events/checkAdmin", function (data) {
    show_html(data);
});

var show_html = function (data) {
    var html = [];
    data.forEach(function (item) {
        html.push(item);
    });
    $('.add_events_form').html(html.join(''));
}

