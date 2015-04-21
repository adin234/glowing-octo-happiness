/*global
	page_data,
    template,
    JST
*/

'use strict';

define(function() {

    return function Render_Game() {
        console.log('render game');
        var html = [];
        page_data.games_cast.forEach(function (item) {
            item.consoles = item.consoles || [];
            if (!~item.consoles.indexOf(window.filterConsole)) {
                return;
            }
            html.push(template(JST['gamesCastTpl.html'](), item));
        });

        $('#tab-4').mCustomScrollbar({
            theme: 'inset-2'
        });

        if (!html.length) {
            html.push('目前沒有遊戲');
        }

        $('#tab-4 .mCSB_container ul').html(html.join(''));
        $('.tooltip').tooltipster({
            contentAsHTML: true
        });
    };
});
