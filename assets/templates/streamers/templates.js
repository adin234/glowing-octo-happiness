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
__p += '<li>\n  <a target="_blank" href="#!/{{ID}}" data-id="{{ID}}" class="game" data-name="{{NAME}}" title="{{NAME}}"><img src="{{IMAGE}}" width="160" height="94" alt="{{NAME}}"  class="tooltip"  title="{{NAME}}&lt;/br&gt;{{CHINESE}}"></a>\n</li>\n';

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

window["JST"]["videoMultiTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="{{LIVE}}" data-streamid="{{TYPE}}{{IDRAW}}" data-streamidraw="{{IDRAW}}">\n  <img src="{{THUMB}}" onClick="window.open(\'{{LINK}}\',\'_blank\');" class="pointer" width="100%" height="100%" alt="screenshot">\n    <h3>\n      <a target="_blank" href="{{LINK}}" title="{{TITLE}}">\n        {{TITLE}}\n      </a>\n    </h3>\n  <div style="width:68px;height:67px;overflow:hidden;position:absolute" class="uploader">\n    <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" alt="Uploaded by" class="" onError="fixErrorImg(this);">\n  </div>\n  <ul>\n    <li>\n      <em>觀看次數：</em>{{VIEWS}}\n    </li>\n  </ul>\n  <a href="javascript:;" class="close remove-multiview" title="Close">Close</a>\n</li>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videoTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="{{LIVE}}">\n  <a href="javascript:;" title="Add to multiview" data-username="{{USERNAME}}" data-userid="{{USER_ID}}" data-streamid="{{TYPE}}{{IDRAW}}" data-streamidraw="{{IDRAW}}" class="addToMultiview addTo switch">\n    Add to multiview\n  </a>\n  <img onClick="window.open(\'{{LINK}}\',\'_blank\')" class="pointer" src="{{THUMB}}" width="334" height="246" alt="screenshot">\n  <h3>\n    <a target="_blank" href="{{LINK}}" title="{{TITLE}}">\n      {{TITLE}}\n    </a>\n  </h3>\n  <div style="width:68px;height:67px;overflow:hidden;position:absolute" class="uploader">\n    <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" alt="Uploaded by" class="" onError="fixErrorImg(this);">\n  </div>\n  <ul>\n    <li>\n      <em>觀看次數：</em>{{VIEWS}}\n    </li>\n  </ul>\n</li>\n';

}
return __p
}})();