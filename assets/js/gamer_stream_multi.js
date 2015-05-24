/* jshint unused: false */
/* global
    attachments_server,
    template,
    JST,
    io,
    socket_server,
    utilCookie,
    utilHash
*/

'use strict';

var streamers_list = {
    youtube: [],
    twitch: [],
    hitbox: []
  },
  active_streams = [],

  stream_slider = $('.bxslider').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true,
    minSlides: 2,
    maxSlides: 4,
    slideWidth: 329.5
  }),

  format_stream_item = function(item) {
    item.class = '';
    if (typeof item.twitch !== 'undefined') {
      item.twitchid = item.field_value[0];
      item.id = 'TW' + item.twitchid;
      item.idraw = item.twitchid;
      item.live = 'live';
      item.link = '/gamer_stream/' + item.user_id + '/' + item.id;
      item.provider = attachments_server;
      item.thumb = item.twitch.preview.large;
      item.title = item.twitch.channel.status;
      item.bust = 1;
      item.views = item.twitch.viewers;
    } else if (typeof item.hitbox !== 'undefined') {
      var hitboxData = item.hitbox.livestream[0];
      item.id = 'HB' + hitboxData.media_name;
      item.idraw = item.hitboxid;
      item.live = 'live';
      item.link = '/gamer_stream/' + item.user_id + '/' + item.id;
      item.provider = attachments_server;
      item.thumb = 'http://edge.sf.hitbox.tv/' +
        hitboxData.media_thumbnail_large;
      item.title = hitboxData.media_status;
      item.bust = 1;
      item.views = hitboxData.media_views;
    } else {
      item.id = 'YT' + item.youtube.id;
      item.idraw = item.youtube.id;
      item.live = 'live';
      item.link = '/gamer_stream/' + item.user_id + '/' + item.id;
      item.provider = attachments_server;
      item.thumb = item.youtube.snippet.thumbnails.high.url;
      item.title = item.youtube.snippet.title;
      item.bust = 1;
      item.views = '0';
    }

    if ($.inArray(item.id, active_streams) + 1) {
      item.class = 'current';
    }

    return item;
  },

  render_streamers = function() {
    var html = [],
      streamer_container = $('#streamContainer').html('');

    streamers_list.youtube.forEach(function(item) {
      item = format_stream_item(item);
      html.push(
        template(
          JST['streamlist-item-tpl.html'](),
          item
        )
      );
    });

    streamers_list.hitbox.forEach(function(item) {
      item = format_stream_item(item);
      html.push(
        template(
          JST['streamlist-item-tpl.html'](),
          item
        )
      );
    });

    streamers_list.twitch.forEach(function(item) {
      item = format_stream_item(item);
      html.push(
        template(
          JST['streamlist-item-tpl.html'](),
          item
        )
      );
    });

    $('#lightSlider').html(html.join(''));
    $('#streamContainer').html(html.join(''));
    stream_slider.reloadSlider();
  },

  get_streamers = function() {
    var socket_streamers = io.connect(socket_server);
    socket_streamers.on('message', function(e) {
      streamers_list = e.streamers;
      render_streamers();
    });
  },

  render_stream_video = function(item) {
    var streamType = item.substr(0, 2),
      streamId = item.substr(2),
      tabOffsetTop = $('#twitch-chat-tab-container').offset().top + $('#twitch-chat-tab-container').height(),
      chatbodyHeight = $(window).height() - tabOffsetTop;

    active_streams.push(item);
    if (streamType === 'TW') {
      $('#twitchStreamContainer').append(
        template(
          JST['twitch-stream-tpl.html'](), {
            twitchid: streamId
          }
        )
      );
      $('#twitch-chat-frame-container').append(
        template(
          JST['twitch-chat-tpl.html'](), {
            twitchid: streamId
          }
        )
      );
      $('#twitch-chat-tab-container').append(
        template(
          JST['twitch-chat-tab-tpl.html'](), {
            twitchid: streamId
          }
        )
      );
      
    }

    if (streamType === 'HB') {
      $('#twitchStreamContainer').append(
        template(
          JST['hitbox-stream-tpl.html'](), {
            twitchid: streamId
          }
        )
      );
      $('#twitch-chat-frame-container').append(
        template(
          JST['hitbox-chat-tpl.html'](), {
            twitchid: streamId
          }
        )
      );
      $('#twitch-chat-tab-container').append(
        template(
          JST['hitbox-chat-tab-tpl.html'](), {
            twitchid: streamId
          }
        )
      );

      $('#twitch-chat-frame-container').find('#chat-' + streamId).css('height', chatbodyHeight);
    }

    if (streamType === 'YT') {
      $('#twitchStreamContainer').append(
        template(
          JST['youtube-stream-tpl.html'](), {
            youtubeid: streamId
          }
        )
      );
      $('#twitch-chat-frame-container').append(
        template(
          JST['gchat-tpl.html'](), {
            ChannelId: streamId
          }
        )
      );
      $('#twitch-chat-tab-container').append(
        template(
          JST['gchat-tab-tpl.html'](), {
            ChannelId: streamId
          }
        )
      );

      var userinfo = '',
        gchatContainer = $('#gchat-' + streamId),
        channelinfo = {
          'id': streamId,
          'title': streamId
        };

      if (utilCookie.get('user').length > 0) {
        userinfo = $.parseJSON(utilCookie.get('user'));
        gchatContainer.initChatBox(channelinfo, userinfo);
      } else {
        gchatContainer.initChatBox(channelinfo, userinfo);
      }

      $('#gchat-' + streamId).find('.chcontainer').css('height', chatbodyHeight - 110);
    }

    $('.tabs').tabslet({
      animation: true,
    });

    $('#twitch-chat-frame-container > div').css('height', chatbodyHeight - 12);
  };
