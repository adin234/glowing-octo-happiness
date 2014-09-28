utilLoader.show();
var xhReq = new XMLHttpRequest();
var user = window.location.pathname
	.split('/').filter(function(e){return e;})[1]
xhReq.open("GET", server+"user/personal/"+user, false);
xhReq.send(null);
var page_data = xhReq.responseText;
