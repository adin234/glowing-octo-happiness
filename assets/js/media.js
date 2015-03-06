if(typeof page_data === 'string') {
  page_data = $.parseJSON(page_data);
}

data_cache = { playlist:{}, video:{} };

var html = [];
var activelist = [];
var active_playlist;
var hash = [];
var player;
var activeVideos = [];
var filterTags = false;
var playlistIds = [];
var active_comments = false;
var videoIds = [];
var isPlaying = false;

$('#tab-1').mCustomScrollbar({theme: 'inset-2'});
$('#tab-2').mCustomScrollbar({theme: 'inset-2'});
$(".playList").mCustomScrollbar({theme: 'inset-2', callbacks: {
  onScroll: function() {
    if(this.mcs.topPct >=75) {
      update_videos(activeVideos, true);
    }
  }
}});
$('aside.recommend > ul').mCustomScrollbar({theme:'inset-2' });

/* YOUTUBE SHIZZ */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var onPlayerStateChange = function() {
  if (event.data == YT.PlayerState.UNSTARTED ) {
    var videoId = event.target.getVideoData().video_id;
    var index = event.target.getPlaylistIndex();
    var context = $('img[data-index='+index+']');
  }
};
/* END YOUTUBE SHIZZ */

var update_videos = function (videos, append, initial) {
  html = [];
  var link = '#!/';
  var cons = '';
  if(typeof filterConsole !== 'undefined' && filterConsole.trim().length) {
    cons = 'console/'+filterConsole+'/';
  }

  playListIds = [];

  var start = $('li.ytVideo.videoItem').length;

  if(!append || typeof append === 'undefined') {
    if(!initial){
      activeVideos = [];
    }
    start = 0;
    videoIds = [];
  }

  for(var k = start; k<start+20; k++) {
    var item = videos[k];

    if(!item) { continue; }

    if(!~videoIds.indexOf(item.snippet.resourceId.videoId)) {
      videoIds.push(item.snippet.resourceId.videoId);
    } else {
      continue;
    }
    if(filterTags
    && (typeof item.snippet.meta == 'undefined'
       || typeof item.snippet.meta.tags == 'undefined'
       || utilArray.intersect(filterTags, item.snippet.meta.tags).length == 0)) return;

    playlistIds.push(item.snippet.playlistId);
    if(item.snippet.thumbnails) {
      item = getVideo(item.snippet.resourceId.videoId) || item;
      if(typeof item.snippet.thumbnails !== 'undefined') {
        tempdata = {
          id: 'video-'+item.snippet.resourceId.videoId,
          link: link+cons+'video/'+item.snippet.resourceId.videoId,
          link_user: '/youtuber/?user='+item.user_id+'/#!/video/'+item.snippet.resourceId.videoId || '',
          user: item.username || '',
          title: item.snippet.title,
          thumb: item.snippet.thumbnails.default.url,
          desc: item.snippet.description
        };

        html.push(template($('#videosTpl').html(), tempdata));
      }
    }
  }

  if(!html.length && !append) {
    html.push('目前沒有影片');
  }

  if(append) {
    $('#videos .mCSB_container').append(html.join(''));
  } else {
    $('#videos .mCSB_container').html(html.join(''));
  }
};

var willPlay = function() {
  return ~window.location.hash.indexOf('video/');
};

