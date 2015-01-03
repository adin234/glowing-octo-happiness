var xhReq = new XMLHttpRequest();
xhReq.open("GET", server+"streamers", false);
xhReq.send(null);
var page_data = xhReq.responseText;
