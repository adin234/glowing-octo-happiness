/* jshint unused: false */
/* global
    page_data,
    attachments_server,
    filter_game,
    utilHash,
    filterConsole,
    render_page,
    youtuberUserSearch
*/

'use strict';

var slider = {};

slider.featured_games = $('#container-featured-games').bxSlider();
slider.latest_games = $('#container-latest-games').bxSlider();

$(function() {
    $('.sf-menu').superfish();
    $('.tabs').tabslet({ animation: true });
    $('.games .tab li a').on('click', function() {
        var search = $('#txtbox-search-games');
        search.val('');
        filter_game(search);
        utilHash.changeHashVal('console', filterConsole || 'all');
    });
    youtuberUserSearch();
    $(window).trigger('hashchange');
});

render_page();
