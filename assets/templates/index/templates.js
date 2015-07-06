(function() {
window["JST"] = window["JST"] || {};

window["JST"]["advertisementTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["featureTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="{{COUNT}}">\n  <div class="list">\n    <a href="{{LINK}}" class="link-white">\n      <img src="{{IMAGE}}" width="44" height="43" alt="Viewer" class="safeloading" onError="fixErrorImg(this);">\n      <h3>\n        {{LABEL}}\n      </h3>\n      <div class="listBg"></div>\n    </a>\n  </div>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["featuredUsersTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class={{COUNT}}>\n  <div class="list">\n    <a href="/youtuber/?user={{USER_ID}}" class="link-white">\n      <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" width="44" height="43" alt="Viewer" class="safeloading" onError="fixErrorImg(this);">\n      <h3>\n        {{USERNAME}}\n      </h3>\n      <div class="listBg"></div>\n    </a>\n  </div> \n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gameConsoleTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li>\n  <a href="/game/?game={{ID}}">\n    <span id={{ID}} class="gamelabel capitalized">\n      {{GAMENAME}}\n    </span>\n    <img src="{{IMGSRC}}" width="160" height="94" alt="{{GAME}}" title="{{GAME}}" class="tooltip capitalized">\n  </a>\n</li>\n';

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

window["JST"]["latestVideosTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="pointer">\n  <a href="{{LINK}}"><img src="{{THUMB}}" width="100%" height="100%" alt="screenshot"></a>\n    <h3>\n      <a href="{{LINK}}" title="{{TITLE}}">\n        {{TITLE}}\n      </a>\n    </h3>\n    <a href="{{LINK}}" title="{{TITLE}}">\n      <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" width="68" height="67" alt="Uploaded by" class="uploader safeloading" onError="fixErrorImg(this);">\n    </a>\n    <ul>\n      <li>\n        {{USERNAME}}\n      </li>\n      <li>\n        <em>\n          觀看次數：\n        </em>\n        {{VIEWS}}\n      </li>\n    <li>\n      <a href="{{LINK}}/comments"><em>Replies: </em> {{ANYTV_COMMENT}}</a>\n    </li>\n  </ul>\n</li>\n';

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

window["JST"]["playerTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="video-player" style="position: fixed;top: 0;bottom: 0;left: 0;height: 100%;width: 100%;background-color: rgba(0,0,0,.4);z-index: 1000;">\n  <iframe src="{{VIDEO}}" frameborder="0" allowfullscreen="" style="width:80%; margin-left: 10%; height:90%; margin-top:5%"></iframe>\n  <a href="javascript:;" class="close remove-multiview" title="Close" style="margin-top:5%"></a>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["recentForumItemTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="thread">\n  <span class="icon" href="{{USERLINK}}">\n    <img src="{{POSTERIMAGE}}" width="50" height="50" class="safeloading" onError="fixErrorImg(this);"/>\n  </span>\n  <a class="title" href=\'{{LINK}}\'>\n    {{TITLE}}\n  </a>\n  <div class="stats">\n    <dl>\n      <dt class="replies">\n        Replies\n      </dt>\n      <dd class="replies">\n        {{REPLIES}}\n      </dd>\n      <br/>\n      <dt class="views">\n        Views\n      </dt>\n      <dd class="views">\n        {{VIEWS}}\n      </dd>\n    </dl>\n  </div>\n  <span class="last-message"></span>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["recentForumTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<div class="recent-forums">\n  <h3 class="forum-header"></h3>\n  <ul class="thread-list">\n    {{THREADS}}\n  </ul>\n</div>\n';

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

window["JST"]["streamersTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li id="{{USERNAME}}" onClick="window.open(\'{{LINK}}\',\'_blank\')">\n    <div class="dynamic">\n      {{GAME}}{{USERNAME}}\n    </div>\n  <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" width="32" height="30" alt="{{GAME}} / {{USERNAME}}" class="safeloading" onError="fixErrorImg(this);">\n</li>\n';

}
return __p
}})();