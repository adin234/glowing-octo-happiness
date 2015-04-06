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
__p += '<li>\r\n  <a target="_blank" href="#!/{{ID}}" data-id="{{ID}}" class="game" data-name="{{NAME}}" title="{{NAME}}"><img src="{{IMAGE}}" width="160" height="94" alt="{{NAME}}"  class="tooltip"  title="{{NAME}}&lt;/br&gt;{{CHINESE}}"></a>\r\n</li>\r\n';

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

window["JST"]["videoMultiTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="{{LIVE}}" data-streamid="{{TYPE}}{{IDRAW}}" data-streamidraw="{{IDRAW}}">\r\n  <img src="{{THUMB}}" onClick="window.open(\'{{LINK}}\',\'_blank\');" class="pointer" width="100%" height="100%" alt="screenshot">\r\n    <h3>\r\n      <a target="_blank" href="{{LINK}}" title="{{TITLE}}">\r\n        {{TITLE}}\r\n      </a>\r\n    </h3>\r\n  <div style="width:68px;height:67px;overflow:hidden;position:absolute" class="uploader">\r\n    <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" alt="Uploaded by" class="" onError="fixErrorImg(this);">\r\n  </div>\r\n  <ul>\r\n    <li>\r\n      <em>觀看次數：</em>{{VIEWS}}\r\n    </li>\r\n  </ul>\r\n  <a href="javascript:;" class="close remove-multiview" title="Close">Close</a>\r\n</li>\r\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["videoTpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = '';
with (obj) {
__p += '<li class="{{LIVE}}">\r\n  <a href="javascript:;" title="Add to multiview" data-username="{{USERNAME}}" data-userid="{{USER_ID}}" data-streamid="{{TYPE}}{{IDRAW}}" data-streamidraw="{{IDRAW}}" class="addToMultiview addTo switch">\r\n    Add to multiview\r\n  </a>\r\n  <img onClick="window.open(\'{{LINK}}\',\'_blank\')" class="pointer" src="{{THUMB}}" width="334" height="246" alt="screenshot">\r\n  <h3>\r\n    <a target="_blank" href="{{LINK}}" title="{{TITLE}}">\r\n      {{TITLE}}\r\n    </a>\r\n  </h3>\r\n  <div style="width:68px;height:67px;overflow:hidden;position:absolute" class="uploader">\r\n    <img src="{{PROVIDER}}avatar.php?userid={{USER_ID}}.jpg" alt="Uploaded by" class="" onError="fixErrorImg(this);">\r\n  </div>\r\n  <ul>\r\n    <li>\r\n      <em>觀看次數：</em>{{VIEWS}}\r\n    </li>\r\n  </ul>\r\n</li>\r\n';

}
return __p
}})();