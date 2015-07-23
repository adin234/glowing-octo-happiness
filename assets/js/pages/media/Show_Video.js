/*global
	page_data: true,
	Autolinker,
	active_playlist,
	origin,
	server,
	showSocialButtons
*/

'use strict';

define(function(require) {
    
    var getVideo = require('./Get_Video'),
        getPhoto = require('./Get_Photo'),
        getComments = require('./Get_Comments'),
        updatePrevNext = require('./Update_Prev_Next'),
        updateSuggestions = require('./Update_Suggestions');

    return function Show_Video(videoId, list) {
        var video = getVideo(videoId, list);

        if (video) {
            var likeButton = '',
                text = '加入至我的最愛',
                active = '';

            if (typeof page_data.favorites === 'undefined') {
                page_data.favorites = [];
            }

            if (typeof page_data.favorites !== 'undefined') {

                if (~page_data.favorites.indexOf(videoId)) {
                    text = '從我的最愛移除';
                    active = 'active';
                }

                likeButton = '<button id="like" class="like ' + active +
                    '" alt="like" data-id="' + videoId +
                    '">' + text + '</button>';
            }

            $('.videoHeading h3').html(video.snippet.title + likeButton);
            $('#tab-1 .mCSB_container').html(
                Autolinker.link(
                    video.snippet.description.replace(/(?:\r\n|\r|\n)/g, '<br />')
                )
            );
            $('.videoItem').removeClass('current');
            $('#video-' + videoId).addClass('current');
            $('#ytplayer').attr('src', 'https://www.youtube.com/embed/' +
                videoId + (active_playlist ? '/?list=' + active_playlist +
                    '&' : '?') + 'autoplay=true&enablejsapi=1&origin=' + origin
            );

            $.get(
                server + 'vid_suggestions',
                { search: video.engtitle || video.snippet.title },
                updateSuggestions
            );

            if (!page_data.config || !page_data.config.channel) {
                getPhoto(video.snippet.channelId, $('.videoHeading > img'));
            }

            page_data.videoId = videoId;

            getComments(videoId);
            
            showSocialButtons(
                'https://i.ytimg.com/vi/' + videoId + '/default.jpg',
                encodeURIComponent(video.snippet.description),
                encodeURIComponent(video.snippet.title)
            );

            updatePrevNext();
        }

    };
});
