/*global
    load_more
*/

'use strict';

$(function() {
    $('html').on('click', '.load-more', function () {
        var e = $(this);
        var selector = e.attr('data-selector');
        var page = e.attr('data-page');
        var per_page = e.attr('data-per-page');
        load_more(selector, page, per_page);
    });
});