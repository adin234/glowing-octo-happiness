var xhReq = new XMLHttpRequest();
var console = window.location.pathname
    .split('/').filter(function(e){return e;})[1]
xhReq.open("GET", server+"gamesdata?console="+console, false);
xhReq.send(null);
var page_data = xhReq.responseText;
