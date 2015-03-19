/* global server */

'use strict';

var page_data,
    xhReq = new XMLHttpRequest();
xhReq.open('GET', server + 'streamers', false);
xhReq.send(null);
page_data = xhReq.responseText;
