/*global
    index_data,
    template,
    attachments_server
*/

'use strict';

define(
    [
        'text!components/index/templates/viewer-tpl.html'
    ],
    function(viewer_tpl) {
        var html = [];


        if (index_data.feature_list.feature_list_active === '1') {
            $('.viewer > h2').html(index_data.feature_list.feature_list_header);
            index_data.feature_list.feature_list_items.forEach(function (item) {
                html.push(template(viewer_tpl, item));
            });

            if (!html.length) {
                html.push('No feature available.');
            }

            $('#featuredUsers').html(html.join(''));
        }
        else {
            index_data.featured_users.forEach(function (item) {
                item.provider = attachments_server;
                html.push(template(viewer_tpl, item));
            });
            if (!html.length) {
                html.push('No User Available');
            }
            $('#featuredUsers').html('<ul>' + html.join('') + '</ul>');
        }


        $('.viewer .scroll').mCustomScrollbar({
            theme: 'inset-2'
        });
    }
);