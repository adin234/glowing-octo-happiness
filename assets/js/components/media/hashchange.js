/*global
    page_data,
    hash,
    filterAction
*/

/*jshint -W020 */

'use strict';

$(document).on('load-page', function(){
    $(window).on('hashchange', function () {
        hash = window.location.hash.replace('#!/', '');

        if (!hash && page_data.playlists.length) {
            window.location.hash = '#!/playlist/' + page_data.config.playlist;
        }
        hash = hash.split('/');
        filterAction(hash.shift());
    });
});