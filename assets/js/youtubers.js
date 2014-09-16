$(function() {
    $(".sf-menu").superfish();
    $(".bxslider").bxSlider();
    $(".tabs").tabslet({ animation: true });
});

page_data = $.parseJSON(page_data);

var render_featured_games = function () {
    var html = [];
    var items = [];
    page_data.featured_games.forEach(function(item, i){
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

    $('#container-featured-games').html(html.join(''));
}

var render_games = function() {
    var html = [];
    var items = [];

    page_data.games.forEach(function(item, i){
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


var getPhoto = function(id) {
  $.getJSON('http://gdata.youtube.com/feeds/api/users/'+id+
    '?fields=yt:username,media:thumbnail,title&alt=json',
    {},
    function(e) {
      $('.photo-'+id).attr('src',e['entry']['media$thumbnail']['url']);
    }
  );
};

var render_new_members = function() {
    var html = [];
    var items = [];
    var ids = [];
    var tplVideo = $('#videoTpl').html();
    var tplVideoContainer = $('#videoContainerTpl').html();

    page_data.youtubers.forEach(function (item, i) {
        if(typeof item.video == 'undefined') return;

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
