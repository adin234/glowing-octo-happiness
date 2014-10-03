$(window).load(function(){
	html = [];
	console.log('youtuber.js', page_data);
	page_data.games_cast.forEach(function(item){
		html.push(template($('#gamesCastTpl').html(), item));
	});
	$('#gamesCast').html(html.join(''));
	$('#banner > cite').html(page_data.user.username);
	$('#banner > a').attr('href', community+'index.php?members/'
		+page_data.user.username+'.'+page_data.user.user_id);
	$('#banner > img').attr('src', attachments_server+'data/avatars/l/0/'
		+page_data.user.user_id+'.jpg');
	twitchId = page_data.user.custom_fields.twitchStreams || null;
	youtubeId = page_data.user.custom_fields.youtube_id || null;
	$.get(server+'streaming/'+twitchId+'/'+youtubeId, function(result) {
		var liveStreamLink = false;
		if(typeof result.twitch.stream != 'undefined'
		&& result.twitch.stream != null )
		{
			liveStreamLink = '/gamer_stream/'+page_data.user.user_id+'/'+'TW'+twitchId;
		} else if (typeof result.youtube.items != 'undefined'
		&& result.youtube.items == null) {
			liveStreamLink = '/gamer_stream/'+page_data.user.user_id+'/'+'YT'+youtubeId;
		}

		if(liveStreamLink) {
			$('.live-button').attr('href', liveStreamLink).show();
		}
	});
	utilLoader.hide();
});