var update_playlists = function (playlists) {
  html = [];
  var ids = [];
  var cons = '';
  var source = $('#playlistTpl').html();
  if($('body').hasClass('news') || $('body').hasClass('shows')) {
      source = $('#categoriesTpl').html();
  }
  var visible_playlists = (typeof page_data.visible_playlists != 'undefined') ? page_data.visible_playlists.split(',') : [];

  if(typeof filterConsole !== 'undefined' && filterConsole.trim().length) {
    cons = 'console/'+filterConsole+'/';
  }

  playlists.forEach(function(item, i){
      //console.log('playlist = '+item.id);
    if(~ids.indexOf(item.id)) {
      return;
    }

    if($('body').hasClass('news') || $('body').hasClass('shows')) {
        if(visible_playlists.indexOf(item.id) == -1){
            return;
        }
    }

    ids.push(item.id);
    // if(filterTags && playlistIds.indexOf(item.id) < 0) return;
    if(!item.snippet.thumbnails) { return; }

    tempdata = {
      id: 'playlist-'+item.id,
      link: '#!/'+cons+'playlist/'+item.id,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails.default.url,
      desc: item.snippet.description
    }


    html.push(template(source, tempdata));
  });

  //console.log(html.length);


  if(!html.length) {
    html.push('請將影片加至您的"我的最愛"播放清單!');
    $('.listSwitch').addClass('no-playlist');
    $('#videosToggle').trigger('click');
    if($('#videos li.videoItem > a').length) {
        var link = $('#videos li.videoItem > a').first().attr('href').replace('#', '');
        if(!isPlaying && !willPlay())
          window.location.hash = link;
    } else {

    }
  } else {
    $('.game_page .listSwitch').removeClass('no-playlist');
  }


  if($('body').hasClass('news') || $('body').hasClass('shows')) {
    $('.listSwitch').addClass('no-playlist');
    $('#videosToggle').trigger('click');
    $('#categories').html(html.join(''));
  }
  $('#playlists .mCSB_container').html(html.join(''));
};

var filterAction = function(action) {
  switch (action) {
    case 'playlist':
      showPlaylist(hash.shift(), hash.shift());
      $('#videosToggle a').trigger('click');
      break;
    case 'video':
      isPlaying = true;
      showVideo(hash.shift());
      break;
    case 'comments':
      $('a[href="#tab-2"]').click();
      active_comments = true;
      filterAction(hash.shift());
      break;
    case 'console':
      filter_category(hash.shift())
      filterAction(hash.shift());
      break;
  }
};

$('body').on('click', 'button#like', function(item, x) {
  if(utilUser.get() == null) {
    utilLogin.show();
    return;
  }

  var $elem = $('button#like');
  var isActive = $elem.hasClass('active');
  var videoId = $elem.attr('data-id');

  var url = server+'fav/'+videoId;
  if(isActive) {
    $elem.removeClass('active');
    $elem.html('加入至我的最愛');
    url = server+'unfav/'+videoId;
    page_data.favorites = page_data.favorites.filter(function(item) {
      return item != videoId;
    });
    if($('body').hasClass('favorites')) {
        $('li[id=video-'+videoId+']').hide();
    }
  } else {
    $elem.addClass('active');
    $elem.html('從我的最愛移除');
    page_data.favorites.push(videoId);
    $('li[id=video-'+videoId+']').show();
  }

  $.ajax({
      dataType:'jsonp',
      url: url,
      crossDomain: true,
      type: 'get'
  });
  
});

var showVideo = function(videoId) {
  var video = getVideo(videoId);
  if(video) {
    var likeButton = '';
    var text = '加入至我的最愛';
    var active = '';

    if(typeof page_data.favorites === 'undefined') {
        page_data.favorites = [];
    }

    if(typeof page_data.favorites !== 'undefined') {

      if(~page_data.favorites.indexOf(videoId)) {
        text = '從我的最愛移除';
        active = 'active';
      }
      likeButton = '<button id="like" class="like '+active+'" alt="like" data-id="'+videoId+'">'+text+'</button>';
    }
    $('.videoHeading h3').html(video.snippet.title+likeButton);
    $('#tab-1 .mCSB_container').html(Autolinker.link(video.snippet.description.replace(/(?:\r\n|\r|\n)/g, '<br />')));
    $('.videoItem').removeClass('current');
    $('#video-'+videoId).addClass('current');
    $('#ytplayer').attr('src', 'https://www.youtube.com/embed/'+videoId+(active_playlist
      ? '/?list='+active_playlist+'&' : '?')+'autoplay=true&enablejsapi=1&origin='+origin);

    $.get(server+'vid_suggestions', { search: video.engtitle || video.snippet.title },
      updateSuggestions);

    if(!page_data.config || !page_data.config.channel) {
      getPhoto(video.snippet.channelId, $('.videoHeading > img'));
    }

    page_data.videoId = videoId;

    getComments(videoId);
    showSocialButtons();
    updatePrevNext();

    if(!$('#youtuberPage').length) {
      utilLoader.hide();
    }

    filterAction(hash.shift());
  }
};

