/* jshint unused: false */
/* jshint scripturl:true */
/* jshint -W100 */ 
/* global
    page_data: true,
    template,
    JST,
    utilHash,
    origin,
    attachments_server
*/

'use strict';

var slider = {},
    first = true,
    multiview_items = [],

    render_featured_games = function (filter) {
        var html = [],
            items = [];

        filter = new RegExp(filter, 'i');

        page_data.featured_games.forEach(function (item, i) {

            if (item.name.search(filter) === -1) {
                return;
            }

            item.game = item.name;
            items.push(
                template(
                    JST['gameTpl.html'](),
                    item
                )
            );

            if (items.length === 12) {
                html.push(
                    template(
                        JST['gameContainerTpl.html'](),
                        {'items': items.join('')}
                    )
                );
                items = [];
            }
        });

        if (items.length !== 0) {
            html.push(
                template(
                    JST['gameContainerTpl.html'](), 
                    {'items': items.join('')}
                )
            );
        }

        if (!html.length) {
            html.push('ç›®å‰æ²’æœ‰éŠæˆ²');
        }

        $('#container-featured-games').html(html.join(''));

        slider.featured_games.reloadSlider({
            startSlide: 0,
            infiniteLoop: false,
            hideControlOnEnd: true
        });
    },

    render_latest_games = function (filter) {
        var html = [],
            items = [];

        filter = new RegExp(filter, 'i');

        page_data.games.forEach(function (item, i) {
            if (item.name.search(filter) === -1) {
                return;
            }

            items.push(
                template(
                    JST['gameTpl.html'](),
                    item
                )
            );

            if (items.length === 12) {
                html.push(
                    template(
                        JST['gameContainerTpl.html'](),
                        {'items': items.join('')}
                    )
                );
                items = [];
            }
        });

        if (items.length !== 0) {
            html.push(
                template(
                    JST['gameContainerTpl.html'](),
                    {'items': items.join('')}
                )
            );
        }

        if (!html.length) {
            html.push('ç›®å‰æ²’æœ‰éŠæˆ²');
        }

        $('#container-latest-games').html(html.join(''));

        slider.latest_games.reloadSlider({
            startSlide: 0,
            infiniteLoop: false,
            hideControlOnEnd: true
        });
    },

    filter_game = function (input) {
        var $this = $(input),
            filterString = $this.val();

        render_featured_games(filterString);
        render_latest_games(filterString);
    };
