'use strict';

define (function () {
		return function Show_Playlist (opts) {

            var defaults = {
                onChange: function() {}
            },
            options = $.extend({}, defaults, opts);
            return {
                init: function(page_data) {

                    hash = window.location.hash.replace('#!', '').split('/');

                    if (!$('body').hasClass('favorites')) {

    			        hash = window.location.hash.replace('#!/', '').split('/');

                        $(window).on('hashchange', function () {


        			        // if (!hash && page_data.playlists.length) {
        			        //     window.location.hash = '#!/playlist/' + page_data.config.playlist;
        			        // }
        			        // hash = hash.split('/');

                            options.onChange(hash.shift(), hash.shift());
        			        // filterAction.init(hash.shift(), hash);
        			    });

                        options.onChange(hash.shift());
                    }
                }
            };
		};
	}
);