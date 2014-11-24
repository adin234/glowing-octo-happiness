if(typeof page_data === 'string') {
  page_data = $.parseJSON(page_data);
}

// get favorites
if(typeof utilUser !== 'undefined'
  && !$('body').hasClass('news')
  && !$('body').hasClass('shows')) {
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
}

data_cache = { playlist:{}, video:{} };
utilLoader.show();
var html = [];
var activelist = [];
var active_playlist;
var hash = [];
var player;
var activeVideos = {};
var filterTags = false;
var playlistIds = [];
var active_comments = false;

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

    console.log('change'+videoId);
  }
};
/* END YOUTUBE SHIZZ */

var update_videos = function (videos, append) {
  html = [];
  var link = '#!/';
  if(active_playlist) {
    link+='playlist/'+active_playlist+'/';
  }

  playListIds = [];

  var start = append ? 0 : $('li.ytVideo.videoItem').length;

  if(!append) {
    activeVideos = videos;
  }

  for(var k = start; k<start+20; k++) {
    var item = videos[k];
    if(!item) { break; }

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
          link: link+'video/'+item.snippet.resourceId.videoId,
          link_user: '/youtuber/?user='+item.user_id+'/#!/'+'video/'+item.snippet.resourceId.videoId || '',
          user: item.username || '',
          title: item.snippet.title,
          thumb: item.snippet.thumbnails.default.url,
          desc: item.snippet.description
        };
        html.push(template($('#videosTpl').html(), tempdata));
      }
    }
  }

  if(!html.length) {
    html.push('目前沒有影片');
  }

  if(append) {
    $('#videos .mCSB_container').append(html.join(''));
  } else {
    $('#videos .mCSB_container').html(html.join(''));
  }
};

var update_playlists = function (playlists) {
  html = [];
  playlists.forEach(function(item, i){
    // if(filterTags && playlistIds.indexOf(item.id) < 0) return;
    if(!item.snippet.thumbnails) { return; }
    console.log(item);
    tempdata = {
      id: 'playlist-'+item.id,
      link: '#!/playlist/'+item.id,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails.default.url,
      desc: item.snippet.description
    }
    html.push(template($('#playlistTpl').html(), tempdata));
  });
  if(!html.length) {
    html.push('No Playlist Available');
    $('.listSwitch').addClass('no-playlist');
    $('#videosToggle').trigger('click');
    if($('#videos li.videoItem > a').length) {
        var link = $('#videos li.videoItem > a').first().attr('href').replace('#', '');
        window.location.hash = link;
    } else {
      utilLoader.hide();
    }
  } else {
    $('.game_page .listSwitch').removeClass('no-playlist');
  }

  $('#playlists .mCSB_container').html(html.join(''));
};

var filterAction = function(action) {
  switch (action) {
    case 'playlist':
      showPlaylist(hash.shift(), hash.shift());
      break;
    case 'video':
      showVideo(hash.shift());
      break;
    case 'comments':
      $('a[href="#tab-2"]').click();
      active_comments = true;
      filterAction(hash.shift());
      break;
  }
};

$('body').on('click', 'button#like', function(item, x) {
  var $elem = $('button#like');
  var isActive = $elem.hasClass('active');
  var videoId = $elem.attr('data-id');
  var url = server+'fav/'+videoId;
  if(isActive) {
    url = server+'unfav/'+videoId;
    page_data.favorites = page_data.favorites.filter(function(item) {
      return item != videoId;
    });
  } else {
    page_data.favorites.push(videoId);
  }

$.ajax({
      dataType:'jsonp',
      url: url,
      crossDomain: true,
      type: 'get'
  })
  .always(function(result) {
    $elem.toggleClass('active');
  });
});

