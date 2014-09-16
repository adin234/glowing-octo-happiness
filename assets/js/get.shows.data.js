var xhReq = new XMLHttpRequest();
xhReq.open("GET", server+"shows", false);
xhReq.send(null);
var page_data = xhReq.responseText;
