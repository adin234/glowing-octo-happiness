var xhReq = new XMLHttpRequest();
xhReq.open("GET", server+"shows", false);
xhReq.send(null);
var shows_data = xhReq.responseText;
