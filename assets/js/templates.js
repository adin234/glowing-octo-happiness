(function() {
window["JST"] = window["JST"] || {};

window["JST"]["chatmsg.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<tr>\r\n  <td>\r\n    <div id="usericon-{cid}" class="usericon">\r\n      <img id="uavatar-{cid}" class="uavatar" alt="userimage" height="46px" width="46px" src="{avatar}">\r\n    </div>\r\n    <div id="chat-message-{cid}" class="chat-message">\r\n      <label id="uname">\r\n        {username}\r\n      </label>\r\n      <p id="imsg" class="message">\r\n        {message}\r\n      </p>\r\n      <label id="timestamp-{cid}" class="timestamp">\r\n        {timesent}\r\n      </label>\r\n    </div>\r\n  </td>\r\n</tr>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["chatnotifier.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<tr>\r\n  <td>\r\n    <div class="notifier">\r\n      <p id="notifymsg-{cid}" class="message">\r\n        {message}\r\n      </p>\r\n    </div>\r\n  </td>\r\n</tr>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gameTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\r\n    <a href="/game/?game={{ID}}"><img src="{{IMGSRC}}" width="160" height="94" alt="{{GAME}}" class="tooltip tooltipstered" title="{{GAME}}&lt;/br&gt;{{CHINESE}}"></a>\r\n</li>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["newsShowsTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="pointer">\r\n    <a href="{{LINK}}"><img src="{{THUMB}}" width="100%" height="100%" alt="screenshot"></a>\r\n    <h3>\r\n      <a href="{{LINK}}" title="{{TITLE}}">\r\n        {{TITLE}}\r\n      </a>\r\n    </h3>\r\n</li>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["sliderTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="slider-item">\r\n    <img src="{{LINK}}" alt="{{TITLE}}" title="{{TITLE}}" style="{{CURSORVALUE}}" onclick="{{ONCLICK}}">\r\n    <a href="#" class="play tooltip" data-vid="{{YOUTUBE_LINK}}" style="{{STYLE}}" title="&lt;img src=\'{{THUMB}}\'&gt;">\r\n      Play\r\n    </a>\r\n</li>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["templates.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div id="chid-{cid}" class="chid">\r\n</div>\r\n<div id="chcontainer-{cid}" class="chcontainer">\r\n  <table id="tblchatmsgs-{cid}" class="tblchatmsgs">\r\n  </table>\r\n</div>\r\n<div id="chatinputs-{cid}" class="chatinputs">\r\n  <textarea id="msgs-{cid}" class="msgs">\r\n  </textarea>\r\n  <button id="btnSend-{cid}" class="btnSend">\r\n    SEND\r\n  </button>\r\n</div>\r\n';

}
return __p
}})();