/*global
	html,
	template,
	server,
	JST,
	hash,
	activeVideos: true,
	active_comments,
	utilUser
*/

'use strict';

define (function (require) {

		return function First_Load (page_data) {

			var getPhoto = require('components/shows/Get_Photo'),
				update_videos = require('components/shows/Update_Videos'),
				update_playlists = require('components/shows/Update_Playlists'),
				tag = document.createElement('script'),
				firstScriptTag = document.getElementsByTagName('script')[0];

			tag.src = 'https://www.youtube.com/iframe_api';
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		    if ($('body').hasClass('game_page')) {
		        var name = page_data.game_name.name ? page_data.game_name.name : '';
		        $('.profile .info h1').html(name);
		    }


		    if (page_data.config && page_data.config.channel && typeof page_data.config.channel === 'string') {
		        getPhoto(page_data.config.channel, $('.videoHeading > img'));
		    }

		    page_data.categories.forEach(function (item) {
		        html.push(
		            template(
		                JST['categoriesTpl.html'](),
		                item
		            )
		        );
		    });
		    if (!html.length) {
		        html.push('No Category Available');
		    }
		    $('#categories').html('');

		    $('li.ytVideo.videoItem').remove();
		    activeVideos = page_data.videos;
		    update_videos(page_data.videos, null, 1);

		    var thumbs = typeof page_data.videos[0] !== 'undefined' ?
		    	page_data.videos[0].snippet.thumbnails :
		    	typeof page_data.playlists[0] !== 'undefined' ?
		    	page_data.playlists[0].snippet.thumbnails : '';

		    if (false && page_data.playlists.length) {
		        page_data.playlists.splice(0, 0, {
		            id: 'UU' + page_data.config.channel.slice(2),
		            snippet: {
		                title: '最新影片',
		                channelId: page_data.config.channel,
		                description: '會員上傳',
		                thumbnails: thumbs
		            }
		        });
		    }

		    update_playlists(page_data);

		    
		    if (utilUser.get('user') && typeof utilUser.get('user') !== 'undefined') {
		        $.ajax({
		                dataType: 'jsonp',
		                url: server + 'favorite-ids',
		                crossDomain: true,
		                type: 'get'
		            })
		            .always(function (result) {
		                page_data.favorites = result;
		                $(window).trigger('hashchange');
		            });

		        return;
		    }

		    $('.tabs').tabslet({
			    animation: true,
			    active: 1
			 }).promise().done(function() {
			    if (active_comments) {
			        $('#tab-2').click();
			    }
			 });

			 $('#tab-1').mCustomScrollbar({
			    theme: 'inset-2'
			 });

			 $('#tab-2').mCustomScrollbar({
			    theme: 'inset-2'
			 });


		    $('.playList').mCustomScrollbar({
			    theme: 'inset-2',
			    callbacks: {
			        onScroll: function () {
			            if (this.mcs.topPct >= 75) {
			                update_videos(activeVideos, true);
			            }
			        }
			    }
			});

			$('ul.resize').click(function () {
		        var $body = $('body'),
		            $zoom = $('.zoom'),
		            $resize = $('ul.resize li:first-child');
		        $body.toggleClass('zoom2x');
		        if ($body.hasClass('zoom2x')) {
		            $resize.html('X2');
		        }
		        else {
		            $resize.html('X1');
		        }

		        $zoom.toggleClass('zoomOut');
		    });


		    $('.listSwitch li').click(function () {
		        if (!$(this).hasClass('current')) {
		            $('.listSwitch li').toggleClass('current');
		            $('.playList.toggleList').toggleClass('current');
		        }
		        else if ($(this).attr('id') === 'videosToggle' && !hash.length) {
		        }
		    });

		    $('li#playlistsToggle').on('click', function () {
		        $('.playFunctionBtn li').css({
		            'visibility': 'hidden'
		        });
		    });

		    $('li#videosToggle').on('click', function () {
		        $('.playFunctionBtn li').css({
		            'visibility': 'visible'
		        });
		    });

		    $(window).trigger('hashchange');
		};
	}
);