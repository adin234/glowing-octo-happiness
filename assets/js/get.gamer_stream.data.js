var xhReq = new XMLHttpRequest();
var path = window.location.pathname.split('/')
	.filter(function(e){return e;});
var user = path[1]
xhReq.open("GET", server+"user/"+user, false);
xhReq.send(null);
var page_data = xhReq.responseText;
var twitch = path[2];