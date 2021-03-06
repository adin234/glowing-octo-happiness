var liveStreamLink = false;
var filterConsole = 'all';

var add_filter_category = function (string, context) {
    utilHash.changeHashVal('console', string);
}

function filter_category(gameConsole) {
    var videos = [];
    var context = $('.species a[data-console=' + gameConsole + ']');

    if (gameConsole == filterConsole) {
        return;
    }

    context.parent().siblings().removeClass('current');
    context.parent().addClass('current');

    filterConsole = gameConsole;

    if (gameConsole != 'vlogs') {
        renderGame();
    }
    else {
        filter_vlogs();
    }

    videos = page_data.videos.filter(function (item) {
        return ~(item.snippet.meta.tags.indexOf('anytv_console_' + filterConsole));
    });

    $('#videosToggle').trigger('click');

    update_videos(videos);
}

function renderGame() {
    html = [];
    page_data.games_cast.forEach(function (item) {
        item.consoles = item.consoles || [];
        if (!~item.consoles.indexOf(filterConsole)) return;
        html.push(template($('#gamesCastTpl').html(), item));
    });
    $('#tab-4').mCustomScrollbar({
        theme: 'inset-2'
    });

    if (!html.length) {
        html.push('目前沒有遊戲');
    }

    $('#tab-4 .mCSB_container ul').html(html.join(''));
    $('.tooltip').tooltipster({
        contentAsHTML: true
    });

}

renderGame();

$('#banner .info > cite').html(page_data.user.username);
$('#banner .info > a').attr('href', community + 'index.php?members/' + page_data.user.username + '.' + page_data.user.user_id);
$('#banner .info > img').attr('src', attachments_server + 'avatar.php?userid=' + page_data.user.user_id + '.jpg');
twitchId = page_data.user.custom_fields.twitchStreams || null;
youtubeId = page_data.user.custom_fields.youtube_id || null;
$.get(server + 'streamers?user=' + page_data.user.user_id, function (result) {
    if (result.streamers.length) {
        liveStreamLink = '/gamer_stream/?user=' + page_data.user.user_id + '/#!/' + 'TW' + result.streamers[0].twitch
            .channel.name
    }

    if (liveStreamLink) {
        $('.live-button').attr('href', liveStreamLink).show();
    }
});

$.get(server + 'streamers/youtube?user=' + page_data.user.user_id, function (result) {
    if (result.streamers.length) {
        liveStreamLink = '/gamer_stream/?user=' + page_data.user.user_id + '/#!/' + 'YT' + result.streamers[0].youtube
            .id;
    }

    if (liveStreamLink) {
        $('.live-button').attr('href', liveStreamLink).show();
    }
});

// $('#responsive-menu-button').sidr({
//  name: 'sidr-main',
//  source: '#navigation',
//  renaming: false
// });

// if ($(window).width() < 1024) {
//   $(".videoHeading").insertBefore($(".videoList"));
//   $(".channel").insertBefore($(".playFunctionBtn"));
// }

var add_buttons = function () {
    var inner = "";
    //ADD YOUTUBE BUTTON
    var youtube_channel = page_data.config.channel;
    if (youtube_channel) {
        inner = '<div class="g-ytsubscribe" data-channelid="' + youtube_channel +
            '" data-layout="default" data-theme="dark" ' + 'data-count="hidden" data-onytevent="onYtEvent"></div>';
        $("#youtube-subscribe").html(inner);
        console.log("ADD");
    }
    else {
        console.log("DON'T ADD");
        $("youtube-subscribe").remove();
    }
    //ADD FACEBOOK BUTTON
    var facebook = page_data.user.custom_fields.facebook;
    var inner = "";
    if (facebook) {
        console.log("ADD");
        inner = '<div class="fb-like" ' + 'data-href="https://www.facebook.com/' + facebook +
            '" data-layout="button" ' + ' data-action="like" </div>';
        $("#facebook-like").html(inner);
    }
    else {
        console.log("DON'T ADD");
        $("a.facebook-like-button").remove();
    }
    //ADD TWITTER BUTTON
    var twitter = page_data.user.custom_fields.twitter;
    if (twitter) {
        console.log("ADD");
        inner = '<a href="https://twitter.com/' + twitter + '" class="twitter-follow-button" ' +
            'data-show-count="false" data-size="large"></a>';
        $("#twitter-follow").html(inner);
        twitter.widgets && twttr.widgets.load();
    }
    else {
        console.log("DON'T ADD");
        $("#twitter-follow").remove();
    }
}

add_buttons();

