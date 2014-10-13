utilLoader.show();
// var hash = window.location.hash;
// var id = hash.split('/')[1];

// console.log(id);
// console.log('/youtuber/'+id+hash.replace('/'+id+'/', '/'));

// history.pushState(null, '', '/youtuber/'+id+'/'+hash.replace('/'+id+'/', '/'));

var xhReq = new XMLHttpRequest();
var user = window.location.pathname
	.split('/').filter(function(e){return e;})[1];

xhReq.open("GET", server+"user/personal/"+user, false);
xhReq.send(null);
var page_data = xhReq.responseText;
