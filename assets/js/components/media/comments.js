/*global
    page_data,
    getComments,
    utilUser,
    server,
    template,
    JST,
    attachments_server,
    community,
    formatDate,
    utilLogin,
    utilCookie
*/
'use strict';

$(function() {

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
                            JST['commentItemTpl.html'](),
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

    $(document).on('load-page', function() {
        $('body').on('focus', '#commentArea', function () {
            if (!utilCookie.get('user')) {
                utilLogin.show();
            }
        });
    });

});