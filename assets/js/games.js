page_data = $.parseJSON(page_data);

var slider = {};
var con = 'all';
var currentPage = 1;
var hash;
var filterConsole = '';
var filterGame = '';

slider.featured_games = $("#container-featured-games").bxSlider();
slider.latest_games = $("#container-latest-games").bxSlider();
slider.container_videos = $("#container-videos").bxSlider({
                                infiniteLoop: false,
                                hideControlOnEnd: true
                            });

var get_hash = function() {
    var hash = window.location.hash.replace('#!/', '').replace(/#tab-\d-\d/i, '');
    hash = hash.split('/');
    return hash;
};

var get_game = function() {
    var game = get_hash()[0];

    return game == '' ? 'all' : game;
}

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
    $('.tooltip').tooltipster({contentAsHTML: true});
};

var filter_videos = function(input) {
    var $this = $(input);
    var filterString = $this.val();
    var game = get_game();
    $.getJSON(server+'games/'+game+'/videos?limit=18&console='+con+'&search='+filterString, function(result) {
        page_data.videos = result;
        render_videos();
    });
};

var render_videos = function() {
    var html = [];
    var items = [];
    var ids = [];
    var tplVideo = $('#videoTpl').html();
    var tplVideoContainer = $('#videoContainerTpl').html();

    page_data.videos.forEach(function (item, i) {
        item.provider = attachments_server;
        item.thumb = item.snippet.thumbnails.medium.url;
        item.title = item.snippet.title;
        item.bust = +new Date();
        item.comments = item.snippet.meta.statistics.commentCount;
        item.views = item.snippet.meta.statistics.viewCount;
        item.link = '/youtuber/'+item.user_id+'#!/video/'+item.snippet.resourceId.videoId;

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
    $(".video .bx-next.disabled, .video .bx-prev.disabled").each(function(i, item) {
            $(this).removeClass('disabled');
        });
    var currentSlide = slider.container_videos.getCurrentSlide();
    slider.container_videos.reloadSlider({
        onSlideAfter: load_game_videos_next_page,
        infiniteLoop: false,
        hideControlOnEnd: true
    });
};

var load_game_videos_next_page = function() {
    var html = [];
    var items = [];
    var page = Math.floor(slider.container_videos.getSlideCount()/2);
    var nextPage = page+1;
    if(nextPage <= currentPage) { return; }
    currentPage = nextPage;
    var tplVideo = $('#videoTpl').html();
    var tplVideoContainer = $('#videoContainerTpl').html();
    var game = get_game();
    var filter = $('#txtbox-search-videos').val();
    $.getJSON(server+'games/'+game+'/videos?limit=18&console='+con+'&page='+nextPage+'&search='+filter, function(result) {
        page_data.videos.concat(result);
        result.forEach(function (item, i) {
            item.provider = attachments_server;
            item.thumb = item.snippet.thumbnails.medium.url;
            item.title = item.snippet.title;
            item.bust = +new Date();
            item.comments = item.snippet.meta.statistics.commentCount;
            item.views = item.snippet.meta.statistics.viewCount;
            item.link = '/youtuber/'+item.user_id+'#!/video/'+item.snippet.resourceId.videoId;

            items.push(template(tplVideo, item));

            if(items.length == 9) {
                html.push(template(tplVideoContainer, {'items' : items.join('')}));
                items = [];
            }
        });

        if(items.length != 0) {
           html.push(template(tplVideoContainer, {'items' : items.join('')}));
        }

        $("#container-videos").append(html.join(''));

        var currentSlide = slider.container_videos.getCurrentSlide();

        slider.container_videos.reloadSlider({
            startSlide: currentSlide,
            onSlideAfter: load_game_videos_next_page,
            infiniteLoop: false,
            hideControlOnEnd: true
        });

        if(currentSlide != slider.container_videos.getSlideCount() - 1) {
            $(".video .bx-next.disabled, .video .bx-prev.disabled").each(function(i, item) {
                $(this).removeClass('disabled');
            });
        }

        if(slider.container_videos.getCurrentSlide() == 0) {
            $(".video .bx-prev").addClass('disabled');
        }
    });
}

var render_game_videos = function(game, page) {
    var parameters = {
        limit: 18
    };

    filterGame = game;

    if(filterConsole.length) {
        parameters.console = filterConsole;
    }
    if(filterGame.length) {
        parameters.game = filterGame;
    }

    page = typeof page !== 'undefined' ? '&page='+page : '';

    $.getJSON(server+'games/'+game+'/videos?'+$.param(parameters)+page, function(result) {
        page_data.videos = result;
        render_videos();
    });
};

var filter_category = function(cons, context) {
    var parameters = {};

    filterConsole = cons;

    if(filterConsole.length) {
        parameters.console = filterConsole;
    }
    if(filterGame.length) {
        parameters.game = filterGame;
    }

    $.getJSON(server+'gamesdata?'+$.param(parameters), function(results) {
        page_data = results;
        render_page();
    }).done(function() {
        $(context).parent().siblings().removeClass('current');
        $(context).parent().addClass('current');
    });
};

var render_page = function() {
    render_latest_games();
    render_featured_games();
    $(window).trigger('hashchange');
    $('.tooltip').tooltipster({contentAsHTML: true});
};

$(window).on('hashchange', function(){
    hash = get_hash();
    hash = hash.filter(function(item) {
        return item != "";
    });

    if(hash.length) {
        var id = hash.shift();
        filterGame = id;
        $('.game-item').each(function(i, item) {
            $(item).removeClass('active');
        });
        $('[data-id='+id+']').parent().addClass('active');
        $('#game-title').html($('[data-id='+id+']').attr('data-chi'));
        render_game_videos(id);
    } else {
        render_videos();
    }
});

$(function() {
    $(".sf-menu").superfish();
    $(".tabs").tabslet({ animation: true });
});

$('#txtbox-search-games').on('keydown', function(e) {
    if (e.keyCode == 13) { filter_game(this); }
});

$('#txtbox-search-videos').on('keydown', function(e) {
    if (e.keyCode == 13) { filter_videos(this); }
});

render_page();
