(function() {
window["JST"] = window["JST"] || {};

window["JST"]["eventItemTime.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="event_title" style="top:{{TOP}}; height:{{HEIGHT}}" title="{{DATE}} : {{START}} - {{END}}">\r\n  <p>\r\n    {{TITLE}}\r\n  </p>\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["eventItemTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="event-item">\r\n  <h3 class="event_date">\r\n    {{DATE}}\r\n  </h3>\r\n  {{TIME}}\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videos/categoriesTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\r\n  <a href="#" onclick="filter(\'{{ID}}\'); return false;" title="{{NAME}}">\r\n    {{NAME}}\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videos/commentItemTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<article class="clearFix"><img src="{{USERIMAGE}}" width="56" height="56" alt="{USERNAME}">\r\n  <cite>\r\n    {{USERNAME}}\r\n  </cite>\r\n  <span>．\r\n    <date datetime="{{DATE}}">\r\n      {{DATE}}\r\n    </date>\r\n  </span>\r\n  <div class="replyContent">\r\n    <p>\r\n      {{COMMENT}}\r\n    </p>\r\n  </div>\r\n</article>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videos/commentsTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="comments-list">\r\n  <a href="javascript:;">所有留言 ({{COUNT}})</a>\r\n  <div class="yourDiscussion"> <img class="userImg"src="/assets/images/uploader.jpg" width="65" height="65" alt="{使用者帳號}">\r\n    <div>\r\n    <div class="angle">\r\n    </div>\r\n    <textarea id="commentArea" placeholder="分享您的想法"></textarea>\r\n    </div>\r\n    <button id="postComment" data-video=\'{{VIDEO}}\'>Post</button>\r\n  </div>\r\n  <div class="type clearFix">\r\n    <span>類型：</span>\r\n    <ul>\r\n      <li class="{{SORTLATEST}}"><a href="javascript:;" class="sort-comments latest">最新留言</a></li>\r\n      <li class="{{SORTLAST}}"><a href="javascript:;" class="sort-comments last">由舊到新</a></li>\r\n    </ul>\r\n  </div>\r\n  <div class="discussions">\r\n    {{COMMENTS}}\r\n  </div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videos/gamesCastTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="game-item">\r\n  <a href="javascript:void(0);" data-id="{{ID}}" onClick="filterGame(\'{{ID}}\'); return false;" title="{{NAME}}">\r\n    <img src="{{IMAGE}}" width="160" height="94" alt="{{NAME}}"  class="tooltip"  title="{{NAME}}&lt;/br&gt;{{NAME}}">\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videos/playlistTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="playlistItem" id="{{ID}}">\r\n  <a href="{{LINK}}" title="{{TITLE}}" class="clearFix">\r\n    <img src="{{THUMB}}" alt="{影片名稱}" width="79" height="52">\r\n    <h3>\r\n      {{TITLE}}\r\n    </h3>\r\n    <p>\r\n      {{DESC}}\r\n    </p>\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videos/recommendedTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="list clearFix">\r\n  <a href="{{LINK}}" title="{影片名稱}"> <img src="{{THUMB}}" width="109" height="67" alt="{影片名稱}">\r\n    <h3>\r\n      {{TITLE}}\r\n    </h3>\r\n    <ul>\r\n      <li><cite>\r\n        {{USERNAME}}\r\n        </cite> 上傳</li>\r\n      <li>\r\n        {{VIEWS}} Views\r\n      </li>\r\n    </ul>\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videos/videosTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="ytVideo videoItem" id="{{ID}}">\r\n  <a href="{{LINK}}" title="{{TITLE}}" class="clearFix">\r\n    <img src="{{THUMB}}" alt="{影片名稱}" width="79" height="52">\r\n    <h3>\r\n      {{TITLE}}\r\n    </h3>\r\n    <p>\r\n      {{DESC}}\r\n    </p>\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();