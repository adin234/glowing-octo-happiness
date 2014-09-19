html = [];
page_data.games_cast.forEach(function(item){
	html.push(template($('#gamesCastTpl').html(), item));
});
$('#gamesCast').html(html.join(''));
$('#banner > cite').html(page_data.user.username);
$('#banner > a').attr('href', community+'index.php?members/'
	+page_data.user.username+'.'+page_data.user.user_id);
$('#banner > img').attr('src', attachments_server+'data/avatars/l/0/'
	+page_data.user.user_id+'.jpg');