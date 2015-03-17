'use strict';

var page_data,
    xhReq = new XMLHttpRequest();

console.log(server);

xhReq.open('GET', server + 'freedom_events', false);
xhReq.send(null);
page_data = xhReq.responseText;
