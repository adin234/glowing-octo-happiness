'use strict';

var page_data,
    xhReq = new XMLHttpRequest();
xhReq.open('GET', server + 'news', false);
xhReq.send(null);
page_data = xhReq.responseText;
