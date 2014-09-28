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
        if(typeof item.twitch != 'undefined') {
            if(typeof filter != 'undefined' && !~item.twitch.channel.status.search(filterRegExp)) return;
            item.twitchid = item.field_value[item.field_value.length-1];
            // dont render if already active
            if(~activeMultiView.indexOf(item.twitchid)) return;
            if(filterGame != 'all' && ~item.twitch.game.trim().search(filterGameRegExp)) return;
            item.id = 'TW'+item.twitchid;
            item.idraw = item.twitchid;
            item.live = 'live';
            item.link = '/gamer_stream/'+item.user_id+'/'+item.id;
            item.provider = attachments_server;
            item.thumb = item.twitch.preview.large;
            item.title = item.twitch.channel.status;
            item.bust = +new Date();
            item.views = item.twitch.viewers;
        } else {
            if(~activeMultiView.indexOf(item.youtube.id)) return;
            item.id = 'YT'+item.youtube.id;
            item.idraw= item.youtube.id;
            item.live = 'live';
            item.link = '/gamer_stream/'+item.user_id+'/'+item.id;
            item.provider = attachments_server;
            item.thumb = item.youtube.snippet.thumbnails.high.url;
            item.title = item.youtube.snippet.title;
            item.bust = +new Date();
            item.views = '0';
        }

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

    if(!html.length) { html.push('目前沒有影片'); }
    $('#container-videos').html(html.join(''));
    slider.container_videos.reloadSlider();
};

var get_youtube_streams = function(filter, game, fetch) {
    $.getJSON(server+'streamers/youtube', function(result) {
        result.streamers.forEach(function(item) {
            page_data.streamers.push(item);
        });
        render_videos(filter, game);
    });
}

var get_game = function() {
    var game = utilHash.getHashArr()[0];

    return game == '' ? 'all' : game;
}

var filter_category = function(console, context) {
    con = console;
    $.getJSON(server+'streamersdata?console='+console, function(results) {
        page_data = results;
        render_page();
    }).done(function() {
        $(context).parent().siblings().removeClass('current');
        $(context).parent().addClass('current');
    });
};

var add_to_multiview = function() {
    var id = $(this).attr('data-streamidraw');
    $('#container-videos a[data-streamidraw='+id+']').parent('li').hide();
    var tplVideo = $('#videoMultiTpl').html();
    var streamer = page_data.streamers.filter(function (item) {
        if(typeof item.twitchid != 'undefined' && item.twitchid == id)  {
            return true;
        }
        if(typeof item.youtube != 'undefined' && item.youtube.id == id) {
            return true;
        }
        return false;
    })[0];

    var item = streamer;

    if(typeof item.twitch != 'undefined') {
        item.twitchid = item.field_value[item.field_value.length-1];
        // dont render if already active
        item.id = 'TW'+item.twitchid;
        item.idraw = item.twitchid;
        item.live = 'live';
        item.link = '/gamer_stream/'+item.user_id+'/'+item.id;
        item.provider = attachments_server;
        item.thumb = item.twitch.preview.large;
        item.title = item.twitch.channel.status;
        item.bust = +new Date();
        item.views = item.twitch.viewers;
    } else {
        item.id = 'YT'+item.youtube.id;
        item.idraw= item.youtube.id;
        item.live = 'live';
        item.link = '/gamer_stream/'+item.user_id+'/'+item.id;
        item.provider = attachments_server;
        item.thumb = item.youtube.snippet.thumbnails.high.url;
        item.title = item.youtube.snippet.title;
        item.bust = +new Date();
        item.views = '0';
    }

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
        ids.push($(item).attr('data-streamid'));
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
    get_youtube_streams();
    render_games();
    render_featured_games();
    $(window).trigger('hashchange');
};

render_page();
