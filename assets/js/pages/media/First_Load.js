/*global
	html,
	template,
	server,
	hash,
	activeVideos: true,
	active_comments,
	utilUser,
    attachments_server,
    community,
    utilLogin,
    utilCookie
*/

'use strict';

define(function(require) {

    var getPhoto = require('./Get_Photo'),
        update_videos = require('./Update_Videos'),
        update_playlists = require('./Update_Playlists'),
        getComments = require('./Get_Comments'),
        formatDate = require('./Format_Date'),
        categories_tpl = require('text!./../templates/media-categories.html'),
        comment_item_tpl = require('text!./../templates/media-comment-item.html');

    return function First_Load(page_data) {

    	/* YOUTUBE SHIZZ */
        var tag = document.createElement('script'),
            firstScriptTag = document.getElementsByTagName('script')[0];

        tag.src = 'https://www.youtube.com/iframe_api';
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        if ($('body').hasClass('game_page')) {
            var name = page_data.game_name.name ? page_data.game_name.name : '';
            $('.profile .info h1').html(name);
        }

        if ($('#youtuberPage').length) {
            $('#banner .info > cite').html(page_data.user.username);
            $('#banner .info > a').attr('href', community + 'index.php?members/' +
                page_data.user.username + '.' + page_data.user.user_id);
            $('#banner .info > img').attr('src', attachments_server + 'avatar.php?userid=' +
                page_data.user.user_id + '.jpg');
        }

        if (page_data.config && page_data.config.channel && typeof page_data.config.channel === 'string') {
            getPhoto(page_data.config.channel, $('.videoHeading > img'));
        }

        page_data.categories.forEach(function(item) {
            html.push(
                template(
                    categories_tpl,
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


        if (utilUser.get('user') && typeof utilUser.get('user') !== 'undefined') {
            $.ajax({
                    dataType: 'jsonp',
                    url: server + 'favorite-ids',
                    crossDomain: true,
                    type: 'get'
                })
                .always(function(result) {
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
                onScroll: function() {
                    if (this.mcs.topPct >= 75) {
                        update_videos(activeVideos, true);
                    }
                }
            }
        });

        $('aside.recommend > ul').mCustomScrollbar({
		    theme: 'inset-2'
		});

        $('ul.resize').click(function() {
            var $body = $('body'),
                $zoom = $('.zoom'),
                $resize = $('ul.resize li:first-child');
            $body.toggleClass('zoom2x');
            if ($body.hasClass('zoom2x')) {
                $resize.html('X2');
            } else {
                $resize.html('X1');
            }

            $zoom.toggleClass('zoomOut');
        });


        $('.listSwitch li').click(function() {
            if (!$(this).hasClass('current')) {
                $('.listSwitch li').toggleClass('current');
                $('.playList.toggleList').toggleClass('current');
            } else if ($(this).attr('id') === 'videosToggle' && !hash.length) {}
        });

        $('li#playlistsToggle').on('click', function() {
            $('.playFunctionBtn li').css({
                'visibility': 'hidden'
            });
        });

        $('li#videosToggle').on('click', function() {
            $('.playFunctionBtn li').css({
                'visibility': 'visible'
            });
        });

        $(document).on('click', '.sort-comments', function () {
            var el = $(this);
            var sort = el.hasClass('last') ? 'last' : 'latest';
            getComments(page_data.videoId, sort);
        });

        $('body').on('click', '#postComment', function () {
            var data = {
                    access_token: utilUser.get().access_code,
                    user_id: utilUser.get().user_id,
                    username: utilUser.get().username,
                    message: $('#commentArea').val()
                },
                videoId = $(this).attr('data-video');

            if (!$('#commentArea').val().trim().length) {
                return;
            }
            $.post(server + 'youtubers/videos/' + videoId + '/comment',
                data,
                function () {

                    page_data.commentsLength++;

                    $('.comments-list > a:first-child').html('所有留言 (' + page_data.commentsLength + ')');

                    $('#tab-2 .discussions')
                        .prepend(template(
                            template(
                                comment_item_tpl,
                                {
                                    userimage: attachments_server + 'avatar.php?userid=' +
                                        data.user_id + '.jpg',
                                    userprofile: community + 'index.php?members/' + data.username +
                                        '.' + data.user_id + '/',
                                    username: data.username,
                                    comment: data.message,
                                    date: formatDate(+new Date()),
                                    user_access_class: 'deleteComment',
                                    share_link: encodeURIComponent(window.location.href),
                                    image_link: encodeURIComponent(
                                            'https://i.ytimg.com/vi/' +
                                            videoId + '/mqdefault.jpg'
                                        )
                                }
                            )
                        ));
                    $('#commentArea').val('');
                }).fail(function () {
                utilLogin.show('An error occured, please login to continue');
                utilCookie.set('user', '', 0);
            });
        });

        $('body').on('focus', '#commentArea', function () {
            if (!utilCookie.get('user')) {
                utilLogin.show();
            }
        });

        $('body').on('click', 'button#like', function () {
            if (utilUser.get() === null) {
                utilLogin.show();
                return;
            }

            var $elem = $('button#like');
            var isActive = $elem.hasClass('active');
            var videoId = $elem.attr('data-id');

            var url = server + 'fav/' + videoId;
            if (isActive) {
                $elem.removeClass('active');
                $elem.html('加入至我的最愛');
                url = server + 'unfav/' + videoId;
                page_data.favorites = page_data.favorites.filter(function (item) {
                    return item !== videoId;
                });
                if ($('body').hasClass('favorites')) {
                    $('li[id=video-' + videoId + ']').hide();
                }
            }
            else {
                $elem.addClass('active');
                $elem.html('從我的最愛移除');
                page_data.favorites.push(videoId);
                $('li[id=video-' + videoId + ']').show();
            }

            $.ajax({
                dataType: 'jsonp',
                url: url,
                crossDomain: true,
                type: 'get'
            });

        });

        $('.yourDiscussion textarea').focus(function () {
            $('.angle').css('background-position', '0 -358px');
        });
        
        $('.yourDiscussion textarea').blur(function () {
            $('.angle').css('background-position', '0 -315px');
        });
        

        update_videos(page_data.videos, null, 1);

        $(window).trigger('hashchange');

        $(document).trigger('data-loaded');

        update_playlists(page_data);
    };
});
