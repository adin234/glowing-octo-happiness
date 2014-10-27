var xhReq = new XMLHttpRequest();
xhReq.open("GET", server+"lan_party", false);
xhReq.send(null);
var page_data = xhReq.responseText;
