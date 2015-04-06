/*global
    attachments_server,
    page_data,
    server
*/

'use strict';

define(function(require) {

    var Tabs = require('components/Tabs/index'),
        Global_Filter = require('components/Global_Filter/index'),
        List_Slider = require('components/List_Slider/index'),
        game_tpl    = require('text!./templates/game-tpl.html'),
        video_tpl = require('text!./templates/video-slide.html'),

        games_tab = new Tabs({hash_change: false}),
        videos_tab = new Tabs({hash_change: false}),
        latest_games_slider = new List_Slider({
            per_slider: 12,
            item_template: game_tpl,
            $list_container: $('<ul class="game clearFix"/>')
        }),
        featured_games_slider = new List_Slider({
            per_slider: 12,
            item_template: game_tpl,
            $list_container: $('<ul class="game clearFix"/>')
        }),
        popular_members_slider = new List_Slider({
            per_slider: 16,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        new_members_slider = new List_Slider({
            per_slider: 16,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
        }),
        all_members_slider = new List_Slider({
            per_slider: 16,
            item_template: video_tpl,
            $list_container: $('<ul class="list clearFix"/>')
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
        },
        latest_games    = transform_games(page_data.games),
        featured_games  = transform_games(page_data.featured_games),
        popular_members = transform_youtubers(page_data.popular_youtubers),
        new_members     = transform_youtubers(page_data.new_youtubers),
        all_members     = transform_youtubers(page_data.youtubers),
        filter_page = function() {
            $.getJSON(server + 'youtubers?' + $.param({
                    console: console_filter,
                    game: game_filter
                }), function(result) {
                    latest_games_slider.reload(transform_games(result.games));
                    featured_games_slider.reload(transform_games(result.featured_games));
                    popular_members_slider.reload(transform_youtubers(result.popular_youtubers));
                    new_members_slider.reload(transform_youtubers(result.new_youtubers));
                    all_members_slider.reload(transform_youtubers(result.youtubers));
                }
            );
        },
        global_filter = new Global_Filter({
            onChange: function(filter) {
                console_filter = filter.id;
                filter_page();
            }
        }),
        console_filter = 'all',
        game_filter = 'all';


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
        .init(latest_games)
        .mount($('#latestGames'));

    featured_games_slider
        .init(featured_games)
        .mount($('#featuredGames'));

    popular_members_slider
        .init(popular_members)
        .mount($('#container-popular-member'));

    new_members_slider
        .init(new_members)
        .mount($('#container-new-member'));

    all_members_slider
        .init(all_members)
        .mount($('#container-all-member'));

    require('components/Footer/index');
    require('components/Sub_Nav/index');
});