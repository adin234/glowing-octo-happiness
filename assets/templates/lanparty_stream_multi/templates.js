(function() {
window["JST"] = window["JST"] || {};

window["JST"]["chatms.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<tr id="trms-{cid}">\n  <td>\n    <div id="usericon-{cid}" class="usericon">\n      <img id="uavatar-{cid}" class="uavatar" alt="userimage" height="46px" width="46px" src="{avatar}">\n    </div>\n    <div id="chat-message-{cid}" class="chat-message">\n      <label id="uname">\n        {username}\n      </label>\n      <p id="imsg" class="message">\n        {message}\n      </p>\n      <label id="timestamp-{cid}" class="timestamp">\n        {timesent}\n      </label>\n    </div>\n  </td>\n</tr>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["chatui.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="chid-{cid}" class="chid">\n  {cid}\n</div>\n<div id="chcontainer-{cid}" class="chcontainer">\n  <table id="tblchatmsgs-{cid}" class="tblchatmsgs">\n  </table>\n</div>\n<div id="chatinputs-{cid}" class="chatinputs">\n  <input type="text" id="msgs-{cid}" class="msgs">\n  <button id="btn-{cid}" class="btnSend">SEND</button>\n</div>\n<div id="notifylogin-{cid}" class="chatinputs" style="display:none;">\n  <span class="spandex"><a href="javascript:utilLogin.show();" style="text-decoration: none; color:#3366FF;" >登入開始聊天</a>. </span>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gchat-tab-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="chat-{{ChannelId}}">\n  <a href="#gchat-{{ChannelId}}">\n    {{ChannelId}}\n  </a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gchat-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="gchat-{{ChannelId}}" style="display:block; height:100%;"></div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gchatnotify.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<tr id="trnotify-{cid}">\n  <td>\n    <div class="notifier">\n      <p id="notifymsg-{cid}" class="message">\n        {gchat-message}\n      </p>\n    </div>\n  </td>\n</tr>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["streamlist-item-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\n  <a href="javascript:;" class="{{class}}" title="{{TITLE}}" data-id="{{ID}}">\n    <img src="{{THUMB}}" width="110" height="62" al t="{{TITLE}}">\n    <h3>\n      {{TITLE}}\n    </h3>\n  </a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["twitch-chat-tab-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="chat-{{TWITCHID}}">\n  <a href="#tab-chat-{{TWITCHID}}">\n    {{TWITCHID}}\n  </a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["twitch-chat-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="chat-{{TWITCHID}}" id="tab-chat-{{TWITCHID}}">\n  <iframe src="http://www.twitch.tv/{{TWITCHID}}/chat?popout=true" width="100%" height="640px">\n  </iframe>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["twitch-stream-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="twitchStream" class="stream-item">\n  <div class="videoWrapper">\n    <object type="application/x-shockwave-flash" height="100%" width="100%" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel={{TWITCHID}}" bgcolor="#000000">\n      <param name="allowFullScreen" value="true" />\n      <param name="allowScriptAccess" value="always" />\n      <param name="allowNetworking" value="all" />\n      <param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" />\n      <param name="flashvars" value="hostname=www.twitch.tv&channel={{TWITCHID}}&auto_play=true&start_volume=25" />\n    </object>\n    <a href="javascript:;" class="close remove-stream" data-id="TW{{TWITCHID}}" title="Close">\n      Close\n    </a>\n  </div>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["youtube-stream-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="twitchStream" class="stream-item">\n  <div class="videoWrapper">\n    <object height="100%" width="100%" id="live_embed_player_flash"><param name="movie" value="//www.youtube.com/v/{{YOUTUBEID}}?hl=en_US&amp;version=3"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="//www.youtube.com/v/{{YOUTUBEID}}?hl=en_US&amp;version=3&autoplay=1" type="application/x-shockwave-flash" width="100%" height="100%" allowscriptaccess="always" allowfullscreen="true"></embed></object>\n    <a href="javascript:;" class="close remove-stream" data-id="YT{{YOUTUBEID}}" title="Close">\n      Close\n    </a>\n  </div>\n</div>\n';

}
return __p
}})();