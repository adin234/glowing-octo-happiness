/* global
    slider
*/
'use strict';

var init_slider = function () {
        slider.featured_games = $('#container-featured-games').bxSlider();
        slider.latest_games = $('#container-latest-games').bxSlider();
        slider.container_videos = $('#container-videos').bxSlider({
            infiniteLoop: false,
            hideControlOnEnd: true
        });
    };

init_slider();
