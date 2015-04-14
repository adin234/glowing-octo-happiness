'use strict';

define(function() {
    return function Update_Prev_Next() {

        var current = $('.videoItem.current'),
            prevLink = current.prev().children('a').first().attr('href'),
            nextLink = current.next().children('a').first().attr('href');

        $('#btn-prev').attr('href', prevLink ? prevLink : 'javascript:;');
        $('#btn-next').attr('href', nextLink ? nextLink : 'javascript:;');
    };
});
