/* global
    hash : true,
    render_videos,
    filterAction
*/
'use strict';

$(window).on('hashchange', function() {
    hash = window.location.hash.replace('#!/', '');
    hash = hash.split('/');
    if (!~hash.indexOf('game')) {
        render_videos();
    }
    filterAction(hash.shift());
});
