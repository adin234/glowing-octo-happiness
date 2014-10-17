page_data = $.parseJSON(page_data);
data_cache = { playlist:{}, video:{} };
var html = [];
var active_playlist;
var hash;
var player;
var filterTags = false;
var playlistIds = [];

$('#tab-1').mCustomScrollbar({theme: 'inset-2'});
$('#tab-2').mCustomScrollbar({theme: 'inset-2'});

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

$(window).load(function(){
  $(window).trigger('hashchange');
});


var update_videos = function (videos) {
  html = [];
  var link = '#!/';
  if(active_playlist) {
    link+='playlist/'+active_playlist+'/';
  }

  playListIds = [];

  videos.forEach(function(item, i){
    if(filterTags
    && (typeof item.snippet.meta == 'undefined'
       || typeof item.snippet.meta.tags == 'undefined'
       || utilArray.intersect(filterTags, item.snippet.meta.tags).length == 0)) return;

    playlistIds.push(item.snippet.playlistId);

    if(item.snippet.thumbnails) {
      tempdata = {
        id: 'video-'+item.snippet.resourceId.videoId,
        link: link+'video/'+item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumb: item.snippet.thumbnails.default.url,
        desc: item.snippet.description
      }
      html.push(template($('#videosTpl').html(), tempdata));
    }
  });
  $(".playList").mCustomScrollbar('destroy').promise().done(function(){
    if(!html.length) { html.push('目前沒有影片'); }
    $('#videos').html(html.join(''));
    setTimeout(function(){
      $(".playList").mCustomScrollbar({
        theme:"inset-2"
      });
  }, 500)
  });
};

var update_playlists = function (playlists) {
  html = [];
  playlists.forEach(function(item, i){
    // if(filterTags && playlistIds.indexOf(item.id) < 0) return;
    tempdata = {
      id: 'playlist-'+item.id,
      link: '#!/playlist/'+item.id,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails.default.url,
      desc: item.snippet.description
    }
    html.push(template($('#playlistTpl').html(), tempdata));
  });
  if(!html.length) { html.push('No Playlist Available'); }
  $('#playlists').html(html.join(''));
};

var filterAction = function(action) {
  switch (action) {
    case 'playlist':
      showPlaylist(hash.shift(), hash.shift());
      break;
    case 'video':
      showVideo(hash.shift());
  }
};

var showVideo = function(videoId) {
  var video = getVideo(videoId);
  if(video) {
    $('.videoHeading h3').html(video.snippet.title);
    $('#tab-1 .mCSB_container').html(Autolinker.link(video.snippet.description.replace(/(?:\r\n|\r|\n)/g, '<br />')));
    $('.videoItem').removeClass('current');
    $('#video-'+videoId).addClass('current');
    $('#ytplayer').attr('src', 'https://www.youtube.com/embed/'+videoId+(active_playlist
      ? '/?list='+active_playlist+'&' : '?')+'autoplay=true&enablejsapi=1&origin='+origin);
    setTimeout(function() {
      player = new YT.Player('ytplayer', {
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
    }, 500);

    $.get(server+'vid_suggestions', { search: video.engtitle || video.snippet.title },
      updateSuggestions);

    if(!page_data.config.channel) {
      getPhoto(video.snippet.channelId, $('.videoHeading > img'));
    }

    getComments(videoId);
    showSocialButtons();
    updatePrevNext();
    utilLoader.hide();
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
      {video: videoId, comments: commentsHTML})
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
  update_videos(playlist.items);
  $('#videosToggle').click();
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
  update_videos(page_data.videos);
  // update_playlists(page_data.playlists);
};

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
        link: '/youtuber/'+item.user_id+'#!/video/'+item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumb: item.snippet.thumbnails.default.url,
        desc: item.snippet.description,
        username: item.username,
        views: item.snippet.meta.statistics.viewCount
      }

      html.push(template($('#recommendedTpl').html(), tempdata));
    }
  });
  $('aside.recommend > ul').html(html.join('')).promise().done(function(e) {
    $('aside.recommend > ul').mCustomScrollbar({
        theme:"inset-2"
      });
  });
}

var updatePrevNext = function() {
  var current = $('.videoItem.current');
  var prevLink = current.prev().children('a').first().attr('href');
  var nextLink = current.next().children('a').first().attr('href');
  $('#btn-prev').attr('href', prevLink ? prevLink : 'javascript:;');
  $('#btn-next').attr('href', nextLink ? nextLink : 'javascript:;');
};


$(document).ready(function(){
  $(".sf-menu").superfish();
  $(".tabs").tabslet({
    animation: true,
    active: 1,
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
      update_videos(page_data.videos);
    }
  })

  if(page_data.config && page_data.config.channel) {
    getPhoto(page_data.config.channel, $('.videoHeading > img'));
  }
  page_data.categories.forEach(function(item, i){
    html.push(template($('#categoriesTpl').html(), item));
  });
  if(!html.length) { html.push('No Category Available'); }
  $('#categories').html(html.join(''));


  update_videos(page_data.videos);
  update_playlists(page_data.playlists);

  $(window).on('hashchange', function(){
    hash = window.location.hash.replace('#!/', '');
    if(!hash) {
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
});

