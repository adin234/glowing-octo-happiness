/* global server */
'use strict';

var page_data,

    transformToAssocArray = function (prmstr) {
        var params = {};
        var prmarr = prmstr.split('&');
        for ( var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split('=');
            params[tmparr[0]] = tmparr[1];
        }
        return params;
    },

    getSearchParameters = function () {
        var prmstr = window.location.search.substr(1);
        return (prmstr !== null && prmstr !== '') ? transformToAssocArray(prmstr) : {};
    },

params = getSearchParameters();

var xhReq = new XMLHttpRequest();
var game = params.game.replace('/', '');

xhReq.open('GET', server + 'game/' + game, false);
xhReq.send(null);

page_data = xhReq.responseText;
