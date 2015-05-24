(function() {
window["JST"] = window["JST"] || {};

window["JST"]["categoriesTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\n  <a href="{{LINK}}" title="{{TITLE}}">\n    {{TITLE}}\n  </a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["commentItemTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<article class="clearFix"><img src="{{USERIMAGE}}" width="56" height="56" alt="{USERNAME}" onError="fixErrorImg(this);">\n  <cite>\n    {{USERNAME}}\n  </cite>\n  <span>．\n    <date datetime="{{DATE}}">\n      {{DATE}}\n    </date>\n  </span>\n  <div class="replyContent">\n    <p>\n      {{COMMENT}}\n    </p>\n  </div>\n</article>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["commentsTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="comments-list">\n  <a href="javascript:;">\n    所有留言 ({{COUNT}})\n  </a>\n  <div class="yourDiscussion"> <img class="userImg"src="/assets/images/uploader.jpg" width="65" height="65" alt="{使用者帳號}" onError="fixErrorImg(this);">\n    <div>\n      <div class="angle"></div>\n      <textarea id="commentArea" placeholder="分享您的想法"></textarea>\n    </div>\n    <button id="postComment" data-video=\'{{VIDEO}}\'>Post</button>\n  </div>\n  <div class="type clearFix">\n    <span>\n      類型：\n    </span>\n    <ul>\n      <li class="{{SORTLATEST}}">\n        <a href="javascript:;" class="sort-comments latest">\n          最新留言\n        </a>\n      </li>\n      <li class="{{SORTLAST}}">\n        <a href="javascript:;" class="sort-comments last">\n          由舊到新\n        </a>\n      </li>\n    </ul>\n  </div>\n  <div class="discussions">\n    {{COMMENTS}}\n  </div>\n</div>\n';

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
__p += '<li class="list clearFix">\n  <a href="{{LINK}}" title="{影片名稱}"> <img src="{{THUMB}}" width="109" height="67" alt="{影片名稱}">\n    <h3>\n      {{TITLE}}\n    </h3>\n    <ul>\n      <li>\n        <cite>{{USERNAME}}</cite> 上傳\n      </li>\n      <li>\n        {{VIEWS}} Views\n      </li>\n    </ul>\n  </a>\n</li>\n';

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