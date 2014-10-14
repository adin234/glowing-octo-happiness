var liveStreamLink = false;
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
	$.get(server+'streamers?user='+page_data.user.user_id, function(result) {
		if(result.streamers.length) {
			liveStreamLink = '/gamer_stream/'+page_data.user.user_id+'/'+'TW'+result.streamers[0].twitch.channel.name
		}

		if(liveStreamLink) {
			$('.live-button').attr('href', liveStreamLink).show();
		}
	});

	$.get(server+'streamers/youtube?user='+page_data.user.user_id, function(result) {
		if(!liveStreamLink) {
			liveStreamLink = '/gamer_stream/'+page_data.user.user_id+'/'+'YT'+result.streamers[0].youtube.id;
			$('.live-button').attr('href', liveStreamLink).show();
		}
	});
});
