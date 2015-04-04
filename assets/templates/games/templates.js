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

window["JST"]["gameContainerTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<ul class="game clearFix">\r\n  {{ITEMS}}\r\n</ul>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gameTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="game-item {{CLASS}}">\r\n  <img src="{{IMAGE}}" onClick="javascript:utilHash.changeHashVal(\'game\', \'{{ID}}\');" width="160" height="94" alt="{{NAME}}"  class="tooltip"  title="{{NAME}}&lt;/br&gt;{{CHINESE}}" data-id="{{ID}}" data-name="{{NAME}}" data-chi="{{CHINESE}}" title="{{NAME}}" style="cursor: pointer;">\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videoContainerTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<ul class="list clearFix">\r\n  {{ITEMS}}\r\n</ul>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videoTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="pointer">\r\n  <a href="{{LINK}}"><img src="{{THUMB}}" width="100%" height="100%" alt="screenshot"></a>\r\n    <h3>\r\n      <a href="{{LINK}}" title="{{TITLE}}">\r\n        {{TITLE}}\r\n      </a>\r\n    </h3>\r\n  <a href="{{LINK}}" title="{{TITLE}}">\r\n    <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" width="68" height="67" alt="Uploaded by" onerror="fixErrorImg(this);" class="uploader">\r\n  </a>\r\n  <ul>\r\n    <li>\r\n      <em>觀看次數：</em>\r\n      {{VIEWS}}\r\n    </li>\r\n    <li><a href="{{LINK}}/comments"><em>Replies: </em> {{ANYTV_COMMENTS}}</a></li>\r\n  </ul>\r\n</li>\r\n';

}
return __p
}})();