/*global
    attachments_server,
    page_data,
    server
*/

'use strict';

define('youtubers', function(require) {

    var Tabs = require('Tabs/index'),
        List_Slider = require('List_Slider/index'),
        Global_Filter = require('Global_Filter/index'),
        game_tpl = require('text!./templates/youtubers-game.html'),
        video_tpl = require('text!./templates/youtubers-video.html'),
        games_tab = new Tabs({hash_change: false}),
        videos_tab = new Tabs({hash_change: false}),
        latest_games_slider = new List_Slider({
            per_slider: 12,
            item_template: game_tpl,
            $list_container: $('<ul class="game clearFix"/>')
        }),
        featured_games_slider   = new List_Slider({
            per_slider: 12,
            item_template: game_tpl,
            $list_container: $('<ul class="game clearFix"/>')
        }),
        popular_members_slider  = new List_Slider({
            per_slider: 16,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        new_members_slider  = new List_Slider({
            per_slider: 16,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        all_members_slider  = new List_Slider({
            per_slider: 16,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        global_filter = new Global_Filter({
            onChange: function(filter) {
                $.getJSON(server + 'youtubers?' + $.param({
                    console: filter.id,
                    game: 'all'
                }), function(result) {
                    latest_games_slider.reload(transform_games(result.games));
                    featured_games_slider.reload(transform_games(result.featured_games));
                    // popular_members_slider.reload(transform_youtubers(result.popular_youtubers));
                    // new_members_slider.reload(transform_youtubers(result.new_youtubers));
                    // all_members_slider.reload(transform_youtubers(result.youtubers));
                });
            }
        }),
        transform_games = function(data) {
            return data.map(function(item) {
                item.game = item.name;
                item.id = item.id.trim();
                return item;
            });
        },
        transform_youtubers = function(data) {
            return data.map(function(item) {
                item.user_id    = item.userId;
                item.title      = item.video.snippet.title;
                item.thumb      = item.video.snippet.thumbnails.medium.url;
                item.view       = item.video.snippet.meta.statistics.viewCount;
                item.comment    = item.video.snippet.meta.statistics.commentCount;
                item.channelid  = item.youtube_id;
                item.live       = '';
                item.provider   = attachments_server;
                item.videoid    = item.video.snippet.resourceId.videoId;
                item.bust       = 1;
                return item;
            });
        };

        global_filter
            .init()
            .mount($('#global-filter'));

        games_tab
            .init()
            .addTab('tab-2-1', '最新遊戲', 'tab-2-1', $('<div id="latestGames" class="collection"/>'))
            .addTab('tab-2-2', '精選遊戲', 'tab-2-2', $('<div id="featuredGames" class="collection"/>'))
            .mount($('#games-tabs'));

        videos_tab
            .init()
            .addTab('tab-2-1', '熱門YouTuber', '熱門YouTuber', $('<div id="container-popular-member"/>'))
            .addTab('tab-2-2', '新實況咖成員', '新實況咖成員', $('<div id="container-new-member"/>'))
            .addTab('tab-2-3', 'All', 'All', $('<div id="container-all-member"/>'))
            .mount($('#video-tabs'));

        latest_games_slider
            .init(transform_games(page_data.games))
            .mount($('#latestGames'));

        featured_games_slider
            .init(transform_games(page_data.featured_games))
            .mount($('#featuredGames'));

        popular_members_slider
            .init(transform_youtubers(page_data.popular_youtubers))
            .mount($('#container-popular-member'));

        new_members_slider
            .init(transform_youtubers(page_data.new_youtubers))
            .mount($('#container-new-member'));

        all_members_slider
            .init(transform_youtubers(page_data.youtubers))
            .mount($('#container-all-member'));

    require('Footer/index');
});

require(['youtubers']);