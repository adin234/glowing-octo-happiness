(function() {
window["JST"] = window["JST"] || {};

window["JST"]["chatmsg.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<tr>\n  <td>\n    <div id="usericon-{cid}" class="usericon">\n      <img id="uavatar-{cid}" class="uavatar" alt="userimage" height="46px" width="46px" src="{avatar}">\n    </div>\n    <div id="chat-message-{cid}" class="chat-message">\n      <label id="uname">\n        {username}\n      </label>\n      <p id="imsg" class="message">\n        {message}\n      </p>\n      <label id="timestamp-{cid}" class="timestamp">\n        {timesent}\n      </label>\n    </div>\n  </td>\n</tr>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["chatnotifier.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<tr>\n  <td>\n    <div class="notifier">\n      <p id="notifymsg-{cid}" class="message">\n        {message}\n      </p>\n    </div>\n  </td>\n</tr>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gameTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\n    <a href="/game/?game={{ID}}"><img src="{{IMGSRC}}" width="160" height="94" alt="{{GAME}}" class="tooltip tooltipstered" title="{{GAME}}&lt;/br&gt;{{CHINESE}}"></a>\n</li>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["newsShowsTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="pointer">\n    <a href="{{LINK}}"><img src="{{THUMB}}" width="100%" height="100%" alt="screenshot"></a>\n    <h3>\n      <a href="{{LINK}}" title="{{TITLE}}">\n        {{TITLE}}\n      </a>\n    </h3>\n</li>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["sliderTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="slider-item">\n    <img src="{{LINK}}" alt="{{TITLE}}" title="{{TITLE}}" style="{{CURSORVALUE}}" onclick="{{ONCLICK}}">\n    <a href="#" class="play tooltip" data-vid="{{YOUTUBE_LINK}}" style="{{STYLE}}" title="&lt;img src=\'{{THUMB}}\'&gt;">\n      Play\n    </a>\n</li>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["templates.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="chid-{cid}" class="chid">\n</div>\n<div id="chcontainer-{cid}" class="chcontainer">\n  <table id="tblchatmsgs-{cid}" class="tblchatmsgs">\n  </table>\n</div>\n<div id="chatinputs-{cid}" class="chatinputs">\n  <textarea id="msgs-{cid}" class="msgs">\n  </textarea>\n  <button id="btnSend-{cid}" class="btnSend">\n    SEND\n  </button>\n</div>\n';

}
return __p
}})();