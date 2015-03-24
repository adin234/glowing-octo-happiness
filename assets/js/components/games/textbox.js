/*global
    filter_game,
    filter_videos
*/

'use strict';

var add_textbox_listener = function () {
        $('#txtbox-search-games').on('keydown', function(e) {
            if (e.keyCode === 13) {
                filter_game(this);
                console.log('games');
            }
        });

        $('#txtbox-search-videos').on('keydown', function(e) {
            if (e.keyCode === 13) {
                filter_videos(this);
                console.log('vids');
            }
        });
    };

add_textbox_listener();
