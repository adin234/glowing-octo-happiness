var slider = {};
var con = 'all';


$(".sf-menu").superfish();
slider.featured_games = $("#container-featured-games").bxSlider();
slider.latest_games = $("#container-latest-games").bxSlider();
slider.container_videos = $("#container-videos").bxSlider();
$(".tabs").tabslet({ animation: true });


page_data = $.parseJSON(page_data);
var hash;

var filter_game = function(input) {
    var $this = $(input);
    var filterString = $this.val();
    render_featured_games(filterString);
    render_games(filterString);
    slider.latest_games.reloadSlider();
    slider.featured_games.reloadSlider();
};

var filter_videos = function(input) {
    var $this = $('#txtbox-search-videos');
    var filterString = $this.val();
    var game = get_game();
    render_videos(filterString, game);
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

    if(!html.length) { html.push('No Game Available'); }
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

    if(!html.length) { html.push('No Game Available'); }
    $('#container-latest-games').html(html.join(''));
};

var render_videos = function(filter, game) {
    var html = [];
    var items = [];
    var ids = [];
    var tplVideo = $('#videoTpl').html();
    var tplVideoContainer = $('#videoContainerTpl').html();
    var activeMultiView = get_active_for_multiview();
    var filterRegExp = new RegExp(filter, 'i');
    var filterGame = (typeof game == 'undefined' || game == '' || game == 'all') ? 'all' : $('a.game[data-id='+game+']').first().attr('data-name');
    var filterGameRegExp = new RegExp(filterGame, 'i');

    page_data.streamers.forEach(function (item, i) {
        if(typeof filter != 'undefined' && !~item.twitch.channel.status.search(filterRegExp)) return;
        item.twitchid = item.field_value[item.field_value.length-1];
        // dont render if already active
        if(~activeMultiView.indexOf(item.twitchid)) return;
        if(filterGame != 'all' && ~item.twitch.game.trim().search(filterGameRegExp)) return;
        item.live = 'live';
        item.link = '/gamer_stream/'+item.user_id+'/'+item.twitchid;
        item.provider = attachments_server;
        item.thumb = item.twitch.channel.video_banner;
        item.title = item.twitch.channel.status;
        item.bust = +new Date();
        item.views = item.twitch.viewers;

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

    if(!html.length) { html.push('No Video Available'); }
    $('#container-videos').html(html.join(''));
    slider.container_videos.reloadSlider();
};

var get_game = function() {
    var game = utilHash.getHashArr()[0];

    return game == '' ? 'all' : game;
}

var filter_category = function(console) {
    con = console;
    $.getJSON(server+'gamesdata?console='+console, function(results) {
        page_data = results;
        render_page();
    });
};

var add_to_multiview = function() {
    var id = $(this).attr('data-id');
    $('#container-videos a[data-id='+id+']').parent('li').hide();
    var tplVideo = $('#videoMultiTpl').html();
    var streamer = page_data.streamers.filter(function (item) {
        return item.user_id == id;
    })[0];
    item = streamer;
    item.live = 'live';
    item.link = '/gamer_stream/'+item.user_id+'/'+item.twitchid;
    item.provider = attachments_server;
    item.thumb = streamer.twitch.channel.video_banner;
    item.title = streamer.twitch.channel.status;
    item.bust = +new Date();
    item.views = streamer.twitch.viewers;

    var multiview_item = template(tplVideo, item);
    $('#container-multiview ul.list').append(multiview_item);
    update_watch_multiview();
    if(!$('#container-videos li.live:visible').length) {
        $('.video.stream a[href=#tab-2-2]').trigger('click');
    };
};

var get_active_for_multiview = function() {
    var videos = $('#container-multiview ul.list > li');
    var ids = [];

    videos.each(function(i, item) {
        ids.push($(item).attr('data-id'));
    });

    return ids;
};

var update_watch_multiview = function() {
    var ids = get_active_for_multiview();
    var stream_link = '/gamer_stream_multi/';
    $('#watch-now-link').attr('href', stream_link+utilHash.buildHash(ids));
};

$('#txtbox-search-games').on('keydown', function(e) {
    if (e.keyCode == 13) { filter_game(this); }
});

$('#txtbox-search-videos').on('keydown', function(e) {
    if (e.keyCode == 13) { filter_videos(this); }
});

$('#container-videos').on('click', '.addToMultiview', add_to_multiview);

$('#container-multiview').on('click', '.remove-multiview', function() {
    var $this = $(this);
    var id = $this.parent('li').attr('data-id');
    $('#container-videos a.addToMultiview[data-twitch='+id+']').parent('li').show();

    $this.parent('li').remove();
    update_watch_multiview();
});

$(window).on('hashChange', function() {
    filter_videos();
});

var render_page = function() {
    $(window).trigger('hashchange');

    render_games();
    render_featured_games();
    filter_videos();
};

render_page();
