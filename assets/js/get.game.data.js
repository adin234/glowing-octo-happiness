var xhReq = new XMLHttpRequest();
var game = window.location.pathname
    .split('/').filter(function(e){return e;})[1]
xhReq.open("GET", server+"game/"+game, false);
xhReq.send(null);
var page_data = xhReq.responseText;
