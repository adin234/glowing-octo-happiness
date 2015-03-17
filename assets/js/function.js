'use strict';

$(document).ready(function () {
    $('.selectLanguage').css('display', 'none');
    $('.language').click(function () {
        $('.selectLanguage').toggle(750);
    });
    $('.yourDiscussion textarea').focus(function () {
        $('.angle').css('background-position', '0 -358px');
    });
    $('.yourDiscussion textarea').blur(function () {
        $('.angle').css('background-position', '0 -315px');
    });
});
