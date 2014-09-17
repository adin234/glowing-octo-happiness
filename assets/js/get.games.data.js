var xhReq = new XMLHttpRequest();
xhReq.open("GET", server+"gamesdata", false);
xhReq.send(null);
var page_data = xhReq.responseText;
