'use strict';

require(
    [
        'text!common/templates/nav-header.html'
    ],
    function(tpl) {
        $('.nav-container').html(tpl);
    }
);