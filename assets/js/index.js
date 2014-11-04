var index_data;
var slider_loaded = 0;
var streamersList = [];
$.ajax({
	async: false,
	type: "GET",
	dataType: "json",
	url: server+"index",
}).done(function (data) {
	index_data = data;
});

$(document).ready(function() {
	$.ajax({
		type: "GET",
		dataType: "json",
		url: server+"streamers"
	}).done(function (data) {
		$.merge(streamersList, data.streamers);
		index_show_streamers(streamersList);
	});

	$.ajax({
		type: "GET",
		dataType: "json",
		url: server+"streamers/youtube"
	}).done(function (data) {
		$.merge(streamersList, data.streamers);
		index_show_streamers(streamersList);
	});

	$(document).on('click', '.slider-item .play', function(e) {
		var vid = $(this).attr('data-vid');
		if(vid.trim().length) {
			vid = vid.split('?')[1].split('=');
			vid = vid[vid.indexOf('v')+1].split('#')[0];
			var html = template($('#playerTpl').html(), { video: '//www.youtube.com/embed/'+vid+'?autoplay=1' });
			$('#container .bx-wrapper').prepend(html).promise().done(function() {
				$('.bx-wrapper .video-player iframe').css('margin-top', ($(window).height() - $('.bx-wrapper iframe').height())/2);
				$('.bx-wrapper .video-player .close').css('margin-top', ($(window).height() - $('.bx-wrapper iframe').height())/2)
			});
		}
	});
	$(document).on('click', '.bx-wrapper .close', function(e) {
		$('#container .bx-wrapper .video-player').remove();
	});
	showSocialButtons();

	$(window).scroll(function() {
		if($('body')[0].scrollHeight - $(window).scrollTop() - 50 <= $(window).height()) {
			$('#arrow').removeClass('down').addClass('up');
		} else {
			$('#arrow').removeClass('up').addClass('down');
		}
	});

	$('body').on('click', '#arrow.down', function() {
		$('html, body').animate({
			scrollTop: $(document).height()
		});
	});

	$('body').on('click', '#arrow.up', function() {
		$('html, body').animate({
			scrollTop: 0
		});
	});
});


var index_show_streamers = function(streamersList) {
	var html = [];

	streamersList.forEach(function(item) {
		if(typeof item.twitch != 'undefined') {
	            item.twitchid = item.field_value[item.field_value.length-1];
	            item.id = 'TW'+item.twitchid;
	            item.idraw = item.twitchid;
	            item.live = 'live';
	            item.game = item.twitch.game;
	            item.link = 'gamer_stream/?user='+item.user_id+'/#!/'+item.id;
	            item.provider = attachments_server;
	            item.thumb = item.twitch.preview.large;
	            item.title = item.twitch.channel.status;
	            item.bust = +new Date();
	            item.views = item.twitch.viewers;
	        } else {
	            item.id = 'YT'+item.youtube.id;
	            item.idraw= item.youtube.id;
	            item.live = 'live';
	            item.game = 'Unlisted';
	            item.link = 'gamer_stream/?user='+item.user_id+'/#!/'+item.id;
	            item.provider = attachments_server;
	            item.thumb = item.youtube.snippet.thumbnails.high.url;
	            item.title = item.youtube.snippet.title;
	            item.bust = +new Date();
	            item.views = '0';
	        }

	        item.game = item.game == null ? 'Unlisted' : item.game;

	        if(item.game.length > 10) {
	        	item.game = item.game.substr(0,10) + '&#133;';
	        }

	        if(item.username != null && item.username.length > 10) {
	        	item.title = item.username.substr(0, 10) + '&#133;';
	        }

	        html.push(template($('#streamersTpl').html(), item));

		});

		if(!html.length) { html.push('目前沒有直播'); };
		$('#streamers').html(html.join(''));

	update_index(index_data);
};

var filter_category = function (cnsl, context) {
	$.ajax({
		async: false,
		type: "GET",
		dataType: "json",
		url: server+"index?console="+cnsl,
	}).done(function (data) {
		$(context).parent().siblings().removeClass('current');
		$(context).parent().addClass('current');
		console.log(context);
		index_data = data;

		update_index(data);
	});

	return false;
}

