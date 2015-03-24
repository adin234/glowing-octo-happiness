'use strict';

$(document).on('load-page', function() {
    $('ul.resize').click(function () {
        var $body = $('body'),
            $zoom = $('.zoom'),
            $resize = $('ul.resize li:first-child');
        $body.toggleClass('zoom2x');
        if ($body.hasClass('zoom2x')) {
            $resize.html('X2');
        }
        else {
            $resize.html('X1');
        }

        $zoom.toggleClass('zoomOut');
    });
});