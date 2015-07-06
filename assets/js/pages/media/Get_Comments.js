/*global
	server,
	utilUser,
	attachments_server,
	community,
	template,
	showComment: true,
    page_data
*/

'use strict';

define(function(require) {

    var formatDate = require('./Format_Date'),
        comments_tpl = require('./../templates/media-comments.html'),
        comment_item_tpl = require('./../templates/media-comment-item.html');

    return function Get_Comments(videoId, sort) {

      if ($('body').hasClass('shows') || $('body').hasClass('news')) {
        $('.tabs > ul > li:last').hide();
        $('#tab-2').hide();
        return;
      }

        sort = sort || 'latest';
        $.getJSON(server + 'youtubers/videos/' + videoId + '/comment', function(e) {
            if (sort === 'last') {
                e = e.sort(function(a, b) {
                    return a.date - b.date;
                });
            }

            var comments = e.map(function(item) {
                var that_class = '',
                    currUrl = window.location.href,
                    hashes = window.location.hash.replace('#!', '').split('/');

                if (hashes.indexOf('comment') !== -1) {
                    hashes[hashes.indexOf('comment') + 1] = item.comment_id;
                } else {
                    hashes = ['', 'comment', item.comment_id].concat(hashes.splice(1));
                }

                if (utilUser.get() && +utilUser.get().user_id === +item.user_id) {
                    that_class = 'deleteComment';
                } else {
                    that_class = 'hide';
                }
                return {
                    userimage: attachments_server + 'avatar.php?userid=' +
                        item.user_id + '.jpg',
                    userprofile: community + 'index.php?members/' +
                        item.username + '.' + item.user_id + '/',
                    username: item.username,
                    comment: item.message,
                    share_link: encodeURIComponent(
                        window.location.href.replace(
                            window.location.hash,
                            ''
                        ) +
                        '#!' + hashes.join('/')
                    ),
                    date: formatDate(item.date * 1000),
                    comment_id: item.comment_id,
                    user_access_class: that_class,
                    image_link: encodeURIComponent(
                        'https://i.ytimg.com/vi/' +
                        videoId + '/mqdefault.jpg'
                    ),
                    current_url: encodeURIComponent(currUrl)
                };
            });

            var commentsHTML = comments.map(function(item) {
                return template(comment_item_tpl, item);
            }).join('');

            page_data.commentsLength = comments.length;
            $('#tab-2 .mCSB_container')
                .html(
                    template(
                        comments_tpl, {
                            count: e.length,
                            video: videoId,
                            comments: commentsHTML,
                            sortlatest: sort === 'latest' ? 'current' : '',
                            sortlast: sort === 'last' ? 'current' : ''
                        }
                    )
                )
                .promise()
                .done(function() {
                    if (utilUser.get()) {
                        $('img.userImg').attr('src', utilUser.get().links.avatar);
                    }

                    if (showComment) {
                        showComment = document.getElementById(showComment);
                        if (showComment) {
                            document.getElementById(showComment).scrollIntoView();
                        }
                    }
                });
        });
    };
});
