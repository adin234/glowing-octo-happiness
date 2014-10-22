var liveStreamLink = false;
$(window).load(function(){
	html = [];
	page_data.games_cast.forEach(function(item){
		html.push(template($('#gamesCastTpl').html(), item));
	});
	$('#gamesCast').mCustomScrollbar({theme: 'inset-2'});
	$('#gamesCast .mCSB_container').html(html.join(''));

	$('#banner .info > cite').html(page_data.user.username);
	$('#banner .info > a').attr('href', community+'index.php?members/'
		+page_data.user.username+'.'+page_data.user.user_id);
	$('#banner .info > img').attr('src', attachments_server+'data/avatars/l/0/'
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
