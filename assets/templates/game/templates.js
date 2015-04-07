(function() {
window["JST"] = window["JST"] || {};

window["JST"]["categoriesTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\n  <a href="" onClick="filter(\'{{ID}}\'); return false;" title="{{NAME}}">\n    {{NAME}}\n  </a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["commentItemTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<article class="clearFix"><img src="{{USERIMAGE}}" width="56" height="56" alt="{USERNAME}" onerror="fixErrorImg(this);">\n  <cite>\n    {{USERNAME}}\n  </cite>\n  <span>．\n    <date datetime="{{DATE}}">{{DATE}}</date>\n  </span>\n  <div class="replyContent">\n    <p>\n      {{COMMENT}}\n    </p>\n  </div>\n</article>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["commentsTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="comments-list">\n  <a href="javascript:;">所有留言 ({{COUNT}})</a>\n  <div class="yourDiscussion"> <img class="userImg" src="/assets/images/uploader.jpg" width="65" height="65" alt="{使用者帳號}" onerror="fixErrorImg(this);">\n    <div>\n      <div class="angle"></div>\n      <textarea id="commentArea" placeholder="分享您的想法"></textarea>\n    </div>\n    <button id="postComment" data-video=\'{{VIDEO}}\'>Post</button>\n  </div>\n  <div class="type clearFix"><span>類型：</span>\n    <ul>\n      <li class="{{SORTLATEST}}">\n        <a href="javascript:;" class="sort-comments latest">\n          最新留言\n        </a>\n      </li>\n      <li class="{{SORTLAST}}">\n        <a href="javascript:;" class="sort-comments last">\n          由舊到新\n        </a>\n      </li>\n    </ul>\n  </div>\n  <div class="discussions">\n   {{COMMENTS}}\n  </div>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gamesCastTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="game-item">\n  <a href="#!/{{ID}}" data-id="{{ID}}" data-name="{{NAME}}" data-chi="{{CHINESE}}" title="{{NAME}}">\n    <img src="{{IMAGE}}" width="160" height="94" alt="{{NAME}}" class="tooltip" title="{{NAME}}&lt;/br&gt;{{CHINESE}}">\n  </a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["playlistTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="playlistItem" id="{{ID}}">\n  <a href="{{LINK}}" title="{{TITLE}}" class="clearFix">\n    <img src="{{THUMB}}" alt="{影片名稱}" width="79" height="52">\n    <h3>{{TITLE}}</h3>\n    <p>{{DESC}}</p>\n  </a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["recommendedTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="list clearFix">\n  <a href="{{LINK}}" title="{影片名稱}"> <img src="{{THUMB}}" width="109" height="67" alt="{影片名稱}">\n    <h3>\n      {{TITLE}}\n    </h3>\n    <ul>\n      <li>\n        <cite>\n          {{USERNAME}}\n        </cite>\n        上傳\n      </li>\n      <li>{{VIEWS}} Views</li>\n    </ul>\n  </a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videosTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="ytVideo videoItem" id="{{ID}}">\n  <a href="{{LINK}}" title="{{TITLE}}" class="clearFix">\n    <img src="{{THUMB}}" alt="{影片名稱}" width="79" height="52" />\n      <h3>{{TITLE}}</h3>\n    <h4>\n    <span onClick="window.location.href = \'{{LINK_USER}}\';">\n      {{USER}} 上傳\n    </span>\n    </h4>\n    <p>\n      {{DESC}}\n    </p>\n  </a>\n</li>\n';

}
return __p
}})();