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
__p += '<li class="game-item {{CLASS}}">\n  <img src="{{IMAGE}}" width="160" height="94" alt="{{NAME}}"  class="tooltip"  title="{{NAME}}&lt;/br&gt;{{CHINESE}}" onClick="javascript:utilHash.changeHashVal(\'game\', \'{{ID}}\');return false;" data-id="{{ID}}" data-name="{{NAME}}" data-chi="{{CHINESE}}" style="cursor:pointer;"/>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videoContainerTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<ul class="list clearFix">\n    {{ITEMS}}\n</ul>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videoTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="pointer {{LIVE}}" onClick="window.location.href = \'/youtuber/?user={{USER_ID}}\';">\n  <a href="javascript:;" title="{{TITLE}}"><img src="{{THUMB}}" width="100%" height="100%" alt="screenshot">\n  </a>\n  <h3>\n    <a href="javascript:void(0);" title="{{TITLE}}">\n      {{TITLE}}\n    </a>\n  </h3>\n  <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" width="68" height="67" alt="Uploaded by" class="uploader photo-{{CHANNELID}}" onError="fixErrorImg(this);"></a>\n</li>\n';

}
return __p
}})();