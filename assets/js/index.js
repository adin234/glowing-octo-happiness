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


	slider_loaded = 1;
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
	            item.link = 'gamer_stream/'+item.user_id+'/'+item.id;
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
	            item.link = 'gamer_stream/'+item.user_id+'/'+item.id;
	            item.provider = attachments_server;
	            item.thumb = item.youtube.snippet.thumbnails.high.url;
	            item.title = item.youtube.snippet.title;
	            item.bust = +new Date();
	            item.views = '0';
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
			item.provider = attachments_server;
			html.push(template($('#sliderTpl').html(), item));
		});
		$('#imageSlider').html(html.join(''));
		$(".bxslider").bxSlider({
			captions: true,
	    });
	}
	html = [];
	index_data.featured_videos.forEach(function(item, i){
		item.provider = attachments_server;
		item.thumb = item.snippet.thumbnails.medium.url;
		item.title = item.snippet.title;
		item.bust = +new Date();
		item.comments = item.snippet.meta.statistics.commentCount;
		item.views = item.snippet.meta.statistics.viewCount;
		item.link = '/youtuber/'+item.user_id+'#!/video/'+item.snippet.resourceId.videoId;
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
			item.comments = item.snippet.meta.statistics.commentCount;
			item.views = item.snippet.meta.statistics.viewCount;
			item.link = '/youtuber/'+item.user_id+'#!/video/'+item.snippet.resourceId.videoId;
			html.push(template($('#latestVideosTpl').html(), item));
			flag[date].push(item.user_id);
		}
	});
	console.log(flag);
	if(!html.length) { html.push('目前沒有影片'); }
	$('#latestVideos').html(html.join(''));
	html = [];
	index_data.most_viewed.forEach(function(item, i){
		item.provider = attachments_server;
		item.thumb = item.snippet.thumbnails.medium.url;
		item.title = item.snippet.title;
		item.bust = +new Date();
		item.comments = item.snippet.meta.statistics.commentCount;
		item.views = item.snippet.meta.statistics.viewCount;
		item.link = '/youtuber/'+item.user_id+'#!/video/'+item.snippet.resourceId.videoId;
		html.push(template($('#latestVideosTpl').html(), item));
	});
	if(!html.length) { html.push('No Video Available'); }
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
	index_data.featured_users.forEach(function(item, i){
		item.provider = attachments_server;
		html.push(template($('#featuredUsersTpl').html(), item));
	});
	if(!html.length) { html.push('No User Available'); }
	$('#featuredUsers').html(html.join(''));
	html = [];

    $(".video [id^='tab-'], .games [id^='tab-'], .viewer ul, .streaming ul").mCustomScrollbar({
      theme:"inset-2",
    });
};
