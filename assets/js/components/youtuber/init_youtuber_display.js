/* global
    renderGame,
    page_data,
    community,
    attachments_server
*/
'use strict';

renderGame();

$('#banner .info > cite').html(page_data.user.username);
$('#banner .info > a').attr('href', community + 'index.php?members/' +
    page_data.user.username + '.' + page_data.user.user_id);
$('#banner .info > img').attr('src', attachments_server + 'avatar.php?userid=' +
    page_data.user.user_id + '.jpg');


$(document).ready(function() {
    $('.sf-menu').superfish();
});
