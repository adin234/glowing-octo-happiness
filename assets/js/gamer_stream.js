$(function() {
    var twitchid = utilHash.getHashArr()[0];
    $('#twitchStream').html(template($('#twitch-stream-tpl').html(),{twitchid: twitchid}));
    $('#twitchTalk').html(template($('#twitch-chat-tpl').html(),{twitchid: twitchid}));
});
