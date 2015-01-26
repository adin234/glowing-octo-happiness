var slider = {};
var con = 'all';


$(".sf-menu").superfish();
// slider.featured_games = $("#container-featured-games").bxSlider();
// slider.latest_games = $("#container-latest-games").bxSlider();
slider.container_videos = $("#container-videos").bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true
});
slider.container_lanparty = $("#container-lanparty").bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true
});
$(".tabs").tabslet({ animation: true });

page_data = $.parseJSON(page_data);
var hash;

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

    slider.featured_games.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });
}

var render_latest_games = function(filter) {
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

    slider.latest_games.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });
};

var filter_game = function(input) {
    var $this = $(input);
    var filterString = $this.val();
    render_featured_games(filterString);
    render_latest_games(filterString);
};

var render_videos = function(filter, game, lanparty) {
    var html = [];
    var items = [];
    var ids = [];
    var tplVideo = $('#videoTpl').html();
    var tplVideoContainer = $('#videoContainerTpl').html();
    var activeMultiView = get_active_for_multiview();
    var filterRegExp = new RegExp(filter, 'i');
    var filterGame = (typeof game == 'undefined' || game == '' || game == 'all')
        ? 'all'
        : $('a.game[data-id='+game+']').first()
            .attr('data-name');
    var filterGameRegExp = new RegExp(filterGame, 'i');

    var itemToComplete = 9;

    var source = lanparty && typeof lanparty != 'undefined'
        ? page_data.lanparty
        : page_data.streamers;

    source.forEach(function (item, i) {
        //console.log(item);
        if(typeof item.twitch != 'undefined') {
            if(typeof filter != 'undefined'
            && item.twitch.channel.status
            && !~item.twitch.channel.status.search(filterRegExp)
            && !~item.username.search(filterRegExp)) return;
            item.twitchid = item.field_value[item.field_value.length-1];
            // dont render if already active
            if(filterGame != 'all' && ~item.twitch.game.trim().search(filterGameRegExp)) return;
            item.id = 'TW'+item.twitchid;
            item.idraw = item.twitchid;
            item.live = 'live';
            item.link = lanparty && typeof lanparty != 'undefined'
                ? '/lanparty_stream_multi/#/'+item.id
                : '/gamer_stream/?user='+item.user_id+'#!/'+item.id;
            item.provider = attachments_server;
            item.thumb = item.twitch.preview.large;
            item.title = item.twitch.channel.status;
            item.bust = 1;
            item.type = 'TW';
            item.views = item.twitch.viewers;
        } else {
            if(typeof filter != 'undefined'
            && !~item.username.search(filterRegExp)) return;
            item.id = 'YT'+item.username;
            item.idraw= item.youtube.id;
            item.live = 'live';
            item.link = lanparty && typeof lanparty != 'undefined'
                ? '/lanparty_stream_multi/#/'+item.id
                : '/gamer_stream/?user='+item.user_id+'#!/'+item.id;
            item.provider = attachments_server;
            item.thumb = item.youtube.snippet.thumbnails.high.url;
            item.title = item.youtube.snippet.title;
            item.bust = 1;
            item.type = 'YT';
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

    if(!lanparty) {
        $('#container-videos').html(html.join(''));
    } else {
        $('#container-lanparty').html(html.join(''));
    }

    
    if (typeof(filter) !== 'undefined' || filter !== '') {
        if(!html.length && $('#container-videos').html().trim().length === 0) {
            html.push('無法找到你指定的實況主');
            if(!lanparty) {
                $('#container-videos').html(html.join(''));
            } else {
                $('#container-lanparty').html(html.join(''));
            }
        }  
    } else {
        if(!html.length && $('#container-videos').html().trim().length === 0) {
            html.push('目前沒有正在直播的實況主');
            if(!lanparty) {
                $('#container-videos').html(html.join(''));
            } else {
                $('#container-lanparty').html(html.join(''));
            }
        }        

    }
    
    var activeSlider = !lanparty
        ? slider.container_videos
        : slider.container_lanparty;

    var currentSlide = activeSlider.getCurrentSlide();

    activeSlider.reloadSlider({
        activeSlide: currentSlide,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    if(slider.container_videos.getSlideCount() < 2) {
        if(!lanparty) {
            $('#tab-2-1 .bx-controls').css('opacity', 0);
        } else {
            $('#tab-2-2 .bx-controls').css('opacity', 0);
        }
    } else {
        if(!lanparty) {
            $('#tab-2-1 .bx-controls').css('opacity', 100);
        } else {
            $('#tab-2-2 .bx-controls').css('opacity', 100);
        }
    }

    $('#container-videos .uploader > img').on('load', function(e) {
        if($(this).width() > $(this).height()) {
            $(this).height('100%');
            $(this).css('margin-left', -(($(this).width()-68)/2));
        } else {
            $(this).width('100%');
            $(this).css('margin-top', -(($(this).height()-68)/2));
        }
    });
};

var get_youtube_streams = function(filter, game, fetch) {
    $.getJSON(server+'streamers/youtube', function(result) {
        result.streamers.forEach(function(item) {
            page_data.streamers.push(item);
        });
        render_videos();
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
        item.link = '/gamer_stream/?user='+item.user_id+'#!/'+item.id;
        item.provider = attachments_server;
        item.thumb = item.twitch.preview.large;
        item.title = item.twitch.channel.status;
        item.bust = 1;
        item.type = 'TW';
        item.views = item.twitch.viewers;
    } else {
        item.id = 'YT'+item.username;
        item.idraw= item.youtube.id;
        item.live = 'live';
        item.link = '/gamer_stream/?user='+item.user_id+'#!/'+item.id;
        item.provider = attachments_server;
        item.thumb = item.youtube.snippet.thumbnails.high.url;
        item.title = item.youtube.snippet.title;
        item.bust = 1;
        item.type = 'YT';
        item.views = '0';
    }

    var multiview_item = template(tplVideo, item);
    $('#container-multiview ul.list').append(multiview_item);
    update_watch_multiview();
    if(($('#tab-2-1').css('display') === 'block' && !$('#container-videos li.live:visible').length)
        || ($('#tab-2-2').css('display') === 'block' && !$('#container-lanparty li.live:visible').length)) {
        $('.video.stream a[href=#tab-2-3]').trigger('click');
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
    var watch_now_button = $('#watch-now-link');
    var videos = $('#container-multiview ul.list > li');

    if(videos.length) {
        watch_now_button.removeClass('disabled');
    } else {
        watch_now_button.addClass('disabled');
    }

    $('#multiview-count').html(videos.length);

    watch_now_button.attr('href', stream_link+utilHash.buildHash(ids));
};

$('#txtbox-search-games').on('keydown', function(e) {
    if (e.keyCode == 13) { filter_game(this); }
});

$('#txtbox-search-videos').on('keydown', function(e) {
    if (e.keyCode == 13) {
        filter_videos(this);
    }
});

$('#txtbox-search-videos').on('keypress', function(e) {
    if (e.keyCode == 13) {
        filter_videos(this);
    } else {
        streamersSearch();
    }
});

$('#container-videos').on('click', '.addToMultiview', add_to_multiview);

$('#container-multiview').on('click', '.remove-multiview', function() {
    var $this = $(this);
    var id = $this.parent('li').attr('data-id');

    $('#container-videos a.addToMultiview[data-twitch='+id+']').parent('li').show();

    $this.parent('li').remove();

    update_watch_multiview();
    render_videos();
});

$(window).on('hashChange', function() {
    filter_videos();
});

var render_page = function() {
    // render_latest_games();
    // render_featured_games();
    render_videos();
    $('.tooltip').tooltipster({contentAsHTML: true});
    $(window).trigger('hashchange');
    get_youtube_streams();
};

render_page();

streamersSearch();

$.getJSON(server+'streamers?lanparty=1', function(e) {
    page_data.lanparty = e.streamers;
    render_videos(undefined, undefined, true);
    $.getJSON(server+'streamers/youtube?lanparty=1', function(result) {
        result.streamers.forEach(function(item) {
            page_data.lanparty.push(item);
        });
        render_videos(undefined,undefined,1);
    });
});


var YTStreamers = [];
var TWStreamers = [];
var onlineStreamers = [];

var getOnlineStreamers = function(link, streamType) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: link,
    }).done(function (data) {
        if (streamType === 'YT') {
            YTStreamers = [];
            $.merge(YTStreamers, data.streamers);
        } else {
            TWStreamers = [];
            $.merge(TWStreamers, data.streamers);
        }
    });
};

var checker = setInterval(function() {
    if ($('#txtbox-search-videos').val() === '' && $('#tab-2-1').css('display') === 'block' && $('#multiview-count').text() === '0') {
        getOnlineStreamers(server + 'streamers', 'TW');
        getOnlineStreamers(server + 'streamers/youtube', 'YT');
        
        onlineStreamers = [];
        $.merge(onlineStreamers, $.merge(YTStreamers, TWStreamers));
        
        if (onlineStreamers.length > 0) {
            if (onlineStreamers.length !== $('a[href$="/streamers"] > sup').text()) {
                $('a[href$="/streamers"] > sup').text(onlineStreamers.length);
            }        
        }
        else {
            if (onlineStreamers.length === 0 && $('a[href$="/streamers"] > sup').text() === '') {
                $('a[href$="/streamers"] > sup').text('');
            }
        }

    }
},5000);

$('a[href$="#tab-2-1"]').on('click',function() {
    window.location.assign(origin + 'streamers');
});




