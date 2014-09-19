$(window).load(function(){
    $("#streamArea").mCustomScrollbar({
        theme:"inset-2",
    });
});

$(function() {
    var twitch_ids = utilHash.getHashArr();
    twitch_ids.forEach(function(item) {
        $('#twitchStream').append(template($('#twitch-stream-tpl').html(),{twitchid: item}));
        $('#twitch-chat-frame-container').append(template($('#twitch-chat-tpl').html(),{twitchid: item}));
        $('#twitch-chat-tab-container').append(template($('#twitch-chat-tab-tpl').html(),{twitchid: item}))
    });
    $(".tabs").tabslet({
        animation: true,
    });
});
