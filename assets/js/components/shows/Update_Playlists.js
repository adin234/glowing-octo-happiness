/*global
    html: true,
    JST,
    filterConsole,
    tempdata: true,
    template,
    isPlaying
*/

'use strict';

define (
    [
        'components/shows/Will_Play'
    ],
	function (
        willPlay
    ) {
		return function Update_Playlists (p_data) {

            html = [];

            var ids = [],
                cons = '',
                source = JST['playlistTpl.html']();
            

            if ($('body').hasClass('news') || $('body').hasClass('shows')) {
                source = JST['categoriesTpl.html']();
            }

            var visible_playlists = (typeof p_data.visible_playlists !== 'undefined') ?
                p_data.visible_playlists.split(',') :
                [];

            if (typeof filterConsole !== 'undefined' && filterConsole.trim().length) {
                cons = 'console/' + filterConsole + '/';
            }

            p_data.playlists.forEach(function (item) {
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
                if ($('#videos li.videoItem > a').length) {
                    var link = $('#videos li.videoItem > a').first().attr('href').replace('#', '');
                    if (!isPlaying && !willPlay()) {
                        window.location.hash = link;
                    }
                }
                else {

                }
            }
            else {
                $('.game_page .listSwitch').removeClass('no-playlist');
            }


            if ($('body').hasClass('news') || $('body').hasClass('shows')) {
                $('.listSwitch').addClass('no-playlist');
                $('#videosToggle').trigger('click');
                $('#categories').html(html.join(''));
            }
            $('#playlists .mCSB_container').html(html.join(''));
        };
	}
);