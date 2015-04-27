'use strict';

define(function(require) {

    var tpl = require('./footer-tpl.html');

    $('#footer-container').html(tpl);

    $('.selectLanguage').css('display', 'none');
    
    $('.language').click(function () {
        $('.selectLanguage').toggle(750);
    });
});
