/*global
    utilUser,
    server,
    page_data
*/

'use strict';

$(document).ready(function () {
    if (!$('body').hasClass('favorites')) {
        $(document).trigger('load-page');
    }
});