var getComments = function (videoId, sort) {
  sort = sort || 'latest';
  $.getJSON(server+'youtubers/videos/'+videoId+'/comment', function(e) {
    if(sort === 'last') {
      e = e.sort(function(a, b) {
        return a.date - b.date;
      });
    }
    var comments = e.map(function(item) {
      console.log(utilUser.get().user_id);
      var that_class ='';
      if(+utilUser.get().user_id === +item.user_id) {
        USER_ACCESS_CLASS
        that_class = 'deleteComment';
      }
      else {
        that_class = 'hide';
      }
      return {
        userimage: attachments_server+'avatar.php?userid='
          +item.user_id+'.jpg',
        userprofile: community+'index.php?members/'+item.username
          +'.'+item.user_id+'/',
        username: item.username,
        comment: item.message,
        date: formatDate(item.date*1000),
        comment_id: item.comment_id,
        user_acess_class : that_class
      }
    });

    var commentsHTML = comments.map(function(item) {
      return template($('#commentItemTpl').html(), item);
    }).join('');

    page_data.commentsLength = comments.length;
    console.log(sort);
    $('#tab-2 .mCSB_container').html(template(
      $('#commentsTpl').html(),
      {
        count: e.length,
        video: videoId,
        comments: commentsHTML,
        sortlatest: sort === 'latest' ? 'current' : '',
        sortlast: sort === 'last' ? 'current' : ''
      })
    ).promise().done(function() {
      if(utilUser.get()) {
        $('img.userImg').attr('src', utilUser.get().links.avatar);
      }
    });
  });
};

var showPlaylist = function(playlistId, next) {
  activeVideos = [];
  $('.playlistItem').removeClass('current');
  $('#playlist-'+playlistId).addClass('current');
  var playlist = getPlaylist(playlistId);
  $('li.ytVideo.videoItem').remove();

  if(next !== 'continue') {
    update_videos(playlist.items);
  }

  if(playlist.nextPageToken) {
    activeVideos = activeVideos.concat(playlist.items);
    getPlaylistNext(playlist);
  }
  // $('#videosToggle').click();
  if(!next) {
    if((typeof playlist.items[0].status !== 'undefined') && (playlist.items[0].status === 'public')){
        return showVideo(playlist.items[0].snippet.resourceId.videoId);
    }else{
        return showVideo(playlist.items[1].snippet.resourceId.videoId);
    }
  }
  filterAction(next);
};

var getPlaylistNext = function(playlist) {
  $.getJSON(server+'news', { playlist: active_playlist, pageToken: playlist.nextPageToken },
    function(e) {
      if(e.items[0].snippet.playlistId == active_playlist) {
        playlist.nextPageToken = e.nextPageToken;
        activeVideos = activeVideos.concat(e.items);
        //console.log('activeLength', activeVideos.length);
        // update_videos(e.items, true);
        if(e.nextPageToken) {
          getPlaylistNext(e);
        }
      }
    });
};

var loadInitial = function() {
  activeVideos = page_data.videos;
  update_videos(page_data.videos, null, 1);
};

var filter = function(value) {
  var filterObj = page_data.categories.filter(function(item) {
      return item.id == value;
  });
  if(typeof filterObj[0] != 'undefined') {
    filterTags = $.map(filterObj[0].tags.split(','), $.trim);
  }
  $('li.ytVideo.videoItem').remove();
  update_videos(page_data.videos);
};


var filter_vlogs = function() {
  var videos = page_data.videos.filter(function(e) { return !!~e.snippet.meta.tags.indexOf('anytv_console_vlogs')});
  $('li.ytVideo.videoItem').remove();
  update_videos(videos);
}

var getPhoto = function(id, context) {
  $.getJSON('http://gdata.youtube.com/feeds/api/users/'+id.substr(2)+
    '?fields=yt:username,media:thumbnail,title&alt=json',
    {},
    function(e) {
      $(context).attr('src',e['entry']['media$thumbnail']['url']);
    }
  );
};

var getPlaylist = function(playlistId) {
  active_playlist = playlistId;

  if(!data_cache.playlist[playlistId]) {
    $.ajax({
      url: server+'news',
      dataType: 'json',
      async: false,
      data: { playlist: playlistId },
      success: function(e) {
        data_cache.playlist[playlistId] = e
      }
    });
  }

  return data_cache.playlist[playlistId];
};

