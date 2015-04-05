'use strict';

define(function(require) {

    var tpl = require('text!./sub-nav.html');
    
    $('#sub-nav').html(tpl).superfish();
});