(function() {
window["JST"] = window["JST"] || {};

window["JST"]["ads.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="advert" id="advertisement-container" data-size="minified" data-status="full" style="background-color: black;">\n    {ADVERT}\n  <a href="javascript:void(0)" onClick="toggleChat();" class="minify-advert" style="font-size: medium; font-family: Calibri; color:#6666CC;">MINIFY</a>\n</div>\n';

}
return __p
}})();
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
__p += '<div id="chid-{cid}" class="chid">\n  {cid}\n</div>\n<div id="chcontainer-{cid}" class="chcontainer_single">\n  <table id="tblchatmsgs-{cid}" class="tblchatmsgs">\n  </table>\n</div>\n<div id="chatinputs-{cid}" class="chatinputs_single">\n  <input type="text" id="msgs-{cid}" class="msgs">\n  <button id="btn-{cid}" class="btnSend">\n    SEND\n  </button>\n</div>\n<div id="notifylogin-{cid}" class="chatinputs_single" style="display:none;">\n  <span class="spandex"><a href="javascript:utilLogin.show();" style="text-decoration: none; color:#3366FF;" >登入開始聊天</a>. </span>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gchatnotify.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<tr id="trnotify-{cid}">\n  <td>\n    <div class="notifier">\n      <p id="notifymsg-{cid}" class="message">{\n        gchat-message}\n      </p>\n    </div>\n  </td>\n</tr>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["hitbox-chat-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="twitch-container">\n    <iframe src="http://www.hitbox.tv/embedchat/{{TWITCHID}}?autoconnect=true" onload="toggleChat()" width="100%" height="100%" allowfullscreen>\n    </iframe>\n</div>\n<div class="advert" id="advertisement-container" data-size="minified" data-status="full">\n    {{ADVERT}}\n    <a href="javascript:void(0)" onClick="toggleChat();" class="minify-advert">MINIFY</a>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["hitbox-stream-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="twitchStream">\n  <div class="videoWrapper">\n    <iframe width="100%" height="97%" src="http://hitbox.tv/#!/embed/{{TWITCHID}}?autoplay=true" frameborder="0" allowfullscreen></iframe>\n  </div>\n  <span class="views">\n    {{NUMBER}} VIEWERS\n  </span>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["panelTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="panel">\n  <a href="{{LINK}}"><img src="{{IMAGE}}" alt="{{DESCRIPTION}}" /></a>\n  <div class="desc">\n    {{HTML}}\n  </div>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["twitch-chat-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="twitch-container">\n  <iframe src="http://www.twitch.tv/{{TWITCHID}}/chat?popout=true" onload="toggleChat()" width="100%" height="100%">\n  </iframe>\n</div>\n<div class="advert" id="advertisement-container" data-size="minified" data-status="full">\n    {{ADVERT}}\n  <a href="javascript:void(0)" onClick="toggleChat();" class="minify-advert">MINIFY</a>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["twitch-stream-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="twitchStream">\n  <div class="videoWrapper">\n    <object type="application/x-shockwave-flash" height="100%" width="100%" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel={{TWITCHID}}" bgcolor="#000000">\n      <param name="allowFullScreen" value="true" />\n      <param name="allowScriptAccess" value="always" />\n      <param name="allowNetworking" value="all" />\n      <param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" />\n      <param name="flashvars" value="hostname=www.twitch.tv&channel={{TWITCHID}}&auto_play=true&start_volume=70" />\n    </object>\n  </div>\n  <span class="views">\n  {{NUMBER}} VIEWERS\n  </span>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["youtube-stream-tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="twitchStream">\n  <div class="videoWrapper">\n    <object width="100%" height="100%">\n      <param name="movie" value="//www.youtube.com/v/{{YOUTUBEID}}?hl=en_US&amp;version=3"></param>\n      <param name="allowFullScreen" value="true"></param>\n      <param name="allowscriptaccess" value="always"></param>\n      <embed src="//www.youtube.com/v/{{YOUTUBEID}}?hl=en_US&amp;version=3&autoplay=1" type="application/x-shockwave-flash" width="100%" height="98%" allowscriptaccess="always" allowfullscreen="true"></embed>\n    </object>\n  </div>\n</div>\n';

}
return __p
}})();