var getVideo = function(videoId, list) {
  if(!list) {
    list = page_data.videos;
  }

  for(var i=0; i<list.length; i++) {
    if(list[i].snippet.resourceId.videoId == videoId) {
      return list[i];
    }
  }

  list = data_cache.playlist;
  indices = Object.keys(list);
  for(var i=0; i<indices.length; i++) {
    list = data_cache.playlist[indices[i]].items
    for(var ii=0; ii<list.length; ii++) {
      if(list[ii].snippet.resourceId.videoId == videoId) {
        return list[ii];
      }
    }
  }

  return cacheVideo(videoId);
};

var cachePlaylist = function(playlistId) {

};

var cacheVideo = function(videoId) {

};

var updateSuggestions = function(suggestions) {
  html=[];
  suggestions.forEach(function(item, i){
    if(filterTags
    && (typeof item.snippet.meta == 'undefined'
       || typeof item.snippet.meta.tags == 'undefined'
       || utilArray.intersect(filterTags, item.snippet.meta.tags).length == 0)) return;

    if(item.snippet.thumbnails) {
      tempdata = {
        id: 'video-'+item.snippet.resourceId.videoId,
        link: '/youtuber/?user='+item.user_id+'#!/video/'+item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumb: item.snippet.thumbnails.default.url,
        desc: item.snippet.description,
        username: item.username,
        views: item.snippet.meta.statistics.viewCount
      }

      html.push(template($('#recommendedTpl').html(), tempdata));
    }
  });
  $('aside.recommend > ul .mCSB_container').html(html.join(''));
}

var updatePrevNext = function() {
  var current = $('.videoItem.current');
  var prevLink = current.prev().children('a').first().attr('href');
  var nextLink = current.next().children('a').first().attr('href');

  $('#btn-prev').attr('href', prevLink ? prevLink : 'javascript:;');
  $('#btn-next').attr('href', nextLink ? nextLink : 'javascript:;');
};


  var filterGame = function(filterString) {
     $('.game-item').each(function(i, item) {
            $(item).removeClass('active');
      });
      $('[data-id='+filterString+']').parent().addClass('active');

      var videos = [];
      page_data.playlists.forEach(function(item) {
        if(typeof item.snippet.meta != 'undefined'
        && (~item.snippet.meta.tags.indexOf('anytv_'+filterString)
            || ~item.snippet.meta.tags.indexOf(filterString))) {
          playlists.push(item);
        }
      });
      update_playlists(videos);

      var videos = [];
      page_data.videos.forEach(function(item) {
        if(typeof item.snippet.meta != 'undefined'
        && (~item.snippet.meta.tags.indexOf('anytv_'+filterString)
            || ~item.snippet.meta.tags.indexOf(filterString))) {
          videos.push(item);
        }
      });
      $('li.ytVideo.videoItem').remove();
      update_videos(videos);

  };

