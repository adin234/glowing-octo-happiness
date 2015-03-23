(function() {
window["JST"] = window["JST"] || {};

window["JST"]["categoriesTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\r\n  <a href="" onClick="filter(\'{{ID}}\'); return false;" title="{{NAME}}">\r\n    {{NAME}}\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["commentItemTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<article class="clearFix"><img src="{{USERIMAGE}}" width="56" height="56" alt="{USERNAME}" onerror="fixErrorImg(this);">\r\n  <cite>\r\n    {{USERNAME}}\r\n  </cite>\r\n  <span>．\r\n    <date datetime="{{DATE}}">{{DATE}}</date>\r\n  </span>\r\n  <div class="replyContent">\r\n    <p>\r\n      {{COMMENT}}\r\n    </p>\r\n  </div>\r\n</article>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["commentsTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="comments-list">\r\n  <a href="javascript:;">所有留言 ({{COUNT}})</a>\r\n  <div class="yourDiscussion"> <img class="userImg" src="/assets/images/uploader.jpg" width="65" height="65" alt="{使用者帳號}" onerror="fixErrorImg(this);">\r\n    <div>\r\n      <div class="angle"></div>\r\n      <textarea id="commentArea" placeholder="分享您的想法"></textarea>\r\n    </div>\r\n    <button id="postComment" data-video=\'{{VIDEO}}\'>Post</button>\r\n  </div>\r\n  <div class="type clearFix"><span>類型：</span>\r\n    <ul>\r\n      <li class="{{SORTLATEST}}">\r\n        <a href="javascript:;" class="sort-comments latest">\r\n          最新留言\r\n        </a>\r\n      </li>\r\n      <li class="{{SORTLAST}}">\r\n        <a href="javascript:;" class="sort-comments last">\r\n          由舊到新\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n  <div class="discussions">\r\n   {{COMMENTS}}\r\n  </div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gamesCastTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="game-item">\r\n  <a href="#!/{{ID}}" data-id="{{ID}}" data-name="{{NAME}}" data-chi="{{CHINESE}}" title="{{NAME}}">\r\n    <img src="{{IMAGE}}" width="160" height="94" alt="{{NAME}}" class="tooltip" title="{{NAME}}&lt;/br&gt;{{CHINESE}}">\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["playlistTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="playlistItem" id="{{ID}}">\r\n  <a href="{{LINK}}" title="{{TITLE}}" class="clearFix">\r\n    <img src="{{THUMB}}" alt="{影片名稱}" width="79" height="52">\r\n    <h3>{{TITLE}}</h3>\r\n    <p>{{DESC}}</p>\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["recommendedTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="list clearFix">\r\n  <a href="{{LINK}}" title="{影片名稱}"> <img src="{{THUMB}}" width="109" height="67" alt="{影片名稱}">\r\n    <h3>\r\n      {{TITLE}}\r\n    </h3>\r\n    <ul>\r\n      <li>\r\n        <cite>\r\n          {{USERNAME}}\r\n        </cite>\r\n        上傳\r\n      </li>\r\n      <li>{{VIEWS}} Views</li>\r\n    </ul>\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videosTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="ytVideo videoItem" id="{{ID}}">\r\n  <a href="{{LINK}}" title="{{TITLE}}" class="clearFix">\r\n    <img src="{{THUMB}}" alt="{影片名稱}" width="79" height="52" />\r\n      <h3>{{TITLE}}</h3>\r\n    <h4>\r\n    <span onClick="window.location.href = \'{{LINK_USER}}\';">\r\n      {{USER}} 上傳\r\n    </span>\r\n    </h4>\r\n    <p>\r\n      {{DESC}}\r\n    </p>\r\n  </a>\r\n</li>\r\n';

}
return __p
}})();