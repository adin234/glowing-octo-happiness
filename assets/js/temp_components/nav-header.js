'use strict';

require(
    [
        'text!components/templates/nav-header.html'
    ],
    function(tpl) {
        $('.nav-container').html(tpl);
    }
);