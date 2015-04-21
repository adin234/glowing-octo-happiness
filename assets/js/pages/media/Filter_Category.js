/*global
	page_data
*/

'use strict';

define(function(require) {
    var update_videos = require('./Update_Videos'),
    	filter_vlogs = require('./Filter_Vlogs'),
    	renderGame = require('./Render_Game');

    return function Filter_Category (gameConsole) {
        var videos = [],
            context = $('.species a[data-console=' + gameConsole + ']');

        if (gameConsole === window.filterConsole) {
            return;
        }

        context.parent().siblings().removeClass('current');
        context.parent().addClass('current');

        window.filterConsole = gameConsole;

        if (gameConsole !== 'vlogs') {
            renderGame();
        }
        else {
            filter_vlogs();
        }

        videos = page_data.videos.filter(function (item) {
            return ~(item.snippet.meta.tags.indexOf('anytv_console_' + window.filterConsole));
        });

        $('#videosToggle').trigger('click');

        update_videos(videos);
    };
});
