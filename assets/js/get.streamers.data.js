var xhReq = new XMLHttpRequest();
xhReq.open("GET", server+"streamersdata?limit=18", false);
xhReq.send(null);
var page_data = xhReq.responseText;
