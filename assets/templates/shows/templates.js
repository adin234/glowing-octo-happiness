(function() {
window["JST"] = window["JST"] || {};

window["JST"]["categoriesTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\r\n  <a href="{{LINK}}" title="{{TITLE}}">\r\n    {{TITLE}}\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["commentItemTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<article class="clearFix"><img src="{{USERIMAGE}}" width="56" height="56" alt="{USERNAME}" onError="fixErrorImg(this);">\r\n  <cite>\r\n    {{USERNAME}}\r\n  </cite>\r\n  <span>．\r\n    <date datetime="{{DATE}}">\r\n      {{DATE}}\r\n    </date>\r\n  </span>\r\n  <div class="replyContent">\r\n    <p>\r\n      {{COMMENT}}\r\n    </p>\r\n  </div>\r\n</article>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["commentsTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="comments-list">\r\n  <a href="javascript:;">\r\n    所有留言 ({{COUNT}})\r\n  </a>\r\n  <div class="yourDiscussion"> <img class="userImg"src="/assets/images/uploader.jpg" width="65" height="65" alt="{使用者帳號}" onError="fixErrorImg(this);">\r\n    <div>\r\n      <div class="angle"></div>\r\n      <textarea id="commentArea" placeholder="分享您的想法"></textarea>\r\n    </div>\r\n    <button id="postComment" data-video=\'{{VIDEO}}\'>Post</button>\r\n  </div>\r\n  <div class="type clearFix">\r\n    <span>\r\n      類型：\r\n    </span>\r\n    <ul>\r\n      <li class="{{SORTLATEST}}">\r\n        <a href="javascript:;" class="sort-comments latest">\r\n          最新留言\r\n        </a>\r\n      </li>\r\n      <li class="{{SORTLAST}}">\r\n        <a href="javascript:;" class="sort-comments last">\r\n          由舊到新\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n  <div class="discussions">\r\n    {{COMMENTS}}\r\n  </div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["playlistTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="playlistItem" id="{{ID}}">\r\n  <a href="{{LINK}}" title="{{TITLE}}" class="clearFix">\r\n    <img src="{{THUMB}}" alt="{影片名稱}" width="79" height="52">\r\n    <h3>\r\n      {{TITLE}}\r\n    </h3>\r\n    <p>\r\n      {{DESC}}\r\n    </p>\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["recommendedTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="list clearFix">\r\n  <a href="{{LINK}}" title="{影片名稱}"> <img src="{{THUMB}}" width="109" height="67" alt="{影片名稱}">\r\n    <h3>\r\n      {{TITLE}}\r\n    </h3>\r\n    <ul>\r\n      <li>\r\n        <cite>{{USERNAME}}</cite> 上傳\r\n      </li>\r\n      <li>\r\n        {{VIEWS}} Views\r\n      </li>\r\n    </ul>\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videosTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="ytVideo videoItem" id="{{ID}}">\r\n  <a href="{{LINK}}" title="{{TITLE}}" class="clearFix">\r\n    <img src="{{THUMB}}" alt="{影片名稱}" width="79" height="52">\r\n    <h3>\r\n      {{TITLE}}\r\n    </h3>\r\n    <p>\r\n      {{DESC}}\r\n    </p>\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();