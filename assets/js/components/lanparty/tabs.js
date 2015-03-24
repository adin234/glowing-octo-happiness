/* global
    utilHash,
    page_data,
    eventsHtml,
    schedules
 */

'use strict';

$(document).ready(function() {

    $('#lanparty_event')
        .html(eventsHtml.join(''))
        .css(
            'width', (Object.keys(schedules).length * 211 + 150) + 'px'
        );

    $('#lanparty_content').html(
        page_data.lanparty_what.
                replace(/\r/g, '<br>').
                replace(/\n/g, '<br>')
    );

    $('#lanparty_activities').html(
        page_data.lanparty_activities.
            replace(/\r/g, '<br>').
            replace(/\n/g, '<br>')
    );

    var tab = utilHash.getHash();
    $('.tabs').tabslet();

    if (tab !== '') {
        $('[href=' + tab + ']').trigger('click');
    }

    $('#event-container').mCustomScrollbar({
        horizontalScroll: true,
        advanced: { updateOnContentResize: true, updateOnBrowserResize: true },
        theme: 'dark'
    });
});