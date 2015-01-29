var xhReq = new XMLHttpRequest();
xhReq.open("GET", server+"freedom_activities", false);
xhReq.send(null);
var page_data = xhReq.responseText;