$(document).on('load-page',function(){
  $(".sf-menu").superfish();
  $(".tabs").tabslet({
    animation: true,
    active: 1
  }).promise().done(function(e) {
    if(active_comments) {
      $('#tab-2').click();
    }
  });
  $("ul.resize").click(function(){
    var $body = $("body"),
        $zoom = $(".zoom"),
        $resize = $("ul.resize li:first-child");
    $body.toggleClass("zoom2x");
    if($body.hasClass('zoom2x')) {
      $resize.html('X2');
    } else {
      $resize.html('X1');
    }

    $zoom.toggleClass("zoomOut");
  });

  $(".listSwitch li").click(function(){
    if(!$(this).hasClass('current')) {
      $(".listSwitch li").toggleClass('current');
      $(".playList.toggleList").toggleClass('current');
    } else if($(this).attr('id') == 'videosToggle' && !hash.length) {
      // active_playlist = null;
      // $('li.ytVideo.videoItem').remove();
      // update_videos(page_data.videos);
    }
  });

  if($('body').hasClass('game_page')) {
    var name = page_data.game_name.name ? page_data.game_name.name : '';
    $('.profile .info h1').html(name);
  }

  if(page_data.config
    && page_data.config.channel
    && typeof page_data.config.channel === 'string') {
    getPhoto(page_data.config.channel, $('.videoHeading > img'));
  }

  page_data.categories.forEach(function(item, i){
    html.push(template($('#categoriesTpl').html(), item));
  });
  if(!html.length) { html.push('No Category Available'); }
  $('#categories').html('');

  $('li.ytVideo.videoItem').remove();
  activeVideos = page_data.videos;
  update_videos(page_data.videos, null, 1);

  var thumbs = typeof page_data.videos[0] !== 'undefined'
        ? page_data.videos[0].snippet.thumbnails
        : typeof page_data.playlists[0] !== 'undefined'
            ? page_data.playlists[0].snippet.thumbnails
            : '';

  if(false && page_data.playlists.length) {
    page_data.playlists.splice(0,0,{
      id: 'UU'+page_data.config.channel.slice(2),
      snippet: {
        title: '最新影片',
        channelId: page_data.config.channel,
        description: '會員上傳',
        thumbnails: thumbs
      }
    });
  }

  update_playlists(page_data.playlists);

  $(window).on('hashchange', function(){
    hash = window.location.hash.replace('#!/', '');

    if(!hash && page_data.playlists.length) {
      return window.location.hash = '#!/playlist/'+page_data.config.playlist;
    }
    hash = hash.split('/');
    filterAction(hash.shift());
  });

  $('body').on('focus', '#commentArea', function()  {
    if(!utilCookie.get('user')) {
      utilLogin.show();
    }
  });

  $('body').on('click', '#postComment', function() {
    var data = {
      access_token: utilUser.get().access_code,
      user_id:      utilUser.get().user_id,
      username:     utilUser.get().username,
      message:      $('#commentArea').val()
    };
    if(!$('#commentArea').val().trim().length) {
      return
    }
    $.post(server+'youtubers/videos/'+$(this).attr('data-video')+'/comment',
      data, function(e) {

        page_data.commentsLength++;

      $('.comments-list > a:first-child').html('所有留言 ('+page_data.commentsLength+')');

        $('#tab-2 .discussions')
          .prepend(template(
            template($('#commentItemTpl').html(), {
              userimage: attachments_server+'avatar.php?userid='
                +data.user_id+'.jpg',
              userprofile: community+'index.php?members/'+data.username
                +'.'+data.user_id+'/',
              username: data.username,
              comment: data.message,
              date: formatDate(+new Date)
            })
          ));
          $('#commentArea').val('');
      }).fail(function(e) {
        utilLogin.show('An error occured, please login to continue');
        utilCookie.set('user', '', 0);
      });
  });

  // get favorites
  if(utilUser.get('user') && typeof utilUser.get('user') !== 'undefined'
    /*&& !$('body').hasClass('news')
    && !$('body').hasClass('shows')*/) {
    $.ajax({
        dataType:'jsonp',
        url: server+'favorite-ids',
        crossDomain: true,
        type: 'get'
    })
    .always(function(result) {
      page_data.favorites = result;
      $(window).trigger('hashchange');
    });

    return;
  }

  $(window).trigger('hashchange');
});

$('li#playlistsToggle').on('click', function() {
  $('.playFunctionBtn li').css({'visibility': 'hidden'})
});

$('li#videosToggle').on('click', function() {
  $('.playFunctionBtn li').css({'visibility': 'visible'});
});

$(document).ready(function() {
  if(!$('body').hasClass('favorites')) {
    $(document).trigger('load-page');
  }
});

$(document).on('click', '.sort-comments', function() {
  var el = $(this);
  var sort = el.hasClass('last') ? 'last' : 'latest';
  getComments(page_data.videoId, sort);
});

var deleteComment = function(data,context) {
  console.log($(context).parent().parent());
  var videoId = $('#postComment').attr('data-video'),
      url = server+'youtubers/videos/'+videoId+'/comment/'+data+'/delete',
      user_id = utilUser.get().user_id;

  $(context).parent().parent().addClass("deletecommentbox");

    if (confirm("Do you want to permanently delete this comment?") == true) {
      $.ajax({
          dataType:'jsonp',
          url: url,
          crossDomain: true,
          type: 'get'
      });
      $(context).parent().parent().remove();
    }
    else{
      $('.deletecommentbox').removeClass('deletecommentbox');
    } 
};
function formatDate(date) {
  var now = new Date(date),
      months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return formattedDAte = now.getDate()+"-"+months[now.getMonth()]+"-"+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes();
}