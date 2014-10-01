var popularSlider;
var newSlider;
var gamesSlider;
$(function() {
    $(".sf-menu").superfish();
    gamesSlider = $(".bxslider.games").bxSlider();
    popularSlider = $(".bxslider.videos.popular").bxSlider({
        infiniteLoop: false,
        hideControlOnEnd: true
    });
    newSlider = $(".bxslider.videos.new").bxSlider({
        infiniteLoop: false,
        hideControlOnEnd: true
    });
    $(".tabs").tabslet({ animation: true })
    .on('_before', function(e) {
        $('.tooltip').tooltipster('destroy');
    })
    .on('_after', function(e) {
        $('.tooltip').tooltipster({contentAsHTML: true});
    });
});

page_data = $.parseJSON(page_data);

$('#txtbox-search-games').on('keydown', function(e) {
    if (e.keyCode == 13) { filter_game(this); }
});

$('#txtbox-search-videos').on('keydown', function(e) {
    if (e.keyCode == 13) { filter_videos(this); }
});

var filter_game = function(input) {
    var $this = $(input);
    var filterString = $this.val();
    render_featured_games(filterString);
    render_games(filterString);
    gamesSlider.reloadSlider();
};

var filter_videos = function(input) {
    var $this = $(input);
    var filterString = $this.val();
    render_new_members(filterString);
    render_popular_members(filterString);
    newSlider.reloadSlider();
    popularSlider.reloadSlider();
};

var render_featured_games = function (filter) {
    var html = [];
    var items = [];
    filter =  new RegExp(filter, 'i');

    page_data.featured_games.forEach(function(item, i){
        if(item.name.search(filter) == -1) return;

        item.game = item.name;
        items.push(template($('#gameTpl').html(), item));
        if(items.length == 12) {
            html.push(template($('#gameContainerTpl').html(), {'items' : items.join('')}));
            items = []
        }
    });

    if(items.length != 0) {
        html.push(template($('#gameContainerTpl').html(), {'items' : items.join('')}));
    }

    if(!html.length) { html.push('目前沒有遊戲'); }
    $('#container-featured-games').html(html.join(''));
}

var render_games = function(filter) {
    var html = [];
    var items = [];
    filter =  new RegExp(filter, 'i');

    page_data.games.forEach(function(item, i){
        if(item.name.search(filter) == -1) return;
        items.push(template($('#gameTpl').html(), item));
        if(items.length == 12) {
            html.push(template($('#gameContainerTpl').html(), {'items' : items.join('')}));
            items = []
        }
    });

    if(items.length != 0) {
        html.push(template($('#gameContainerTpl').html(), {'items' : items.join('')}));
    }

    if(!html.length) { html.push('目前沒有遊戲'); }
    $('#container-latest-games').html(html.join(''));
};

var render_new_members = function(filter) {
    var html = [];
    var items = [];
    var ids = [];
    var tplVideo = $('#videoTpl').html();
    var tplVideoContainer = $('#videoContainerTpl').html();
    filter =  new RegExp(filter, 'i');

    page_data.youtubers.forEach(function (item, i) {
        if(typeof item.video == 'undefined') return;
        if(item.video.snippet.title.search(filter) == -1
           && item.video.snippet.channelTitle.search(filter) == -1) return;
        item.user_id = item.userId;
        item.title = item.video.snippet.title;
        item.thumb = item.video.snippet.thumbnails.medium.url;
        item.view = item.video.snippet.meta.statistics.viewCount;
        item.comment = item.video.snippet.meta.statistics.commentCount;
        item.channelid = item.youtube_id;
        item.live = '';

        item.provider = attachments_server;
        item.videoid = item.video.snippet.resourceId.videoId;
        item.bust = new Date();

        items.push(template(tplVideo, item));
        ids.push(item.youtube_id);
        if(items.length == 9) {
            html.push(template(tplVideoContainer, {'items' : items.join('')}));
            items = [];
        }
    });

    if(items.length != 0) {
        html.push(template(tplVideoContainer, {'items' : items.join('')}));
    }

    if(!html.length) { html.push('No Member Available'); }
    $('#container-new-member').html(html.join(''));
};


var render_popular_members = function(filter) {
    var html = [];
    var items = [];
    var ids = [];
    var tplVideo = $('#videoTpl').html();
    var tplVideoContainer = $('#videoContainerTpl').html();
    filter =  new RegExp(filter, 'i');

    page_data.popular_youtubers.forEach(function (item, i) {
        if(typeof item.video == 'undefined') return;
        if(item.video.snippet.title.search(filter) == -1
           && item.video.snippet.channelTitle.search(filter) == -1) return;
        item.user_id = item.userId;
        item.title = item.video.snippet.title;
        item.thumb = item.video.snippet.thumbnails.medium.url;
        item.view = item.video.snippet.meta.statistics.viewCount;
        item.comment = item.video.snippet.meta.statistics.commentCount;
        item.channelid = item.youtube_id;
        item.live = '';

        item.provider = attachments_server;
        item.videoid = item.video.snippet.resourceId.videoId;
        item.bust = new Date();

        items.push(template(tplVideo, item));
        ids.push(item.youtube_id);
        if(items.length == 9) {
            html.push(template(tplVideoContainer, {'items' : items.join('')}));
            items = [];
        }
    });

    if(items.length != 0) {
        html.push(template(tplVideoContainer, {'items' : items.join('')}));
    }

    if(!html.length) { html.push('No Member Available'); }
    $('#container-popular-member').html(html.join(''));
};

render_new_members();
render_popular_members();

render_games();
render_featured_games();
$('.tooltip').tooltipster({contentAsHTML: true});
