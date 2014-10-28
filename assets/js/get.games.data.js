var xhReq = new XMLHttpRequest();
xhReq.open("GET", server+"gamesdata?limit=32", false);
xhReq.send(null);
var page_data = xhReq.responseText;
