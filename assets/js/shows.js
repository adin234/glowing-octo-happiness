shows_data = $.parseJSON(shows_data);
var html = [];
var active_playlist;
var hash;
var player;

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

$(document).ready(function(){
  $(".sf-menu").superfish();
  $(".tabs").tabslet({
    animation: true,
    active: 3,
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
      update_videos(shows_data.videos);
    }
  })

  shows_data.categories.forEach(function(item, i){
    html.push(template($('#categoriesTpl').html(), item));
  });
  $('#categories').html(html.join(''));


  update_videos(shows_data.videos);
  update_playlists(shows_data.playlists);

  $(window).on('hashchange', function(){
    hash = window.location.hash.replace('#!/', '');
    hash = hash.split('/');
    filterAction(hash.shift());
  });
});

var update_videos = function (videos) {
  html = [];
  var link = '#!/';
  if(active_playlist) {
    link+='playlist/'+active_playlist+'/';
  }

  videos.forEach(function(item, i){
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
    tempdata = {
      id: 'playlist-'+item.id,
      link: '#!/playlist/'+item.id,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails.default.url,
      desc: item.snippet.description
    }
    html.push(template($('#playlistTpl').html(), tempdata));
  });
  $('#playlists').html(html.join(''));
};

var filterAction = function(action) {
  switch (action) {
    case 'playlist':
      getPlaylist(hash.shift());
      break;
    case 'video':
      showVideo(hash.shift());
  }
};

var getPlaylist = function(playlistId) {
  active_playlist = playlistId;
  $('.playlistItem').removeClass('current');
  $('#playlist-'+playlistId).addClass('current');
  $.getJSON(server+'news',
    { playlist: playlistId },
    function(e) {
      showPlaylist(e, hash.shift());
    });
};

var showVideo = function(videoId) {
  $('.videoItem').removeClass('current');
  $('#video-'+videoId).addClass('current');

  $('#ytplayer').attr('src', 'https://www.youtube.com/embed/'+videoId+(active_playlist
    ? '/?list='+active_playlist+'&' : '?')+'autoplay=true&enablejsapi=1');

  setTimeout(function() {
    player = new YT.Player('ytplayer', {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  }, 500);

  console.log('started a new player');
};

var filter = function(id) {
  return false;
};

var showPlaylist = function(playlist, next) {
  update_videos(playlist.items);
  $('#videosToggle').click();
  filterAction(next);
};
