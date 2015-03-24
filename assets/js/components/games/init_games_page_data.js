/* global
    page_data: true,
    gamesAutocompleteArray,
    gameNames,
    hash : true,
    render_videos,
    filterAction,
    filterConsole,
    filter_game,
    utilHash,
    render_page
*/
'use strict';

var init_page = function () {
        page_data = $.parseJSON(page_data);
        page_data.games.forEach(function(item) {
            gamesAutocompleteArray.push({value: item.name, data: item});
            gameNames.push(item.name);
            if (!~gameNames.indexOf(item.chinese)) {
                gamesAutocompleteArray.push({value: item.chinese, data: item});
            }
        });

        $('.sf-menu').superfish();
        $('.tabs').tabslet({ animation: true });
        $('.games .tab li a').on('click', function() {
            var search = $('#txtbox-search-games');
            search.val('');
            filter_game(search);
            utilHash.changeHashVal('console', filterConsole || 'all');
            $('.video ul li h2 a').html('遊戲分類');
        });
        $(window).trigger('hashchange');

        render_page();

    };

init_page();
