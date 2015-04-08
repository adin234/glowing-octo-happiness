define (
	[
		'components/shows/Get_Photo',
		'components/shows/Update_Videos'
	],
	function (
		Get_Photo,
		Update_Videos
	) {
		return function First_Load () {
            return {
                init: function(page_data) {

                	var getPhoto = new Get_Photo(),
                		update_videos = new Update_Videos();

                	var tag = document.createElement('script'),
    					firstScriptTag = document.getElementsByTagName('script')[0];

					tag.src = 'https://www.youtube.com/iframe_api';
					firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

					$(document).on('load-page', function () {

					    if ($('body').hasClass('game_page')) {
					        var name = page_data.game_name.name ? page_data.game_name.name : '';
					        $('.profile .info h1').html(name);
					    }

					    if (page_data.config && page_data.config.channel && typeof page_data.config.channel === 'string') {
					        getPhoto.init(page_data.config.channel, $('.videoHeading > img'));
					    }

					    page_data.categories.forEach(function (item, i) {
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
					    update_videos.init(page_data.videos, null, 1);

					    var thumbs = typeof page_data.videos[0] !== 'undefined' ? page_data.videos[0].snippet.thumbnails : typeof page_data
					        .playlists[0] !== 'undefined' ? page_data.playlists[0].snippet.thumbnails : '';

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

					    // update_playlists(page_data.playlists);

					    
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

					    
					    $(window).trigger('hashchange');
					});



                }
            };
		};
	}
);