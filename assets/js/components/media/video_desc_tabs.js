/*globals
    active_comments
*/

'use strict';

$(document).on('load-page', function() {
    $('.tabs').tabslet({
        animation: true,
        active: 1
    }).promise().done(function () {
        if (active_comments) {
            $('#tab-2').click();
        }
    });

    $('#tab-1').mCustomScrollbar({
        theme: 'inset-2'
    });
    
    $('#tab-2').mCustomScrollbar({
        theme: 'inset-2'
    });
});