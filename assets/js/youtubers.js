$(function() {
    $(".sf-menu").superfish();
    $(".bxslider").bxSlider();
    $(".tabs").tabslet({ animation: true });
});

page_data = $.parseJSON(page_data);


var getPhoto = function(id) {
  $.getJSON('http://gdata.youtube.com/feeds/api/users/'+id+
    '?fields=yt:username,media:thumbnail,title&alt=json',
    {},
    function(e) {
      $('.photo-'+id).attr('src',e['entry']['media$thumbnail']['url']);
    }
  );
};

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
    $(".bxslider.games").bxSlider();
};

var filter_videos = function(input) {
    var $this = $(input);
    var filterString = $this.val();
    render_new_members(filterString);
    $(".bxslider.videos").bxSlider();
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

    $('#container-featured-games').html(html.join(''));
}

var render_games = function(filter) {
    var html = [];
    var items = [];
    filter =  new RegExp(filter, 'i');

    page_data.games.forEach(function(item, i){
        if(item.name.search(filter) == -1) return;

        item.imgsrc = item.image;
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
        item.title = item.video.snippet.title;
        item.thumb = item.video.snippet.thumbnails.medium.url;
        item.view = item.video.snippet.meta.statistics.viewCount;
        item.comment = item.video.snippet.meta.statistics.commentCount;
        item.channelid = item.youtube_id;
        item.live = '';

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

    $('#container-new-member').html(html.join(''));
    ids.forEach(function(id, i) {
        getPhoto(id);
    });
};

render_new_members();


render_games();
render_featured_games();
