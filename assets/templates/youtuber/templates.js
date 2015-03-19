(function() {
window["JST"] = window["JST"] || {};

window["JST"]["categoriesTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\r\n  <a href="#" onclick="filter(\'{{ID}}\'); return false;" title="{{NAME}}">\r\n    {{NAME}}\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["commentItemTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<article class="clearFix" id="comment{{COMMENT_ID}}"><img src="{{USERIMAGE}}" width="56" height="56" alt="{USERNAME}" onError="fixErrorImg(this);">\r\n  <cite>{{USERNAME}}</cite><span>．\r\n  <date datetime="{{DATE}}">{{DATE}}</date>-</span>\r\n  <div class="{{USER_ACCESS_CLASS}}">\r\n    <button onClick=\'deleteComment({{COMMENT_ID}},this);\'>x</button>\r\n  </div>\r\n  <div class="replyContent">\r\n    <p>\r\n      {{COMMENT}}\r\n    </p>\r\n    <div class=\'commentShare\'>\r\n      <a href="https://www.facebook.com/dialog/feed?app_id=305385862975541&display=page&description={{COMMENT}}&link={{SHARE_LINK}}&redirect_uri=http://www.facebook.com/&name={{USERNAME}} shared a comment!&picture={{IMAGE_LINK}}" class=\'fbbutton\' target="_blank">\r\n      <a href="https://plus.google.com/share?url={{SHARE_LINK}}#comment{{COMMENT_ID}}" onclick="javascript:window.open(this.href,\'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600\');return false;" class=\'gpbutton\'>\r\n        <img src="https://www.gstatic.com/images/icons/gplus-16.png" alt="Share on Google+" />\r\n      </a>\r\n      <a href="http://twitter.com/share?url={{SHARE_LINK}}" target="_blank" class=\'twbutton\'>\r\n        <img src="/assets/images/social/twitter.png" />\r\n      </a>\r\n      <p class="commentShare">Share this comment.</p>\r\n    </div>\r\n  </div>\r\n</article>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["commentsTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="comments-list">\r\n  <a href="javascript:;">\r\n    所有留言 ({{COUNT}})\r\n  </a>\r\n  <div class="yourDiscussion"> <img class="userImg" src="/assets/images/uploader.jpg" width="65" height="65" alt="{使用者帳號}" onError="fixErrorImg(this);">\r\n    <div>\r\n      <div class="angle">\r\n      </div>\r\n      <textarea id="commentArea" placeholder="分享您的想法"></textarea>\r\n    </div>\r\n    <button id="postComment" data-video=\'{{VIDEO}}\'>Post</button>\r\n  </div>\r\n    <div class="type clearFix"><span>類型：</span>\r\n      <ul>\r\n        <li class="{{SORTLATEST}}">\r\n          <a href="javascript:;" class="sort-comments latest">\r\n            最新留言\r\n          </a>\r\n        </li>\r\n        <li class="{{SORTLAST}}">\r\n          <a href="javascript:;" class="sort-comments last">\r\n            由舊到新\r\n          </a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  <div class="discussions">\r\n    {{COMMENTS}}\r\n  </div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gamesCastTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="game-item">\r\n  <a href="javascript:void(0);" data-id="{{ID}}" onClick="filterGame(\'{{ID}}\'); return false;" title="{{NAME}}">\r\n    <img src="{{IMAGE}}" width="160" height="94" alt="{{NAME}}" class="tooltip" title="{{NAME}}&lt;/br&gt;{{NAME}}">\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["playlistTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="playlistItem" id="{{ID}}">\r\n  <a href="{{LINK}}" title="{{TITLE}}" class="clearFix">\r\n    <img src="{{THUMB}}" alt="{影片名稱}" width="79" height="52">\r\n    <div class="title">\r\n      {{TITLE}}\r\n    </div>\r\n    <p>\r\n      {{DESC}}\r\n    </p>\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["recommendedTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="list clearFix">\r\n  <a href="{{LINK}}" title="{影片名稱}"> <img src="{{THUMB}}" width="109" height="67" alt="{影片名稱}">\r\n    <h3>\r\n      {{TITLE}}\r\n    </h3>\r\n    <ul>\r\n      <li>\r\n        <cite>{{USERNAME}}</cite> 上傳</li>\r\n      <li>\r\n        {{VIEWS}} Views\r\n      </li>\r\n    </ul>\r\n  </a>\r\n</li>\r\n';

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