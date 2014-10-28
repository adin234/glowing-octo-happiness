var xhReq = new XMLHttpRequest();
xhReq.open("GET", server+"streamers?lanparty", false);
xhReq.send(null);
var page_data = xhReq.responseText;
