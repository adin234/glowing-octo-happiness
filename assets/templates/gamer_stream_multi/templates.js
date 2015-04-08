(function() {
window["JST"] = window["JST"] || {};

window["JST"]["chatms.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<tr id="trms-{cid}">\r\n  <td>\r\n    <div id="usericon-{cid}" class="usericon">\r\n      <img id="uavatar-{cid}" class="uavatar" alt="userimage" height="46px" width="46px" src="{avatar}">\r\n    </div>\r\n    <div id="chat-message-{cid}" class="chat-message">\r\n      <label id="uname">\r\n        {username}\r\n      </label>\r\n      <p id="imsg" class="message">\r\n        {message}\r\n      </p>\r\n      <label id="timestamp-{cid}" class="timestamp">\r\n        {timesent}\r\n      </label>\r\n    </div>\r\n  </td>\r\n</tr>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["chatui.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="chid-{cid}" class="chid">\r\n  {cid}\r\n</div>\r\n<div id="chcontainer-{cid}" class="chcontainer">\r\n  <table id="tblchatmsgs-{cid}" class="tblchatmsgs">\r\n  </table>\r\n</div>\r\n<div id="chatinputs-{cid}" class="chatinputs">\r\n  <input type="text" id="msgs-{cid}" class="msgs">\r\n  <button id="btn-{cid}" class="btnSend">SEND</button>\r\n</div>\r\n<div id="notifylogin-{cid}" class="chatinputs" style="display:none;">\r\n  <span class="spandex">\r\n    <a href="javascript:utilLogin.show();" style="text-decoration: none; color:#3366FF;" >登入開始聊天</a>. \r\n  </span>\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gchat-tab-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="chat-{{ChannelId}}">\r\n  <a href="#gchat-{{ChannelId}}">\r\n    {{ChannelId}}\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gchat-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="gchat-{{ChannelId}}" style="display:block; height:100%;"></div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gchatnotify.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<tr id="trnotify-{cid}">\r\n  <td>\r\n    <div class="notifier">\r\n      <p id="notifymsg-{cid}" class="message">\r\n        {gchat-message}\r\n      </p>\r\n    </div>\r\n  </td>\r\n</tr>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["hitbox-chat-tab-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="chat-{{TWITCHID}}">\r\n  <a href="#tab-chat-{{TWITCHID}}">\r\n    {{TWITCHID}}\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["hitbox-chat-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="chat-{{TWITCHID}}" id="tab-chat-{{TWITCHID}}">\r\n  <iframe src="http://www.hitbox.tv/embedchat/{{TWITCHID}}?autoconnect=true" width="100%" height="640px">\r\n  </iframe>\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["hitbox-stream-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="twitchStream">\r\n  <div class="videoWrapper">\r\n    <iframe width="100%" height="100%" src="http://hitbox.tv/#!/embed/{{TWITCHID}}?autoplay=true" frameborder="0" allowfullscreen></iframe>\r\n    <a href="javascript:;" class="close remove-stream" data-id="HB{{TWITCHID}}" title="Close">Close</a>\r\n  </div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["streamlist-item-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\r\n  <a href="javascript:;" class="{{class}}" title="{{TITLE}}" data-id="{{ID}}">\r\n    <img src="{{THUMB}}" width="110" height="62" al t="{{TITLE}}">\r\n    <h3>\r\n      {{TITLE}}\r\n    </h3>\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["twitch-chat-tab-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="chat-{{TWITCHID}}">\r\n  <a href="#tab-chat-{{TWITCHID}}">\r\n    {{TWITCHID}}\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["twitch-chat-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="chat-{{TWITCHID}}" id="tab-chat-{{TWITCHID}}">\r\n  <iframe src="http://www.twitch.tv/{{TWITCHID}}/chat?popout=true" width="100%" height="640px">\r\n  </iframe>\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["twitch-stream-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="twitchStream" class="stream-item">\r\n  <div class="videoWrapper">\r\n    <object type="application/x-shockwave-flash" height="100%" width="100%" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel={{TWITCHID}}" bgcolor="#000000">\r\n      <param name="allowFullScreen" value="true" />\r\n      <param name="allowScriptAccess" value="always" />\r\n      <param name="allowNetworking" value="all" />\r\n      <param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" />\r\n      <param name="flashvars" value="hostname=www.twitch.tv&channel={{TWITCHID}}&auto_play=true&start_volume=70" />\r\n    </object>\r\n    <a href="javascript:;" class="close remove-stream" data-id="TW{{TWITCHID}}" title="Close">Close</a>\r\n  </div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["youtube-stream-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="twitchStream" class="stream-item">\r\n  <div class="videoWrapper">\r\n    <object height="100%" width="100%" id="live_embed_player_flash">\r\n      <param name="movie" value="//www.youtube.com/v/{{YOUTUBEID}}?hl=en_US&amp;version=3"></param>\r\n      <param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param>\r\n      <embed src="//www.youtube.com/v/{{YOUTUBEID}}?hl=en_US&amp;version=3&autoplay=1" type="application/x-shockwave-flash" width="100%" height="100%" allowscriptaccess="always" allowfullscreen="true"></embed>\r\n    </object>\r\n    <a href="javascript:;" class="close remove-stream" data-id="YT{{YOUTUBEID}}" title="Close">Close</a>\r\n  </div>\r\n</div>\r\n';

}
return __p
}})();