(function() {
window["JST"] = window["JST"] || {};

window["JST"]["categoriesTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\n  <a href="#" onclick="filter(\'{{ID}}\'); return false;" title="{{NAME}}">\n    {{NAME}}\n  </a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["commentItemTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<article class="clearFix"><img src="{{USERIMAGE}}" width="56" height="56" alt="{USERNAME}">\n  <cite>\n    {{USERNAME}}\n  </cite>\n  <span>．\n    <date datetime="{{DATE}}">\n      {{DATE}}\n    </date>\n  </span>\n  <div class="replyContent">\n    <p>\n      {{COMMENT}}\n    </p>\n  </div>\n</article>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["commentsTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="comments-list">\n  <a href="javascript:;">所有留言 ({{COUNT}})</a>\n  <div class="yourDiscussion"> <img class="userImg"src="/assets/images/uploader.jpg" width="65" height="65" alt="{使用者帳號}">\n    <div>\n    <div class="angle">\n    </div>\n    <textarea id="commentArea" placeholder="分享您的想法"></textarea>\n    </div>\n    <button id="postComment" data-video=\'{{VIDEO}}\'>Post</button>\n  </div>\n  <div class="type clearFix">\n    <span>類型：</span>\n    <ul>\n      <li class="{{SORTLATEST}}"><a href="javascript:;" class="sort-comments latest">最新留言</a></li>\n      <li class="{{SORTLAST}}"><a href="javascript:;" class="sort-comments last">由舊到新</a></li>\n    </ul>\n  </div>\n  <div class="discussions">\n    {{COMMENTS}}\n  </div>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gamesCastTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="game-item">\n  <a href="javascript:void(0);" data-id="{{ID}}" onClick="filterGame(\'{{ID}}\'); return false;" title="{{NAME}}">\n    <img src="{{IMAGE}}" width="160" height="94" alt="{{NAME}}"  class="tooltip"  title="{{NAME}}&lt;/br&gt;{{NAME}}">\n  </a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["playlistTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="playlistItem" id="{{ID}}">\n  <a href="{{LINK}}" title="{{TITLE}}" class="clearFix">\n    <img src="{{THUMB}}" alt="{影片名稱}" width="79" height="52">\n    <h3>\n      {{TITLE}}\n    </h3>\n    <p>\n      {{DESC}}\n    </p>\n  </a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["recommendedTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="list clearFix">\n  <a href="{{LINK}}" title="{影片名稱}"> <img src="{{THUMB}}" width="109" height="67" alt="{影片名稱}">\n    <h3>\n      {{TITLE}}\n    </h3>\n    <ul>\n      <li><cite>\n        {{USERNAME}}\n        </cite> 上傳</li>\n      <li>\n        {{VIEWS}} Views\n      </li>\n    </ul>\n  </a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videosTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="ytVideo videoItem" id="{{ID}}">\n  <a href="{{LINK}}" title="{{TITLE}}" class="clearFix">\n    <img src="{{THUMB}}" alt="{影片名稱}" width="79" height="52">\n    <h3>\n      {{TITLE}}\n    </h3>\n    <p>\n      {{DESC}}\n    </p>\n  </a>\n</li>\n';

}
return __p
}})();