var showVideo = function(videoId) {
  var video = getVideo(videoId);
  if(video) {
    var likeButton = '';
    if(typeof page_data.favorites !== 'undefined') {
      var active = ~page_data.favorites.indexOf(videoId) ? 'active' : '';
      likeButton = '<button id="like" class="like title="Favorite the video" '+active+'" alt="like" data-id="'+videoId+'"></button>';
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

    getComments(videoId);
    showSocialButtons();
    updatePrevNext();

    if(!$('#youtuberPage').length) {
      utilLoader.hide();
    }

    filterAction(hash.shift());
  }
};

var getComments = function (videoId) {
  $.getJSON(server+'youtubers/videos/'+videoId+'/comment', function(e) {
    var comments = e.map(function(item) {
      return {
        userimage: attachments_server+'data/avatars/l/0/'
          +item.user_id+'.jpg',
        userprofile: community+'index.php?members/'+item.username
          +'.'+item.user_id+'/',
        username: item.username,
        comment: item.message,
        date: item.date
      }
    });

    var commentsHTML = comments.map(function(item) {
      return template($('#commentItemTpl').html(), item);
    }).join('');

    $('#tab-2 .mCSB_container').html(template(
      $('#commentsTpl').html(),
      { count: e.length, video: videoId, comments: commentsHTML})
    ).promise().done(function() {
      if(utilUser.get()) {
        $('img.userImg').attr('src', utilUser.get().links.avatar);
      }
    });
  });
};

var showPlaylist = function(playlistId, next) {
  $('.playlistItem').removeClass('current');
  $('#playlist-'+playlistId).addClass('current');
  var playlist = getPlaylist(playlistId);
  $('li.ytVideo.videoItem').remove();
  console.log(playlist);
  update_videos(playlist.items);
  if(playlist.nextPageToken) {
    $.get(server+'news', { playlist: playlistId, pageToken: playlist.nextPageToken },
      function(e) {
        if(e.items[0].snippet.playlistId == active_playlist) {
          playlist.nextPageToken = e.nextPageToken;
          playlist.items.concat(e.items);
          update_videos(e.items, true);
          showPlaylist(playlistId, 'continue');
        }
      });
  }
  // $('#videosToggle').click();
  console.log('----', next);
  if(!next) {
    return showVideo(playlist.items[0].snippet.resourceId.videoId);
  }
  filterAction(next);
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
  // update_playlists(page_data.playlists);
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
      console.log(context, e['entry']['media$thumbnail']['url']);
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
  console.log(current);
  var prevLink = current.prev().children('a').first().attr('href');
  console.log(prevLink);
  var nextLink = current.next().children('a').first().attr('href');
  console.log(nextLink);

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
    active: 1,
  }).promise().done(function(e) {
    console.log('must open comments');
    if(active_comments) {
      $('#tab-2').click();
    }
  });
  $(".zoom a").click(function(){
    $("body").toggleClass("zoom2x");
    $(".zoom").toggleClass("zoomOut");
  });

  $(".listSwitch li").click(function(){
    if(!$(this).hasClass('current')) {
      $(".listSwitch li").toggleClass('current');
      $(".playList.toggleList").toggleClass('current');
    } else if($(this).attr('id') == 'videosToggle' && !hash.length) {
      active_playlist = null;
      $('li.ytVideo.videoItem').remove();
      update_videos(page_data.videos);
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
  update_videos(page_data.videos);

  var thumbs = typeof page_data.videos[0] !== 'undefined'
        ? page_data.videos[0].snippet.thumbnails
        : typeof page_data.playlists[0] !== 'undefined'
            ? page_data.playlists[0].snippet.thumbnails
            : '';

  if(page_data.playlists.length) {
    page_data.playlists.splice(0,0,{
      id: page_data.config.playlist,
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

    $.post(server+'youtubers/videos/'+$(this).attr('data-video')+'/comment',
      data, function(e) {
        $('#tab-2 .discussions')
          .prepend(template(
            template($('#commentItemTpl').html(), {
              userimage: attachments_server+'data/avatars/l/0/'
                +data.user_id+'.jpg',
              userprofile: community+'index.php?members/'+data.username
                +'.'+data.user_id+'/',
              username: data.username,
              comment: data.message,
              date: +new Date
            })
          ));
      }).fail(function(e) {
        utilLogin.show('An error occured, please login to continue');
        utilCookie.set('user', '', 0);
      });
  });

  $(window).trigger('hashchange');
});

$(document).ready(function() {
  if(!$('body').hasClass('favorites')) {
    $(document).trigger('load-page');
  }
});