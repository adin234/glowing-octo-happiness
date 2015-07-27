/*global
  attachments_server,
  server,
  showSocialButtons
  */

'use strict';

define('index', function(require) {
  var index_data = {},
    Tabs = require('../components/Tabs/index'),
    List_Slider = require('../components/List_Slider/index'),
    Main_Slider = require('../components/Main_Slider/index'),
    Thread_List = require('../components/Thread_List/index'),
    Global_Filter = require('../components/Global_Filter/index'),
    Featured_Users = require('../components/Featured_Users/index'),
    video_tpl = require('./templates/video-slide.html'),
    game_tpl = require('./templates/game-tpl.html'),
    ads_tpl = require('./templates/modal-advertisement.html'),
    main_slider = new Main_Slider(),
    main_tab = new Tabs({
      hash_change: false
    }),
    games_tab = new Tabs({
      hash_change: false
    }),
    news_shows_tabs = new Tabs({
      hash_change: false
    }),
    threads_tabs = new Tabs({
      hash_change: false
    }),
    featured_videos_slider = new List_Slider({
      per_slider: 9,
      item_template: video_tpl,
      $list_container: $('<ul class="list clearFix"/>')
    }),
    latest_videos_slider = new List_Slider({
      per_slider: 9,
      item_template: video_tpl,
      $list_container: $('<ul class="list clearFix"/>')
    }),
    most_viewed_slider = new List_Slider({
      per_slider: 9,
      item_template: video_tpl,
      $list_container: $('<ul class="list clearFix"/>')
    }),
    featured_game_slider = new List_Slider({
      per_slider: 12,
      item_template: game_tpl,
      $list_container: $('<ul class="game clearFix"/>'),
      after_mount: function() {
        featured_game_slider.$el.find('.tooltip').tooltipster({
          contentAsHTML: true
        });
      }
    }),
    latest_game_slider = new List_Slider({
      per_slider: 12,
      item_template: game_tpl,
      $list_container: $('<ul class="game clearFix"/>'),
      after_mount: function() {
        latest_game_slider.$el.find('.tooltip').tooltipster({
          contentAsHTML: true
        });
      }
    }),
    latest_threads = new Thread_List(),
    top_threads = new Thread_List(),
    page_intialized = false,
    games_initialized = false,
    global_filter = new Global_Filter({
      onChange: function(filter) {
        $.ajax({
          type: 'GET',
          dataType: 'json',
          url: server + 'index?console=' + filter.id
        }).done(function(data) {
          index_data = data;
          if (!page_intialized) {
            init_page();
            page_intialized = true;
          } else {
            featured_videos_slider.reload(
              transform_videos(
                shuffle(
                  index_data.featured_videos
                )
              )
            );
            latest_videos_slider.reload(
              transform_videos(
                shuffle(index_data.latest_videos)
              )
            );
            most_viewed_slider.reload(
              transform_videos(
                shuffle(index_data.most_viewed)
              )
            );
          }
        });

        $.ajax({
          type: 'GET',
          dataType: 'json',
          url: server + 'gamesdata?console=' + filter.id
        }).done(function(data) {
          index_data.games = data.games;
          if (!games_initialized) {
            init_games();
            games_initialized = true;
          } else {
            var featured_games = filter.id === 'all' ?
              get_per_category(index_data.games) :
              limit_category(filter.id, index_data.games);
            featured_game_slider.reload(
              shuffle(
                featured_games
              )
            );
            latest_game_slider.reload(
              shuffle(
                limit_latest(index_data.games)
              )
            );
          }
        });
      }
    }),

    transform_videos = function(data) {
      return data.map(function(item) {
        item.provider = attachments_server;
        item.thumb = item.snippet.thumbnails.medium.url;
        item.title = item.snippet.title;
        item.bust = 1;
        item.anytv_comment = item.anytv_comment || 0;
        item.comments = item.snippet.meta.statistics.commentCount;
        item.views = item.snippet.meta.statistics.viewCount;
        item.link = '/youtuber/?user=' + item.user_id + '#!/video/' + item.snippet.resourceId.videoId;
        return item;
      });
    },

    get_per_category = function(games) {
      var categories = {},
        filteredGames = [],
        category,
        valid_categories = ['mobile_app', 'pc', 'ps3', 'ps4', 'xbox1', 'xbox360'];
      games.forEach(function(game) {
        if (typeof game.consoles !== 'object' || !game.consoles.length) {
          return;
        }
        game.consoles.forEach(function(category) {
          if (category === 'all') {
            return;
          }
          categories[category] = categories[category] || [];

          if (~filteredGames.indexOf(game) && (category === 'xbox1' || category === 'xbox360')) {
            //remove item from other categories
            valid_categories.forEach(function(cat) {
              if (categories[cat] && ~categories[cat].indexOf(game)) {
                categories[cat].splice(categories[cat].indexOf(game), 1);
                filteredGames.splice(filteredGames.indexOf(game), 1);
              }
            });
          }

          if (~$.inArray(category, valid_categories) &&
            categories[category].length < 6 &&
            !~filteredGames.indexOf(game)
          )
          {
            categories[category].push(game);
            filteredGames.push(game);
          }
        });
      });

      return filteredGames;
    },

    limit_latest = function(games, limit) {
      limit = limit || 30;
      return games.slice(0, limit);
    },

    limit_category = function(category, data) {
      var collection = data.filter(function(item) {
        return item.consoles && ~item.consoles.indexOf(category);
      });
      return collection.slice(0, 6);
    },

    shuffle = function(o) {
      o = o.slice(0);
      for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
      return o;
    },

    init_page = function() {
      main_slider
        .init(index_data.slider)
        .mount($('#imageSlider'));
      latest_threads
        .init(index_data.recent_threads)
        .mount($('<div id="forumSection">'));
      top_threads
        .init(index_data.threads)
        .mount($('<div id="hotForumSection">'));
      threads_tabs
        .init()
        .addTab('tab-3-1', '最新討論', 'tab-3-2', latest_threads.$el)
        .addTab('tab-3-2', '熱門論壇', 'tab-3-2', top_threads.$el)
        .mount($('#threads_tabs'));
      featured_videos_slider
        .init(transform_videos(shuffle(index_data.featured_videos)))
        .mount($('#featuredVideos'));
      latest_videos_slider
        .init(transform_videos(shuffle(index_data.latest_videos)))
        .mount($('#latestVideos'));
      most_viewed_slider
        .init(transform_videos(shuffle(index_data.most_viewed)))
        .mount($('#mostViewed'));
      new Featured_Users(index_data);
      require('../components/Index_News_Shows/index')(index_data);
    },

    init_games = function() {
      var featured_games = global_filter.get_active().id === 'all' ?
        get_per_category(index_data.games) :
        limit_category(global_filter.get_active().id, index_data.games);

      var latest_games = global_filter.get_active().id === 'all' ?
        limit_latest(index_data.games) :
        limit_latest(index_data.games, 6);

      featured_game_slider
        .init(shuffle(
          featured_games
        ))
        .mount($('#featuredGames'));

      latest_game_slider
        .init(shuffle(
          latest_games
        ))
        .mount($('#latestGames'));
    };

  main_tab
    .init()
    .addTab('tab-1-2', '精選影片', 'tab-1-2', $('<div id="featuredVideos"/>'))
    .addTab('tab-1-3', '最新影片', 'tab-1-3', $('<div id="latestVideos"/>'))
    .addTab('tab-1-1', '最多觀賞', 'tab-1-1', $('<div id="mostViewed"/>'))
    .mount($('#main-videos'));

  games_tab
    .init()
    .addTab('tab-2-1', '精選遊戲', 'tab-2-1', $('<div id="featuredGames"/>'))
    .addTab('tab-2-2', '最新遊戲', 'tab-2-2', $('<div id="latestGames"/>'))
    .mount($('#games-tabs'));

  news_shows_tabs
    .init()
    .addTab('tab-news-playlist-1', '實況咖NEWS', 'tab-news-playlist-1', $('<ul class="list clearFix"/>'))
    .addTab('tab-news-playlist-2', 'Freedom!NEWS', 'tab-news-playlist-2', $('<ul class="list clearFix"/>'))
    .addTab('tab-shows-playlist-0', 'YouTube教學', 'tab-news-playlist-0', $('<ul class="list clearFix"/>'))
    .addTab('tab-shows-playlist-3', 'Freedom!教學', 'tab-news-playlist-3', $('<ul class="list clearFix"/>'))
    .mount($('#news_shows_playlists_block'));

  global_filter
    .init()
    .mount($('#global-filter'));

  showSocialButtons();

  // var showAdvertisement = function() {
  //     $('body').append(template(ads_tpl, {})).promise().done(function() {
  //         var img = new Image();
  //         img.onload = function() {
  //             $('.modal-full img').css({
  //                 height: $(window).height() - 30,
  //             });
  //         };
  //
  //         img.src = 'https://s3-ap-southeast-1.amazonaws.com/cdn.gamers.tm/gamers_assets/10days.png?asdf';
  //         utilCookie.set('advertisementShown', '1', 0.5);
  //         $('.modal-full img').replaceWith(img);
  //     });
  // },
  // hideAdvertisement = function() {
  //     $('.modal-full').remove();
  // };

  // if (!utilCookie.get('advertisementShown')) {
  //     showAdvertisement();
  // }
  //
  // $('body').on('click', '.modal-full .close', function() {
  //   hideAdvertisement();
  // });

  require('../components/Streamers_List/index');
  require('../components/Scroller/index');
  require('../components/Footer/index');
  require('../components/Sub_Nav/index');
});


require(['index']);
