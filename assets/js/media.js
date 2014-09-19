page_data = $.parseJSON(page_data);
data_cache = { playlist:{}, video:{} };
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
    $('#tab-1').html(Autolinker.link(video.snippet.description.replace(/(?:\r\n|\r|\n)/g, '<br />')));
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

    showSocialButtons();
    updatePrevNext();
  }
};

var showPlaylist = function(playlistId, next) {
  console.log(playlistId);
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

var filter = function(id) {
  return false;
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

var updatePrevNext = function() {
  var current = $('.videoItem.current');
  var prevLink = current.prev().children('a').first().attr('href');
  var nextLink = current.next().children('a').first().attr('href');
  $('#btn-prev').attr('href', prevLink ? prevLink : 'javascript:;');
  $('#btn-next').attr('href', nextLink ? nextLink : 'javascript:;');

  console.log(current);
};


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
      update_videos(page_data.videos);
    }
  })

  getPhoto(page_data.config.channel, $('.videoHeading > img'));

  page_data.categories.forEach(function(item, i){
    html.push(template($('#categoriesTpl').html(), item));
  });
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



  $('body').on('click', '#commentArea', function(){
    if(!getCookie('token')) {
      forceLogin();
    }
  });

  //****** must remove ************
  var commentsHTML = comments.map(function(item) {
    return template($('#commentItemTpl').html(), item);
  }).join('');


  $('#tab-2').html(template($('#commentsTpl').html(), {comments: commentsHTML}));
});


var comments = [{
  userimage: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c0.2.100.100/p100x100/10559690_10152612907362929_476071010295922247_n.jpg?oh=73a8611e6fc6d885101dcdbca25184a6&oe=5495D3F9&__gda__=1418969790_bc909eb4df12a106f31ece09c62778cc',
  userprofile: 'http://www.google.com',
  username: 'adinpogi',
  comment: 'this is a really nice comment',
  date: 'Yesterday'
}, {
  userimage: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c0.2.100.100/p100x100/10559690_10152612907362929_476071010295922247_n.jpg?oh=73a8611e6fc6d885101dcdbca25184a6&oe=5495D3F9&__gda__=1418969790_bc909eb4df12a106f31ece09c62778cc',
  userprofile: 'http://www.google.com',
  username: 'adinpogi',
  comment: 'this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice commentthis is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment',
  date: 'Yesterday'
}, {
  userimage: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c0.2.100.100/p100x100/10559690_10152612907362929_476071010295922247_n.jpg?oh=73a8611e6fc6d885101dcdbca25184a6&oe=5495D3F9&__gda__=1418969790_bc909eb4df12a106f31ece09c62778cc',
  userprofile: 'http://www.google.com',
  username: 'adinpogi',
  comment: 'this is a really nice comment',
  date: 'Yesterday'
}, {
  userimage: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c0.2.100.100/p100x100/10559690_10152612907362929_476071010295922247_n.jpg?oh=73a8611e6fc6d885101dcdbca25184a6&oe=5495D3F9&__gda__=1418969790_bc909eb4df12a106f31ece09c62778cc',
  userprofile: 'http://www.google.com',
  username: 'adinpogi',
  comment: 'this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice commentthis is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment',
  date: 'Yesterday'
}, {
  userimage: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c0.2.100.100/p100x100/10559690_10152612907362929_476071010295922247_n.jpg?oh=73a8611e6fc6d885101dcdbca25184a6&oe=5495D3F9&__gda__=1418969790_bc909eb4df12a106f31ece09c62778cc',
  userprofile: 'http://www.google.com',
  username: 'adinpogi',
  comment: 'this is a really nice comment',
  date: 'Yesterday'
}, {
  userimage: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c0.2.100.100/p100x100/10559690_10152612907362929_476071010295922247_n.jpg?oh=73a8611e6fc6d885101dcdbca25184a6&oe=5495D3F9&__gda__=1418969790_bc909eb4df12a106f31ece09c62778cc',
  userprofile: 'http://www.google.com',
  username: 'adinpogi',
  comment: 'this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice commentthis is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment',
  date: 'Yesterday'
}, {
  userimage: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c0.2.100.100/p100x100/10559690_10152612907362929_476071010295922247_n.jpg?oh=73a8611e6fc6d885101dcdbca25184a6&oe=5495D3F9&__gda__=1418969790_bc909eb4df12a106f31ece09c62778cc',
  userprofile: 'http://www.google.com',
  username: 'adinpogi',
  comment: 'this is a really nice comment',
  date: 'Yesterday'
}, {
  userimage: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c0.2.100.100/p100x100/10559690_10152612907362929_476071010295922247_n.jpg?oh=73a8611e6fc6d885101dcdbca25184a6&oe=5495D3F9&__gda__=1418969790_bc909eb4df12a106f31ece09c62778cc',
  userprofile: 'http://www.google.com',
  username: 'adinpogi',
  comment: 'this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice commentthis is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment',
  date: 'Yesterday'
}, {
  userimage: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c0.2.100.100/p100x100/10559690_10152612907362929_476071010295922247_n.jpg?oh=73a8611e6fc6d885101dcdbca25184a6&oe=5495D3F9&__gda__=1418969790_bc909eb4df12a106f31ece09c62778cc',
  userprofile: 'http://www.google.com',
  username: 'adinpogi',
  comment: 'this is a really nice comment',
  date: 'Yesterday'
}, {
  userimage: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c0.2.100.100/p100x100/10559690_10152612907362929_476071010295922247_n.jpg?oh=73a8611e6fc6d885101dcdbca25184a6&oe=5495D3F9&__gda__=1418969790_bc909eb4df12a106f31ece09c62778cc',
  userprofile: 'http://www.google.com',
  username: 'adinpogi',
  comment: 'this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice commentthis is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment this is a really nice comment',
  date: 'Yesterday'
}];