/* global server */
'use strict';

var page_data,
    xhReq = new XMLHttpRequest();

xhReq.open('GET', server + 'freedom_events', false);
xhReq.send(null);
page_data = xhReq.responseText;
