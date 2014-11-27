var xhReq = new XMLHttpRequest();
var path = window.location.hash.split('/')
	.filter(function(e){return e;});

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
var user = params.user.replace('/', '');
xhReq.open("GET", server+"user/"+user, false);
xhReq.send(null);
var page_data = xhReq.responseText;
var twitch = path[1];
