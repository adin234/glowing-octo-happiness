var popularSlider;
var newSlider;
var gamesSlider;
var slider = {};
var filterConsole = '';
var filterGame = '';

page_data = $.parseJSON(page_data);

slider.featured_games = $("#container-featured-games").bxSlider();
slider.latest_games = $("#container-latest-games").bxSlider();

popularSlider = $(".bxslider.videos.popular").bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true
});
newSlider = $(".bxslider.videos.new").bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true
});
allSlider = $(".bxslider.videos.all").bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true
});

var gameNames = [];
page_data.games.forEach(function(item) {
    gamesAutocompleteArray.push({value: item.name, data: item});
    gameNames.push(item.name);
    if(!~gameNames.indexOf(item.chinese)) {
        gamesAutocompleteArray.push({value: item.chinese, data: item});
    }
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

var filter_category = function(con, context) {
    var parameters = {};

    filterConsole = con;

    if(filterConsole.length) {
        parameters.console = filterConsole;
    }
    if(filterGame.length) {
        parameters.game = filterGame;
    }

    $.getJSON(server+'youtubers?'+$.param(parameters), function(results) {
        page_data = results;
        if(con == 'vlogs') {
            $('.game-container').css('display', 'none');
        } else {
            $('.game-container').css('display', 'block');
        }

        render_page();
    }).done(function() {
        $(context).parent().siblings().removeClass('current');
        $(context).parent().addClass('current');
    });
};

$(window).on('hashchange', function(){
    var parameters = {};

    hash = get_hash();
    hash = hash.filter(function(item) {
        return item != "";
    });

    if(hash.length) {
        var id = hash.shift();
        filterGame = id = id.replace('#!', '');
        $('.game-item').each(function(i, item) {
            $(item).removeClass('active');
        });

        if(id.trim() === '' || id.trim() === '#!') {

            filterGame = '';
            $.getJSON(server+'youtubers', function(result) {
                page_data.new_youtubers = result.new_youtubers;
                page_data.popular_youtubers = result.popular_youtubers;
                page_data.youtubers = result.youtubers;
                render_new_members();
                render_all_members();
                render_popular_members();
            });
            return;
        }

        $('[data-id='+id+']').parent().addClass('active');
        $('#game-title').html($('[data-id='+id+']').attr('data-name'));

        if(filterConsole.length) {
            parameters.console = filterConsole;
        }
        if(filterGame.length) {
            parameters.game = filterGame;
        }

        $.getJSON(server+'youtubers?'+$.param(parameters), function(result) {
            page_data = result;
            render_new_members();
            render_all_members();
            render_popular_members();
        });
    } else {
        render_new_members();
        render_all_members();
        render_popular_members();
    }
});

$('body').on('keydown', '#txtbox-search-games', function(e) {
    if (e.keyCode == 13) { filter_game(this); }
});

$('body').on('keydown', '#txtbox-search-videos', function(e) {
    if (e.keyCode == 13) { filter_videos(this); }
});

var filter_game = function(input) {
    var $this = $(input);
    var filterString = $this.val();
    render_featured_games(filterString);
    // slider.featured_games.reloadSlider({startSlide: 0});
    render_latest_games(filterString);
    // slider.latest_games.reloadSlider({startSlide: 0});
    $('.tooltip').tooltipster({contentAsHTML: true});
};

var filter_videos = function(input) {
    var $this = $(input);
    var filterString = $this.val();
    render_new_members(filterString);
    // newSlider.reloadSlider({startSlide: 0});
    render_all_members(filterString);
    // allSlider.reloadSlider({startSlide: 0});
    render_popular_members(filterString);
    // popularSlider.reloadSlider({startSlide: 0});
};

var render_featured_games = function (filter) {
    var html = [];
    var items = [];
    filter =  new RegExp(filter, 'i');

    page_data.featured_games.forEach(function(item, i){
        if(item.name.search(filter) == -1 && item.chinese.search(filter) == -1) return;

        item.game = item.name;
        item.id = item.id.trim();
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
        if(item.name.search(filter) == -1 && item.chinese.search(filter) == -1) return;
        item.id = item.id.trim();

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

var render_all_members = function(filter) {
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
        if(items.length == 16) {
            html.push(template(tplVideoContainer, {'items' : items.join('')}));
            items = [];
        }
    });

    if(items.length != 0) {
        html.push(template(tplVideoContainer, {'items' : items.join('')}));
    }

    if(!html.length) { html.push('沒有此實況主'); }
    $('#container-all-member').html(html.join(''));
    allSlider.reloadSlider();
};

var render_new_members = function(filter) {
    var html = [];
    var items = [];
    var ids = [];
    var tplVideo = $('#videoTpl').html();
    var tplVideoContainer = $('#videoContainerTpl').html();
    filter =  new RegExp(filter, 'i');

    page_data.new_youtubers.forEach(function (item, i) {
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
        if(items.length == 16) {
            html.push(template(tplVideoContainer, {'items' : items.join('')}));
            items = [];
        }
    });

    if(items.length != 0) {
        html.push(template(tplVideoContainer, {'items' : items.join('')}));
    }

    if(!html.length) { html.push('沒有此實況主'); }
    $('#container-new-member').html(html.join(''));
    allSlider.reloadSlider();
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
           && item.video.snippet.channelTitle.search(filter) == -1
           && item.video.username.search(filter) == -1) return;
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
        if(items.length == 16) {
            html.push(template(tplVideoContainer, {'items' : items.join('')}));
            items = [];
        }
    });

    if(items.length != 0) {
        html.push(template(tplVideoContainer, {'items' : items.join('')}));
    }

    if(!html.length) { html.push('沒有此實況主'); }
    $('#container-popular-member').html(html.join(''));

    popularSlider.reloadSlider();
};


$(function() {
    $(".sf-menu").superfish();
    $(".tabs").tabslet({ animation: true });
    $(".games .tab li a").on('click', function() {
        var search = $('#txtbox-search-games');
        search.val('');
        filter_game(search);
        window.location.hash = '#!';
    });
});

var render_page = function() {
    render_latest_games();
    render_featured_games();
    $(window).trigger('hashchange');
    $('.tooltip').tooltipster({contentAsHTML: true});
};

render_page();
