var index_data;
var slider_loaded = 0;
var streamersList = [];
/* RDC - 2015.01.15 : Placeholder for all active streamers */
var onlineStreamers = [];

var hash = '';
$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: server+"index",
}).done(function (data) {
    index_data = data;
});

var slider = {};
slider.most_viewed = $("#mostViewed").bxSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });
slider.latest_video = $("#latestVideos").bxSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });
slider.featured_video = $("#featuredVideos").bxSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });
slider.featured_games = $("#featuredGames").bxSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });
slider.latest_games = $("#latestGames").bxSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

var load_more = function(selector, page, per_page) {
    $(selector).slice(0, page*per_page).show();
    if($(selector).length <= page*per_page) {
        $('.load-more[data-selector="'+selector+'"]').hide();
    } else {
        $('.load-more[data-selector="'+selector+'"]').show();
    };
    $('.load-more[data-selector="'+selector+'"]').attr('data-page',parseInt(page)+1);
    $('.load-more[data-selector="'+selector+'"]').attr('data-per-page',per_page);
}

var filterAction = function(action) {
    switch (action) {
        case 'console':
            filter_category(hash.shift());
            filterAction(hash.shift());
            break;
    }
}

$('html').on('click', '.load-more', function() {
    e = $(this);
    var selector = e.attr('data-selector');
    var page = e.attr('data-page');
    var per_page = e.attr('data-per-page');
    load_more(selector, page, per_page);
});

$(document).ready(function() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: server+"streamers"
    }).done(function (data) {
        $.merge(streamersList, data.streamers);
        index_show_streamers(streamersList);
        $(window).trigger('hashchange');
    }).fail(function(){
        window.location.assign(page_maintenance);    
    });

    $.ajax({
        type: "GET",
        dataType: "json",
        url: server+"streamers/youtube"
    }).done(function (data) {
        $.merge(streamersList, data.streamers);
        index_show_streamers(streamersList);
    });

    $(document).on('click', '.slider-item .play', function(e) {
        var vid = $(this).attr('data-vid');
        if(vid.trim().length) {
            vid = vid.split('?')[1].split('=');
            vid = vid[vid.indexOf('v')+1].split('#')[0];
            var html = template($('#playerTpl').html(), { video: '//www.youtube.com/embed/'+vid+'?autoplay=1' });
            $('#container .bx-wrapper:first').prepend(html).promise().done(function() {
                $('.bx-wrapper .video-player iframe').css('margin-top', ($(window).height() - $('.bx-wrapper iframe').height())/2);
                $('.bx-wrapper .video-player .close').css('margin-top', ($(window).height() - $('.bx-wrapper iframe').height())/2)
            });
        }
    });

    $(document).on('click', '.bx-wrapper .close', function(e) {
        $('#container .bx-wrapper .video-player').remove();
    });

    showSocialButtons();

    $(window).scroll(function() {
        if($('body')[0].scrollHeight - $(window).scrollTop() - 50 <= $(window).height()) {
            $('#arrow').removeClass('down').addClass('up');
        } else {
            $('#arrow').removeClass('up').addClass('down');
        }
    });

    $('body').on('click', '#arrow.down', function() {
        $('html, body').animate({
            scrollTop: $(document).height()
        });
    });

    $('body').on('click', '#arrow.up', function() {
        $('html, body').animate({
            scrollTop: 0
        });
    });
});


var index_show_streamers = function(streamersList) {
    var html = [];
    if (streamersList.length > 0) {
        if ($('#noonline').length > 0 ) {
            $('#noonline').remove();
        }
        
        streamersList.forEach(function(item) {
            if(typeof item.twitch != 'undefined') {
                    item.twitchid = item.field_value[item.field_value.length-1];
                    item.id = 'TW'+item.twitchid;
                    item.idraw = item.twitchid;
                    item.live = 'live';
                    item.game = item.twitch.game;
                    item.link = 'gamer_stream/?user='+item.user_id+'/#!/'+item.id;
                    item.provider = attachments_server;
                    item.thumb = item.twitch.preview.large;
                    item.title = item.twitch.channel.status;
                    item.bust = 1;
                    item.views = item.twitch.viewers;
            } else {
                    item.id = 'YT'+item.username;
                    item.idraw= item.username;
                    item.live = 'live';
                    item.game = '';
                    item.link = 'gamer_stream/?user='+item.user_id+'/#!/'+item.id;
                    item.provider = attachments_server;
                    item.thumb = item.youtube.snippet.thumbnails.high.url;
                    item.title = item.youtube.snippet.title;
                    item.bust = 1;
                    item.views = '0';
            }

            item.game = item.game == null ? '' : item.game + ' / ';

            if(item.game.length > 10) {
                item.game = item.game.substr(0,9) + '&#133;' + ' / ';
            }

            if(item.username != null && item.username.length > 10) {
                item.username = item.username.substr(0, 9) + '&#133;';
            }

            html.push(template($('#streamersTpl').html(), item));
        });       
    }
    else {
        html.push('<p id="noonline"> 目前沒有直播 </p>');
    }

    $('#streamers').html(html.join(''));
    load_more('#streamers > li', 1, 5);

    update_index(index_data);
};

