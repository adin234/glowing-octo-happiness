'use strict';

var page_data,
    twitch,
    params,
    xhReq = new XMLHttpRequest(),
    path = window.location.hash.split('/')
	   .filter(function(e){return e;}),
    url = window.location.href,

    transformToAssocArray = function (prmstr) {
        var params = {},
            prmarr = prmstr.split('&');
        for ( var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split('=');
            params[tmparr[0]] = tmparr[1];
        }
        return params;
    },

    getSearchParameters = function () {
          var prmstr = window.location.search.substr(1);
          return prmstr !== null && prmstr !== '' ? transformToAssocArray(prmstr) : {};
    };

if (url.indexOf('%2F&_escaped_fragment_=%2F') !== -1) {
    url = url.replace('%2F&_escaped_fragment_=%2F', '/#!/');
    window.location.href = url;
}
else if(url.indexOf('%2F/#!') !== -1){
    url = url.replace('%2F/#!', '/#!');
    window.location.href = url;
}
else if(url.indexOf('%2F#!') !== -1){
    url = url.replace('%2F#!', '/#!');
    window.location.href = url;
}

params = getSearchParameters();
var user = params.user.replace('/', '');
xhReq.open('GET', server + 'user/' + user, false);
xhReq.send(null);
page_data = xhReq.responseText;
twitch = path[1];
