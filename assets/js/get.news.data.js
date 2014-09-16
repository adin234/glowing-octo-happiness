var xhReq = new XMLHttpRequest();
xhReq.open("GET", server+"news", false);
xhReq.send(null);
var page_data = xhReq.responseText;
