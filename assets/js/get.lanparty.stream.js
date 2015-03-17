'use strict';

var page_data,
    xhReq = new XMLHttpRequest();
xhReq.open('GET', server + 'streamers?lanparty', false);
xhReq.send(null);
page_data = xhReq.responseText;
