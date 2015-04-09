/*global
	active_comments: true,
	showComment: true,
	isPlaying: true
*/

'use strict';

define (function () {

		return function Filter_Action (opts) {

			var defaults = {
				show_playlist: function() {},
				show_video: function() {}
			},
			options = $.extend({}, defaults, opts);

            return {
                execute: function(action, hash) {

				    switch (action) {
				        case 'playlist':
				        	options.show_playlist(action, hash);
				            $('#videosToggle a').trigger('click');
				            break;
				        case 'video':
				            isPlaying = true;
				            options.show_video(hash.shift());
				            break;
				        case 'comments':
				            $('a[href="#tab-2"]').click();
				            active_comments = true;
				            this.execute(hash.shift());
				            break;
				        case 'comment':
				            $('a[href="#tab-2"]').click();
				            active_comments = true;
				            showComment = 'comment' + hash.shift();
				            this.execute(hash.shift());
				            break;
				        case 'console':
				            // filter_category.execute(hash.shift());
				            this.execute(hash.shift());
				            break;
				    }

                }
            };
		};
	}
);