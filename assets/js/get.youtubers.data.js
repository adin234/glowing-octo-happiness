var xhReq = new XMLHttpRequest();
xhReq.open("GET", server+"youtubers", false);
xhReq.send(null);
var page_data = xhReq.responseText;
