var index_data;
var slider_loaded = 0;
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
		var html = [];
		data.streamers.forEach(function(item, i) {
			item.provider = attachments_server;
			item.game = item.twitch.game;
			item.streamlink = item.twitch.channel.url;
			html.push(template($('#streamersTpl').html(), item));
		});
		if(!html.length) { html.push('No Streamer Available'); }
		$('#streamers').html(html.join(''));
	});

	update_index(index_data);
	slider_loaded = 1;
});

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
	if(!html.length) { html.push('No Video Available'); }
	$('#featuredVideos').html(html.join(''));
	html = [];
	index_data.latest_videos.forEach(function(item, i){
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
	$('#latestVideos').html(html.join(''));
	html = [];
	index_data.games.forEach(function(item, i){
		item.imgsrc = item.image;
		item.game = item.name;
		html.push(template($('#gameTpl').html(), item));
	});
	if(!html.length) { html.push('No Game Available'); }
	$('#latestGames').html(html.join(''));
	html = [];
	index_data.featured_games.forEach(function(item, i){
		item.imgsrc = item.image;
		item.game = item.name;
		html.push(template($('#gameTpl').html(), item));
	});
	if(!html.length) { html.push('No Game Available'); }
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
