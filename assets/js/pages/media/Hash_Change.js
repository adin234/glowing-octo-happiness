/*global
    hash: true
*/

'use strict';

define (function () {
		return function Hash_Change (opts) {

            var defaults = {
                onChange: function() {}
            },
            options = $.extend({}, defaults, opts);
            return {
                init: function(page_data) {


                    // if (!$('body').hasClass('favorites')) {

                        $(window).on('hashchange', function () {
                            hash = window.location.hash.replace('#!/', '');
                            if (!hash && page_data.playlists.length) {
                                window.location.hash = '#!/playlist/' + page_data.config.playlist;
                            }
                            hash = hash.split('/');
                            options.onChange(hash.shift());
        			    });

                        // $(window).trigger('hashchange');
                    // }
                }
            };
		};
	}
);