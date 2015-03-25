/*global
    hash,
    filterAction
*/

/*jshint -W020 */

'use strict';

$(document).ready(function() {
    $(window).on('hashchange', function () {
        hash = window.location.hash.replace('#!/', '');
        hash = hash.split('/');
        filterAction(hash.shift());
    });
});