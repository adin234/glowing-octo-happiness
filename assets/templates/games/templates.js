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

window["JST"]["gameContainerTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<ul class="game clearFix">\n  {{ITEMS}}\n</ul>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["gameTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="game-item {{CLASS}}">\n  <img src="{{IMAGE}}" onClick="javascript:utilHash.changeHashVal(\'game\', \'{{ID}}\');" width="160" height="94" alt="{{NAME}}"  class="tooltip"  title="{{NAME}}&lt;/br&gt;{{CHINESE}}" data-id="{{ID}}" data-name="{{NAME}}" data-chi="{{CHINESE}}" title="{{NAME}}" style="cursor: pointer;">\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videoContainerTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<ul class="list clearFix">\n  {{ITEMS}}\n</ul>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videoTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="pointer">\n  <a href="{{LINK}}"><img src="{{THUMB}}" width="100%" height="100%" alt="screenshot"></a>\n    <h3>\n      <a href="{{LINK}}" title="{{TITLE}}">\n        {{TITLE}}\n      </a>\n    </h3>\n  <a href="{{LINK}}" title="{{TITLE}}">\n    <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" width="68" height="67" alt="Uploaded by" onerror="fixErrorImg(this);" class="uploader">\n  </a>\n  <ul>\n    <li>\n      <em>觀看次數：</em>\n      {{VIEWS}}\n    </li>\n    <li><a href="{{LINK}}/comments"><em>Replies: </em> {{ANYTV_COMMENTS}}</a></li>\n  </ul>\n</li>\n';

}
return __p
}})();