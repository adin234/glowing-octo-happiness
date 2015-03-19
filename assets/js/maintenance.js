/* jshint unused: false */
/* global
    server,
    origin
*/

'use strict';

var isUnderMaintenance = function() {
        $.ajax(server + 'streamers', function(data) {
        }).fail(function() {
            if ($('#gamers-link').css('display') === 'block') {
                $('#gamers-link').css('display','none'); 
            }
        }).success(function() {
            if ($('#gamers-link').css('display') === 'none') {
                window.location.assign(origin);
            }
        });
    },

    checker = setInterval(function() {    
        $.ajax(server + 'streamers', function(data) {
        }).fail(function() {
            if ($('#gamers-link').css('display') === 'block') {
                $('#gamers-link').css('display','none'); 
            }
        }).success(function() {
            if ($('#gamers-link').css('display') === 'none') {
                window.location.assign(origin);
                clearInterval(checker);
            }
        });
    }, 5000);

$(function() {
    $('#gamers-link').css('display','none');
    isUnderMaintenance();
});