var add_filter_category = function(string, context) {
    utilHash.changeHashVal('console',string);
}

var filter_category = function (cnsl) {
    $.ajax({
        async: false,
        type: "GET",
        dataType: "json",
        url: server+"index?console="+cnsl,
    }).done(function (data) {
        var context = $('.species a[data-console='+cnsl+']');
        context.parent().siblings().removeClass('current');
        context.parent().addClass('current');
        if(cnsl !== 'all') {
            $('#imageSlider').parent().parent().hide();
        } else {
            $('#imageSlider').parent().parent().show();
        }
        index_data = data;
        update_index(data);
    });

    return false;
}

var update_index = function(index_data) {
    var html = [];
    var group = [];
    // slider
    if(!slider_loaded) {
        index_data.slider.forEach(function(item, i){
            item.onclick = item.header_location ? "window.location='"+item.header_location+"'" : '';
            item.provider = attachments_server;
            item.style = item.youtube_link ? '' : 'display:none';
            item.youtube_link = item.youtube_link ? item.youtube_link : '';
            item.thumb = 'https://i.ytimg.com/vi/'+item.youtube_link.replace('https://www.youtube.com/watch?v=','')+'/default.jpg';
            var date = new Date(item.upload_date*1000);
            item.link = 'http://cdn.gamers.tm/'+date.getFullYear()+'/'+("00"+(date.getMonth()+1)).slice(-2)+'/'+item.data_id+'_'+item.file_hash+'.jpg';
            /* 2015.01.12 : Cursor will change if there's a redirection link on the image inside the image slider */
            item.cursorvalue = item.header_location ? 'cursor: pointer;' : 'cursor: default;';
            html.push(template($('#sliderTpl').html(), item));
        });
        $('#imageSlider').html(html.join(''));
        $(".bxslider").bxSlider({
            captions: true,
            auto: true
        });
        slider_loaded = 1;
    }

    // featured videos
    html = [];
    index_data.featured_videos.forEach(function(item, i){
        item.provider = attachments_server;
        item.thumb = item.snippet.thumbnails.medium.url;
        item.title = item.snippet.title;
        item.bust = 1;
        item.anytv_comment = item.anytv_comment || 0;
        item.comments = item.snippet.meta.statistics.commentCount;
        item.views = item.snippet.meta.statistics.viewCount;
        item.link = '/youtuber/?user='+item.user_id+'#!/video/'+item.snippet.resourceId.videoId;
        group.push(template($('#latestVideosTpl').html(), item));
        if(group.length == 9) {
            html.push('<ul class="list clearFix">'+group.join('')+'</ul>');
            group = [];
        }
    });

    if(group.length >= 1) {
            html.push('<ul class="list clearFix">'+group.join('')+'</ul>');
    }

    if(!html.length) { html.push('目前沒有影片'); }
    $('#featuredVideos').html(html.join(''));
    slider.featured_video.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    // latest videos
    html = [];
    group = [];
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
            item.bust = 1;
            item.anytv_comment = item.anytv_comment || 0;
            item.comments = item.snippet.meta.statistics.commentCount;
            item.views = item.snippet.meta.statistics.viewCount;
            item.link = '/youtuber/?user='+item.user_id+'/#!/video/'+item.snippet.resourceId.videoId;
            group.push(template($('#latestVideosTpl').html(), item));
            if(group.length == 9) {
                html.push('<ul class="list clearFix">'+group.join('')+'</ul>');
                group = [];
            }
            flag[date].push(item.user_id);
        }
    });

    if(group.length >= 1) {
            html.push('<ul class="list clearFix">'+group.join('')+'</ul>');
    }

    if(!html.length) { html.push('目前沒有影片'); }

    $('#latestVideos').html(html.join(''));
    slider.latest_video.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    // most viewed
    html = [];
    group = [];
    var ids = {};
    index_data.most_viewed.forEach(function(item, i){
        ids[item.user_id] = typeof ids[item.user_id] === 'undefined' ? 1 : ids[item.user_id] + 1;
        if(ids[item.user_id] > 2) {
            return;
        }

        item.provider = attachments_server;
        item.thumb = item.snippet.thumbnails.medium.url;
        item.title = item.snippet.title;
        item.bust = 1;
        item.anytv_comment = item.anytv_comment || 0;
        item.comments = item.snippet.meta.statistics.commentCount;
        item.views = item.snippet.meta.statistics.viewCount;
        item.link = '/youtuber/?user='+item.user_id+'/#!/video/'+item.snippet.resourceId.videoId;
        group.push(template($('#latestVideosTpl').html(), item));
        if(group.length == 9) {
            html.push('<ul class="list clearFix">'+group.join('')+'</ul>');
            group = [];
        }
    });

    if(group.length >= 1) {
            html.push('<ul class="list clearFix">'+group.join('')+'</ul>');
    }

    if(!html.length) { html.push('目前沒有影片'); }

    $('#mostViewed').html(html.join(''));
    slider.most_viewed.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    // latest games
    html = [];
    group = [];
    index_data.games.forEach(function(item, i){
        item.imgsrc = item.image;
        item.game = item.name;
        group.push(template($('#gameTpl').html(), item));
        if(group.length == 12) {
            html.push('<ul class="game clearFix">'+group.join('')+'</ul>');
            group = [];
        }
    });

    if(group.length >= 1) {
        html.push('<ul class="game clearFix">'+group.join('')+'</ul>')
    }

    if(!html.length) { html.push('目前沒有遊戲'); }
    $('#latestGames').html(html.join(''));
    slider.latest_games.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    // featured games
    html = [];
    group = [];
    index_data.featured_games.forEach(function(item, i){
        item.imgsrc = item.image;
        item.game = item.name;
        group.push(template($('#gameTpl').html(), item));
        if(group.length == 12) {
            html.push('<ul class="game clearFix">'+group.join('')+'</ul>');
            group = [];
        }
    });

    if(group.length >= 1) {
        html.push('<ul class="game clearFix">'+group.join('')+'</ul>')
    }

    if(!html.length) { html.push('目前沒有遊戲'); }
    $('#featuredGames').html(html.join(''));

    slider.featured_games.reloadSlider({
        startSlide: 0,
        infiniteLoop: false,
        hideControlOnEnd: true
    });

    // featuredUser
    html = [];
    if(index_data.feature_list.feature_list_active ==='1') {
        $('.viewer > h2').html(index_data.feature_list.feature_list_header);
        index_data.feature_list.feature_list_items.forEach(function(item, i) {
            html.push(template($('#featureTpl').html(), item));
        });
        if(!html.length) { html.push('No feature available.') }
        $('#featuredUsers').html(html.join(''));

    } else {
        index_data.featured_users.forEach(function(item, i){
            item.provider = attachments_server;
            html.push(template($('#featuredUsersTpl').html(), item));
        });
        if(!html.length) { html.push('No User Available'); }
        $('#featuredUsers').html('<ul>'+html.join('')+'</ul>');
    }

    // recent forum
    html = [];
    index_data.recent_threads.forEach(function(item, i){
        var data = {
            posterimage: attachments_server+'avatar.php?userid='
                +item.last_post_user_id+'.jpg',
            title: item.title,
            replies: item.reply_count,
            views: item.view_count,
            link: community+'index.php?threads/'+item.thread_id+'/',
        }
        html.push(template($('#recentForumItemTpl').html(), data));
    });
    if(!html.length) { html.push('No Recent Forum'); }
    var data = {
        threads: html.join('')
    }
    html = template($('#recentForumTpl').html(), data);
    $('#forumSection').html(html);

    // hot forum
    html = [];
    index_data.threads.forEach(function(item, i){
        var data = {
            posterimage: attachments_server+'avatar.php?userid='
                +item.last_post_user_id+'.jpg',
            title: item.title,
            replies: item.reply_count,
            views: item.view_count,
            link: community+'index.php?threads/'+item.title+'.'+item.thread_id+'/',
        }
        html.push(template($('#recentForumItemTpl').html(), data));
    });
    if(!html.length) { html.push('No Recent Forum'); }
    var data = {
        threads: html.join('')
    }
    html = template($('#recentForumTpl').html(), data);
    $('#hotForumSection').html(html);

    $(".viewer .scroll, .streaming .scroll").mCustomScrollbar({
      theme:"inset-2"
    });

    $('.tooltip').tooltipster({
        contentAsHTML: true,
        position: 'top'
    });

};

