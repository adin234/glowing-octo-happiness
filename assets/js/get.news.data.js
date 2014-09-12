var xhReq = new XMLHttpRequest();
xhReq.open("GET", server+"news", false);
xhReq.send(null);
var news_data = xhReq.responseText;