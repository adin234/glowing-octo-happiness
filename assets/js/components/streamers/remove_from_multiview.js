/* global
    multiview_items,
    render_videos,
    update_watch_multiview
*/

'use strict';

$('#container-multiview').on('click', '.remove-multiview', function () {
    var $this = $(this),
        id = $this.parent('li').attr('data-streamidraw'),
        index = multiview_items.indexOf(id);

    $('#container-videos a[data-streamidraw=' + id + ']').parent('li').show();
    $this.parent('li').remove();

    if (index > -1) {
        multiview_items.splice(index, 1);
    }

    update_watch_multiview();
    render_videos();
});