$(window).on('hashchange', function(e) {
    hash = window.location.hash.replace('#!/', '');
    hash = hash.split('/');
    filterAction(hash.shift());
});

$(".sf-menu").superfish();
$(".tabs").tabslet({
  animation: true,
}).on("_before", function() {
  slider.most_viewed.reloadSlider();
  slider.featured_video.reloadSlider();
  slider.latest_video.reloadSlider();
  slider.featured_games.reloadSlider();
  slider.latest_games.reloadSlider();
});

/* RDC */
var YTStreamers = [];
var TWStreamers = [];

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

var checkForNewStreamers = function() {

    getOnlineStreamers(server + 'streamers', 'TW');
    getOnlineStreamers(server + 'streamers/youtube', 'YT');
    
    onlineStreamers = [];
    $.merge(onlineStreamers, $.merge(YTStreamers, TWStreamers));
    
    
    console.log(onlineStreamers.length);
    
    if (onlineStreamers.length > 0) {
        if ($('#noonline').length > 0) {
            $('#noonline').remove();
        }
        
        var currentStreamCount = 0;
        if ($('a[href$="/streamers"] > sup').text() !== '') {
            currentStreamCount = parseInt($('a[href$="/streamers"] > sup').text());
        }
        
        console.log(onlineStreamers.length);
        console.log(currentStreamCount);
        
        if (onlineStreamers.length > currentStreamCount || onlineStreamers.length < currentStreamCount) {
            $('a[href$="/streamers"] > sup').text(onlineStreamers.length);
            
            $('div #streamers > li').remove().fadeOut('slow');
            
            onlineStreamers.forEach(function(item) {
                if(typeof item.twitch != 'undefined') {
                        item.twitchid = item.field_value[item.field_value.length-1];
                        item.id = 'TW'+item.twitchid;
                        item.idraw = item.twitchid;
                        item.live = 'live';
                        item.game = item.twitch.game;
                        item.link = 'gamer_stream/?user='+item.user_id+'/#!/'+item.id;
                        item.provider = attachments_server;
                        item.thumb = item.twitch.preview.large;
                        item.title = item.twitch.channel.status;
                        item.bust = 1;
                        item.views = item.twitch.viewers;
                    } else {
                        item.id = 'YT'+item.username;
                        item.idraw= item.username;
                        item.live = 'live';
                        item.game = '';
                        item.link = 'gamer_stream/?user='+item.user_id+'/#!/'+item.id;
                        item.provider = attachments_server;
                        item.thumb = item.youtube.snippet.thumbnails.high.url;
                        item.title = item.youtube.snippet.title;
                        item.bust = 1;
                        item.views = '0';
                    }
            
                    item.game = item.game == null ? '' : item.game + ' / ';
            
                    if(item.game.length > 10) {
                        item.game = item.game.substr(0,9) + '&#133;' + ' / ';
                    } 
            
                    if(item.username != null && item.username.length > 10) {
                        item.username = item.username.substr(0, 9) + '&#133;';
                    }
            
                    $('div #streamers').prepend(template($('#streamersTpl').html(),item)).fadeIn('slow'); 
            });            
        }
    }
    else {
        if ($('#noonline').length === 0 && $('#streamers > li').length === 0) {
            $('div #streamers').prepend('<p id="noonline"> 目前沒有人直播 </p>');
            $('a[href$="/streamers"] > sup').text('');
        } else if ($('#noonline').length === 0 && $('#streamers > li').length > 0) {
            $('#streamers > li').remove();
            $('div #streamers').prepend('<p id="noonline"> 目前沒有人直播 </p>');
            $('a[href$="/streamers"] > sup').text('');
        } else if ($('#noonline').length > 0 && $('#streamers > li').length > 0) {
            $('#streamers > li').remove();
            $('div #streamers').prepend('<p id="noonline"> 目前沒有人直播 </p>');
            $('a[href$="/streamers"] > sup').text('');         
        } else {
            console.log($('#noonline').length);
            console.log($('#streamers > li').length);
        }
    }
};

setInterval(function() {
    checkForNewStreamers();
}, 5000);