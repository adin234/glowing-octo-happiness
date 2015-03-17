'use strict';

var params,
    page_data,
    xhReq,
    user,
    loader = {},

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


params = getSearchParameters();

xhReq = new XMLHttpRequest();
user = params.user.replace('/', '');

xhReq.open('GET', server + 'user/personal/'+user, false);
xhReq.send(null);
page_data = xhReq.responseText;
