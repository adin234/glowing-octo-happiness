(function() {
window["JST"] = window["JST"] || {};

window["JST"]["featuredUsersTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class={{COUNT}}>\r\n  <div class="list">\r\n    <a href="/youtuber/?user={{USER_ID}}" class="link-white">\r\n      <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" width="44" height="43" alt="Viewer" class="safeloading" onError="fixErrorImg(this);">\r\n      <h3>\r\n        {{USERNAME}}\r\n      </h3>\r\n      <div class="listBg"></div>\r\n    </a>\r\n  </div> \r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["featureTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="{{COUNT}}">\r\n  <div class="list">\r\n    <a href="{{LINK}}" class="link-white">\r\n      <img src="{{IMAGE}}" width="44" height="43" alt="Viewer" class="safeloading" onError="fixErrorImg(this);">\r\n      <h3>\r\n        {{LABEL}}\r\n      </h3>\r\n      <div class="listBg"></div>\r\n    </a>\r\n  </div>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gameConsoleTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\r\n  <a href="/game/?game={{ID}}">\r\n    <span id={{ID}} class="gamelabel capitalized">\r\n      {{GAMENAME}}\r\n    </span>\r\n    <img src="{{IMGSRC}}" width="160" height="94" alt="{{GAME}}" title="{{GAME}}" class="tooltip capitalized">\r\n  </a>\r\n</li>\r\n';

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

window["JST"]["latestVideosTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="pointer">\r\n  <a href="{{LINK}}"><img src="{{THUMB}}" width="100%" height="100%" alt="screenshot"></a>\r\n    <h3>\r\n      <a href="{{LINK}}" title="{{TITLE}}">\r\n        {{TITLE}}\r\n      </a>\r\n    </h3>\r\n    <a href="{{LINK}}" title="{{TITLE}}">\r\n      <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" width="68" height="67" alt="Uploaded by" class="uploader safeloading" onError="fixErrorImg(this);">\r\n    </a>\r\n    <ul>\r\n      <li>\r\n        {{USERNAME}}\r\n      </li>\r\n      <li>\r\n        <em>\r\n          觀看次數：\r\n        </em>\r\n        {{VIEWS}}\r\n      </li>\r\n    <li>\r\n      <a href="{{LINK}}/comments"><em>Replies: </em> {{ANYTV_COMMENT}}</a>\r\n    </li>\r\n  </ul>\r\n</li>\r\n';

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

window["JST"]["playerTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="video-player" style="position: fixed;top: 0;bottom: 0;left: 0;height: 100%;width: 100%;background-color: rgba(0,0,0,.4);z-index: 1000;">\r\n  <iframe src="{{VIDEO}}" frameborder="0" allowfullscreen="" style="width:80%; margin-left: 10%; height:90%; margin-top:5%"></iframe>\r\n  <a href="javascript:;" class="close remove-multiview" title="Close" style="margin-top:5%"></a>\r\n</div>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["recentForumItemTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="thread">\r\n  <span class="icon" href="{{USERLINK}}">\r\n    <img src="{{POSTERIMAGE}}" width="50" height="50" class="safeloading" onError="fixErrorImg(this);"/>\r\n  </span>\r\n  <a class="title" href=\'{{LINK}}\'>\r\n    {{TITLE}}\r\n  </a>\r\n  <div class="stats">\r\n    <dl>\r\n      <dt class="replies">\r\n        Replies\r\n      </dt>\r\n      <dd class="replies">\r\n        {{REPLIES}}\r\n      </dd>\r\n      <br/>\r\n      <dt class="views">\r\n        Views\r\n      </dt>\r\n      <dd class="views">\r\n        {{VIEWS}}\r\n      </dd>\r\n    </dl>\r\n  </div>\r\n  <span class="last-message"></span>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["recentForumTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="recent-forums">\r\n  <h3 class="forum-header"></h3>\r\n  <ul class="thread-list">\r\n    {{THREADS}}\r\n  </ul>\r\n</div>\r\n';

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

window["JST"]["streamersTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li id="{{USERNAME}}" onClick="window.open(\'{{LINK}}\',\'_blank\')">\r\n    <div class="dynamic">\r\n      {{GAME}}{{USERNAME}}\r\n    </div>\r\n  <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" width="32" height="30" alt="{{GAME}} / {{USERNAME}}" class="safeloading" onError="fixErrorImg(this);">\r\n</li>\r\n';

}
return __p
}})();