/*global
	active_comments: true,
	showComment: true,
	isPlaying: true,
	hash,
	filter_category
*/

'use strict';

define (function () {

		return function Filter_Action (opts) {

			var defaults = {
				show_playlist: function() {},
				show_video: function() {},
				filter_category: function() {}
			},
			options = $.extend({}, defaults, opts);

            return {
                execute: function(action) {
				    switch (action) {
				        case 'playlist':
				        	options.show_playlist(hash.shift(), hash.shift(), this.execute);
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
				            options.filter_category(hash.shift());
				            this.execute(hash.shift());
				            break;
				    }

                }
            };
		};
	}
);