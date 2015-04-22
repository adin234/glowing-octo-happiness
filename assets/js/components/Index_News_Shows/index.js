/*global
    server,
    template
*/

'use strict';

define(function(require) {

    return function Index_News_Shows(index_data) {

        var newsShowsTpl = require('text!./news-shows.html'),
            html = [],
            blocks = '',
            max_items = 4,
            ctr = 1,
            visible_news_playlists = (typeof index_data.visible_news_playlists !== 'undefined') ?
                                    index_data.visible_news_playlists.split(',') : [],
            visible_shows_playlists = (typeof index_data.visible_shows_playlists !== 'undefined') ?
                                    index_data.visible_shows_playlists.split(',') : [];

        index_data.news_playlists.forEach(function(playlist, index) {
            if (visible_news_playlists.indexOf(playlist.id) === -1) {
                return;
            }
            // blocks = '<div id="tab-news-playlist-' + index + '"><ul class="list clearFix">';
            // blocks += '</ul></div>';
            // $('#news_shows_playlists_block').append(blocks);

            $.ajax({
                url: server + 'news',
                dataType: 'json',
                async: true,
                data: {
                    playlist: playlist.id
                },
                success: function(result) {
                    ctr = 1;
                    result.items.forEach(function(item) {
                        var newsShows;
                        if (item.status.privacyStatus === 'public') {
                            if (ctr > max_items) {
                                return;
                            }
                            if (typeof item.snippet.thumbnails !== 'undefined') {
                                item.thumb = item.snippet.thumbnails.medium.url;
                            } else {
                                item.thumb = null;
                            }
                            item.title = item.snippet.title;
                            item.link = '/news/#!/playlist/' + playlist.id + '/video/' +
                                item.snippet.resourceId.videoId;
                            newsShows = template(newsShowsTpl, item);
                            $('#tab-news-playlist-' + index + ' ul').append(newsShows);
                            ctr++;
                        }
                    });
                }
            });

            html.push('<li><h2><a href="#tab-news-playlist-' + index + '">' + playlist.snippet.title +
                '</a></h2></li>');
        });

        index_data.shows_playlists.forEach(function(playlist, index) {
            if (visible_shows_playlists.indexOf(playlist.id) === -1) {
                return;
            }
            // blocks = '<div id="tab-shows-playlist-' + index + '"><ul class="list clearFix">';
            // blocks += '</ul></div>';
            // $('#news_shows_playlists_block').append(blocks);

            $.ajax({
                url: server + 'shows',
                dataType: 'json',
                async: true,
                data: {
                    playlist: playlist.id
                },
                success: function(result) {
                    ctr = 1;
                    result.items.forEach(function(item) {
                        if (item.status.privacyStatus === 'public') {
                            if (ctr > max_items) {
                                return;
                            }
                            if (typeof item.snippet.thumbnails !== 'undefined') {
                                item.thumb = item.snippet.thumbnails.medium.url;
                            } else {
                                item.thumb = null;
                            }
                            item.title = item.snippet.title;
                            item.link = '/shows/#!/playlist/' + playlist.id + '/video/' +
                                item.snippet.resourceId.videoId;
                            $('#tab-shows-playlist-' + index + ' ul').append(template(newsShowsTpl, item));
                            ctr++;
                        }
                    });
                }
            });

            html.push('<li><h2><a href="#tab-shows-playlist-' + index + '">' + playlist.snippet.title +
                '</a></h2></li>');
        });

        // $('#news_shows_playlists').html(html.join(''));

    };
});