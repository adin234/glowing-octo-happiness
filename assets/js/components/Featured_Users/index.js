/*global
    template,
    attachments_server
*/

'use strict';

define(function(require) {

    return function Featured_Users(data) {
        var viewer_tpl = require('text!./item-tpl.html'),
            html = [];

        if (data.feature_list.feature_list_active === '1') {
            $('.viewer > h2').html(data.feature_list.feature_list_header);
            data.feature_list.feature_list_items.forEach(function (item) {
                html.push(template(viewer_tpl, item));
            });

            if (!html.length) {
                html.push('No feature available.');
            }

            $('#featuredUsers').html(html.join(''));
        }
        else {
            data.featured_users.forEach(function (item) {
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
    };
});