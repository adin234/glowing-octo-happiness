/*global
    html: true,
    filterConsole,
    tempdata: true,
    template,
    isPlaying,
    page_data
*/

'use strict';

define(function(require) {

    var willPlay = require('./Will_Play'),
        playlist_item_tpl = require('text!./../templates/media-playlist-item.html'),
        categories_tpl = require('text!./../templates/media-categories.html');

    return function Update_Playlists(playlist) {

        html = [];

        var ids = [],
            cons = '',
            source = playlist_item_tpl;


        if ($('body').hasClass('news') || $('body').hasClass('shows')) {
            source = categories_tpl;
        }

        var visible_playlists = (typeof page_data.visible_playlists !== 'undefined') ?
            page_data.visible_playlists.split(',') : [];

        if (typeof filterConsole !== 'undefined' && filterConsole.trim().length) {
            cons = 'console/' + filterConsole + '/';
        }

        playlist.forEach(function(item) {
            if (~ids.indexOf(item.id)) {
                return;
            }

            if ($('body').hasClass('news') || $('body').hasClass('shows')) {
                if (visible_playlists.indexOf(item.id) === -1) {
                    return;
                }
            }

            ids.push(item.id);
            if (!item.snippet.thumbnails) {
                return;
            }

            tempdata = {
                id: 'playlist-' + item.id,
                link: '#!/' + cons + 'playlist/' + item.id,
                title: item.snippet.title,
                thumb: item.snippet.thumbnails.default.url,
                desc: item.snippet.description
            };


            html.push(template(source, tempdata));
        });
        if (!html.length) {
            html.push('請將影片加至您的"我的最愛"播放清單!');
            $('.listSwitch').addClass('no-playlist');
            $('#videosToggle').trigger('click');
            console.log($('#videos li.videoItem'));
            if ($('#videos li.videoItem > a').length) {
                var link = $('#videos li.videoItem > a').first().attr('href').replace('#', '');
                if (!isPlaying && !willPlay()) {
                    window.location.hash = link;
                }
            } else {

            }
        } else {
            $('.game_page .listSwitch').removeClass('no-playlist');
        }


        if ($('body').hasClass('news') || $('body').hasClass('shows')) {
            $('.listSwitch').addClass('no-playlist');
            $('#videosToggle').trigger('click');
            $('#categories').html(html.join(''));
        }
        $('#playlists .mCSB_container').html(html.join(''));
    };
});
