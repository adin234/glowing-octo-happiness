var loader = {};
// loader = setInterval(function() {
// 	if(document.body) {
// 		utilLoader.show();
// 		clearInterval(loader);
// 	}
// }, 5);
// var hash = window.location.hash;
// var id = hash.split('/')[1];

// history.pushState(null, '', '/youtuber/'+id+'/'+hash.replace('/'+id+'/', '/'));


function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

params = getSearchParameters();

var xhReq = new XMLHttpRequest();
var user = params.user.replace('/', '');

xhReq.open("GET", server+"user/personal/"+user, false);
xhReq.send(null);
var page_data = xhReq.responseText;