var update_index = function(index_data) {
	var html = [];

	if(!slider_loaded) {
		index_data.slider.forEach(function(item, i){
			item.onclick = item.header_location ? "window.location='"+item.header_location+"'" : '';
			item.provider = attachments_server;
			item.style = item.youtube_link ? '' : 'display:none';
			item.youtube_link = item.youtube_link ? item.youtube_link : '';
			item.thumb = 'https://i.ytimg.com/vi/'+item.youtube_link.replace('https://www.youtube.com/watch?v=','')+'/default.jpg';
			html.push(template($('#sliderTpl').html(), item));
		});
		$('#imageSlider').html(html.join(''));
		$(".bxslider").bxSlider({
			captions: true,
			auto: true
	    });
	    slider_loaded = 1;
	}
	html = [];
	index_data.featured_videos.forEach(function(item, i){
		item.provider = attachments_server;
		item.thumb = item.snippet.thumbnails.medium.url;
		item.title = item.snippet.title;
		item.bust = +new Date();
		item.anytv_comment = item.anytv_comment || 0;
		item.comments = item.snippet.meta.statistics.commentCount;
		item.views = item.snippet.meta.statistics.viewCount;
		item.link = '/youtuber/?user='+item.user_id+'#!/video/'+item.snippet.resourceId.videoId;
		html.push(template($('#latestVideosTpl').html(), item));
	});
	if(!html.length) { html.push('目前沒有影片'); }
	$('#featuredVideos').html(html.join(''));
	html = [];
	var flag = {};
	index_data.latest_videos.forEach(function(item, i){
		var date = item.snippet.publishedAt.substr(0,10);
		if(!flag[date]) {
			flag[date] = [];
		}
		if(!~flag[date].indexOf(item.user_id)) {
			item.provider = attachments_server;
			item.thumb = item.snippet.thumbnails.medium.url;
			item.title = item.snippet.title;
			item.bust = +new Date();
			item.anytv_comment = item.anytv_comment || 0;
			item.comments = item.snippet.meta.statistics.commentCount;
			item.views = item.snippet.meta.statistics.viewCount;
			item.link = '/youtuber/?user='+item.user_id+'#!/video/'+item.snippet.resourceId.videoId;
			html.push(template($('#latestVideosTpl').html(), item));
			flag[date].push(item.user_id);
		}
	});

	if(!html.length) { html.push('目前沒有影片'); }
	$('#latestVideos').html(html.join(''));
	html = [];
	index_data.most_viewed.forEach(function(item, i){
		item.provider = attachments_server;
		item.thumb = item.snippet.thumbnails.medium.url;
		item.title = item.snippet.title;
		item.bust = +new Date();
		item.anytv_comment = item.anytv_comment || 0;
		item.comments = item.snippet.meta.statistics.commentCount;
		item.views = item.snippet.meta.statistics.viewCount;
		item.link = '/youtuber/?user='+item.user_id+'#!/video/'+item.snippet.resourceId.videoId;
		html.push(template($('#latestVideosTpl').html(), item));
	});
	if(!html.length) { html.push('目前沒有影片'); }
	$('#mostViewed').html(html.join(''));
	html = [];
	index_data.games.forEach(function(item, i){
		item.imgsrc = item.image;
		item.game = item.name;
		html.push(template($('#gameTpl').html(), item));
	});
	if(!html.length) { html.push('目前沒有遊戲'); }
	$('#latestGames').html(html.join(''));
	html = [];
	index_data.featured_games.forEach(function(item, i){
		item.imgsrc = item.image;
		item.game = item.name;
		html.push(template($('#gameTpl').html(), item));
	});
	if(!html.length) { html.push('目前沒有遊戲'); }
	$('#featuredGames').html(html.join(''));
	html = [];
	if(index_data.feature_list.feature_list_active ==='1') {
		$('.viewer > h2').html(index_data.feature_list.feature_list_header);
		index_data.feature_list.feature_list_items.forEach(function(item, i) {
			html.push(template($('#featureTpl').html(), item));
		});
		if(!html.length) { html.push('No feature available.') }
		$('#featuredUsers').html(html.join(''));
	} else {
		index_data.featured_users.forEach(function(item, i){
			item.provider = attachments_server;
			html.push(template($('#featuredUsersTpl').html(), item));
		});
		if(!html.length) { html.push('No User Available'); }
		$('#featuredUsers').html(html.join(''));
	}
	html = [];
	index_data.recent_threads.forEach(function(item, i){
		var data = {
			posterimage: attachments_server+'data/avatars/l/0/'
				+item.last_post_user_id+'.jpg?'+(+new Date),
			title: item.title,
			replies: item.reply_count,
			views: item.view_count,
			link: community+'index.php?threads/'+item.title+'.'+item.thread_id+'/',
		}
		html.push(template($('#recentForumItemTpl').html(), data));
	});
	if(!html.length) { html.push('No Recent Forum'); }
	var data = {
		threads: html.join('')
	}
	html = template($('#recentForumTpl').html(), data);
	$('#forumSection').html(html);

	html = [];
	index_data.threads.forEach(function(item, i){
		var data = {
			posterimage: attachments_server+'data/avatars/l/0/'
				+item.last_post_user_id+'.jpg?'+(+new Date),
			title: item.title,
			replies: item.reply_count,
			views: item.view_count,
			link: community+'index.php?threads/'+item.title+'.'+item.thread_id+'/',
		}
		html.push(template($('#recentForumItemTpl').html(), data));
	});
	if(!html.length) { html.push('No Recent Forum'); }
	var data = {
		threads: html.join('')
	}
	html = template($('#recentForumTpl').html(), data);
	$('#hotForumSection').html(html);

    $(".video [id^='tab-'], .games [id^='tab-'], .viewer .scroll, .streaming .scroll").mCustomScrollbar({
      theme:"inset-2"
    });

    $('.tooltip').tooltipster({
    	contentAsHTML: true,
    	position: 'top'
	});
};

