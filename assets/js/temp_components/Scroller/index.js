'use strict';

define(function() {

    $(window).scroll(function () {
        if ($('body')[0].scrollHeight - $(window).scrollTop() - 50 <= $(window).height()) {
            $('#arrow').removeClass('down').addClass('up');
        }
        else {
            $('#arrow').removeClass('up').addClass('down');
        }
    });

    $('body').on('click', '#arrow.down', function () {
        $('html, body').animate({
            scrollTop: $(document).height()
        });
    });

    $('body').on('click', '#arrow.up', function () {
        $('html, body').animate({
            scrollTop: 0
        });
    });
    
});