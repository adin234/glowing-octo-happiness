var template = function (templateHTML, data) {

    for(var x in data) {
        var torep = new RegExp('{{'+x+'}}', 'gi');
        if(torep) {
            templateHTML = templateHTML
                .replace(torep,
                    data[x] == null ? '' : data[x]);
        }
    }

    return templateHTML;
};

var showSocialButtons = function () {
    var link = document.location.href;

    // // fix for youtubers 404 page2
    // if(~document.location.pathname.indexOf('/youtuber/')) {
    //     var id = window.location.pathname
    //         .split('/').filter(function(e){return e;})[1];

    //     var hash = document.location.hash;
    //     hash = hash.replace('#!/', '#!/'+id+'/');

    //     link = origin+'youtuber/share/'+hash;
    // } else if(~document.location.pathname.indexOf('/game/')) {
    //     var id = window.location.pathname
    //         .split('/').filter(function(e){return e;})[1];

    //     var hash = document.location.hash;
    //     hash = hash.replace('#!/', '#!/'+id+'/');

    //     link = origin+'game/share/'+hash;
    // }

    $('#viewport').html('');
    // $('#fb-root').html('');
    $('#social-buttons').html('');

    var html = '<div id="social-buttons">'
            // + '<div id="fb-container"></div>'
            + '<div class="g-plusone-frame"><div class="g-plusone" data-size='
            + '"standard" data-href="'+link+'"></div></div>'
            + '<a href="https://twitter.com/share" '
            + 'class="twitter-share-button" data-url="'+link+'" data-text="">'
            + 'Tweet</a>'
            + '</div>';

    document.getElementById('viewport').insertAdjacentHTML( 'beforeEnd', html );

    if(typeof FB === 'undefined') {
        var fb =  '<div id="fb-like" class="fb-like" data-share="true" '
        +'data-href="'+link+'" data-layout="button_count" data-width="50">'
        +'</div>';
        $('#viewport').before('<div id="fb-container"></div>');
        $('#viewport').before('<div id="fb-root"></div>');
        $('#fb-container').html(fb);

        window.fbAsyncInit = function() {

          FB.Event.subscribe('xfbml.render', function(response) {
            if($('#index-page').length){
                $('#fb-like').detach().prependTo($('#viewport'));
            }
          });
        };

        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=305385862975541&version=v2.0";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    } else {
        $('#fb-like').attr('data-href', link);
        FB.XFBML.parse(document.getElementById('fb-container'), function() {
        });
    }

    script = document.createElement( 'script' );
    script.async = true;
    script.src = document.location.protocol+'//platform.twitter.com/widgets.js';
    document.getElementById( 'social-buttons' ).appendChild( script );

    script = document.createElement( 'script' );
    script.async = true;
    script.src = document.location.protocol + '//apis.google.com/js/plusone.js';
    document.getElementById( 'social-buttons' ).appendChild( script );

};

var utilLogin = {
    show : function (message) {
        var msg = message || 'You need to login to perform this action';
        var loginMenu = document.createElement('div');
        loginMenu.classname = 'full-overlay';
        loginMenu.id = 'loginMenu';
        loginMenu.addEventListener('click', function(e){
            switch(e.target.classname) {
                case 'login-container'  :
                case 'full-overlay'     :
                    utilLogin.hide();
                    break;
            }
        }, false);
        var loginDiv = document.createElement('div');
        loginDiv.className = 'login-container';
        var username = $('<input/>', {
            type:'text',
            class: 'username-field',
            name: 'username',
            placeholder: '用戶名'
        });
        var password = $('<input/>', {
            type: 'password',
            class: 'password-field',
            name: 'password',
            placeholder: '密碼'
        });
        var label = $('<span/>', {
            class: 'login-label',
            text: msg
        });
        var loginBtn = $('<button/>', {
            class: 'login-button',
            text: '登入'
        });
        var loginWithSocialMedia = $('<a/>', {
            class: 'social-login',
            text: 'Login with Social Media',
            href: '//community.gamers.tm/zh/index.php?login&front=1'
        });

        loginBtn[0].addEventListener('click', function(e) {
            $.post(server+'login',{
                username: $('input[name=username]').val(),
                password: $('input[name=password]').val()
            },function(e) {
                var user = {
                    user_id: e.user_id,
                    username: e.username,
                    links: {
                        avatar: e.links.avatar,
                        detail: e.links.detail
                    },
                    access_code: e.access_code
                };
                utilCookie.set('user', JSON.stringify(user), 1/24);
                $('img.userImg').attr('src', utilUser.get().links.avatar);
                $(window).trigger('user_logged_in');
                utilLogin.hide();
            })
            .fail(function(e) {
                $('.login-label').html(e.responseJSON.message);
            });
        }, false);
        loginDiv.appendChild(label[0]);
        loginDiv.appendChild(username[0]);
        loginDiv.appendChild(password[0]);
        loginDiv.appendChild(loginBtn[0]);
        loginDiv.appendChild(loginWithSocialMedia[0]);
        loginMenu.appendChild(loginDiv);

        document.body.appendChild(loginMenu);
    },
    hide : function () {
        document.getElementById('loginMenu').remove();
    }
};

var getTwitch = function(data) {
    return data.split(',').map(function(item) {
        return item.trim();
    })[0];
}

var utilCookie = {
    set : function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
    },
    get : function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
};

var utilUser = {
    'get' : function() {
        return utilCookie.get('user')
            ? $.parseJSON(utilCookie.get('user'))
            : null;
    }
};

var utilHash = {
    'getHash' : function() {
        return window.location.hash;
    },
    'getHashArr' : function() {
        var hash = window.location.hash.replace('#!/', '');
        hash = hash.split('/');
        return hash;
    },
    'changeHashVal' : function(key, string, apply) {
        var apply = typeof  apply == 'undefined' ? true : false;
        var hash = window.location.hash.replace('#!/', '');
        var hashObj = {};
        var hashArr = [];
        hash = hash.split('/');
        for(var i = 0; i < hash.length; i++) {
            if(hash[i].trim().length) {
                hashObj[hash[i]] = hash[++i];
            }
        }
        hashObj[key] = string;

        Object.keys(hashObj).sort().forEach(function(key) {
            hashArr.push(key);
            if(hashObj[key] === undefined) {
                return;
            }
            hashArr.push(hashObj[key]);
        });

        var hash_string = utilHash.buildHash(hashArr);

        if(apply) {
            window.location.hash = hash_string;
        }

        return hash_string;
    },
    'addHash' : function(string, apply) {
        apply = typeof apply == 'undefined' ? true : false;

        var hash = window.location.hash;
        console.log(hash,hash[1] != '!');
        if(hash[1] != '!') {
            hash = hash.replace('#', '#!');
        }

        hash = hash.substr(-1) == '/' ? hash : hash+'/';

        var hash_string = hash + string;

        if(apply) {
             window.location.hash = hash_string;
        }

       return hash_string;
    },
    'removeHash': function(string, apply) {
         apply = typeof apply == 'undefined' ? true : false;

         var hash = window.location.hash;

         var hash_string = hash.replace('/'+string, '');
         if(apply) {
              window.location.hash = hash_string;
         }

        return hash_string;
    },
    'buildHash' : function(hashArr) {
        hashArr = (hashArr instanceof Array) ? hashArr : [hashArr];

        return '#!/' + hashArr.join('/');
    }
};

var updateTwitch = function() {
    var streamerCount = $('#number-of-streamers');
    if(streamerCount) {
       $.getJSON(server+'streamers', function(result) {
            streamerCount.html(result.streamers.length);
            if(typeof page_data.streamers != 'undefined') {
                var ids = [];
                var streamers = page_data.streamers;
                streamers.forEach(function(item) {
                    ids.push(item.user_id);
                });

                result.streamers.forEach(function(item) {
                    if(!~ids.indexOf(item.user_id)) {
                        page_data.streamers.push(item);
                    }
                });
            }
        });
    }
};

var utilArray = {
    intersect : function(a, b) {
      var ai=0, bi=0;
      var result = new Array();

      while( ai < a.length && bi < b.length )
      {
         if      (a[ai] < b[bi] ){ ai++; }
         else if (a[ai] > b[bi] ){ bi++; }
         else /* they're equal */
         {
           result.push(a[ai]);
           ai++;
           bi++;
         }
      }

      return result;
    }
};

var fixErrorImg = function(item) {
    item.onerror = "";
    item.src = 'http://community.gamers.tm/zh/styles/default/xenforo/avatars/avatar_male_l.png';
    return true;
};

// $('body').on('error', 'img.safeloading', function(e) {
//     $(this).attr(
//         'src',
//         'http://community.gamers.tm/zh/styles/default/xenforo/'
//             +'avatars/avatar_male_l.png'
//         )
// });
var searchId = false;
var searchBox = '';
function redirect_to_youtuber(id)  {
    window.location.href = origin+'youtuber/?user='+id
}

function redirect_to_gamer(id) {
    window.location.href = origin + 'game/?game=' + id;
}

function redirect_to_youtubers(id) {
    window.location.href = origin + 'youtubers/?user' + id;
}

function searchBoxInit() {
    options = {
      serviceUrl: server+'youtubers/search',
      // minChars: 3,
      zIndex: 9999,
      onSelect: function(value) {
        switch (value.typeid) {
            case 'G':
                redirect_to_gamer(value.data.game_id);
                break;
            default:
                redirect_to_youtuber(value.data.user_id);
                break;
        }

      }
    };
    var searchDom = $('#query');
    if(searchDom.length) {
        searchBox = searchDom.autocomplete(options);
        searchDom.on('keypress', function(e) {
            if(e.which == 13) {
                if(typeof searchBox.data().suggestions[0] != 'undefined') {
                    redirect_to_youtuber(searchBox.data().suggestions[0].data.user_id);
                } else {
                    return false;
                }
            }
        });
    }
}
var gamesAutocompleteArray = [];

function searchGamesBoxInit() {
    if(!gamesAutocompleteArray.length) return;

    optionGames = {
        lookup : gamesAutocompleteArray,
        onSelect: function(suggestion) {
            filter_game(this);
        }
    }

    $('#txtbox-search-games').autocomplete(optionGames);
}

function youtuberSearch() {
    options = {
      serviceUrl: server+'youtubers/search',
      // minChars: 3,
      zIndex: 9999,
      onSelect: function(value) {
        redirect_to_youtuber(value.data.user_id);
      }
    };
    var searchDom = $('#query');
    if(searchDom.length) {
        searchBox = searchDom.autocomplete(options);
        searchDom.on('keypress', function(e) {
            if(e.which == 13) {
                if(typeof searchBox.data().suggestions[0] != 'undefined') {
                    redirect_to_youtuber(searchBox.data().suggestions[0].data.user_id);
                } else {
                    return false;
                }
            }
        });
    }
}

function youtuberUserSearch() {
    options = {
      serviceUrl: server+'youtubers/search_youtubers',
      // minChars: 3,
      zIndex: 9999,
      onSelect: function(value) {
        var searchDom = $('#txtbox-search-videos');
        searchDom.val(value.value);
        filter_videos(searchDom);
      }
    };
    var searchDom = $('#txtbox-search-videos');
    if(searchDom.length) {
        searchBox = searchDom.autocomplete(options);
        searchDom.on('keypress', function(e) {
            if(e.which == 13) {
                var searchDom = $('#txtbox-search-videos');
                searchDom.val(value.data.user_id);
                filter_videos(searchDom);
            }
        });
    }
}

function streamersSearch() {
    var streamers = [];
    var searchDom = $('#txtbox-search-videos');

    if ( typeof page_data.streamers != 'undefined' && page_data.streamers.length) {
        for (var i = 0; i < page_data.streamers.length; i++) {
            var sd = page_data.streamers[i];
            if (sd.username.indexOf(searchDom.val()) > -1) {
                var sdata   = {sname : sd.username, s_id: sd.user_id};
                var svalue  = sd.username;
                streamers.push({value: svalue, data: sdata});
            }
        }
    }

    //console.log(streamers);

    var options = {
        lookup : streamers,
        onSelect: function(value) {
            //console.log(value);
            searchDom.val(value.value);
            filter_videos(value.value);
        }
    };

    if (searchDom.length) {
        searchBox = searchDom.autocomplete(options);
        searchDom.on('keypress', function(e) {
            if(e.which == 13) {
                //searchDom.val(value.value);
                filter_videos(searchDom);
            }
        });
    }
}

$(function() { searchBoxInit(); searchGamesBoxInit(); });

var streaming = [];
var streamTimeout = 100;

function get_streamers(first) {
    $.get(server+'streamers', function(result) {
        result.streamers.forEach(function(item) {
            if(first) { streaming.push('TW'+item.twitch.channel.name); return; }
            if(~streaming.indexOf('TW'+item.twitch.channel.name)) return;
            notify_stream({
                streamer: item.username,
                link: origin+'gamer_stream/?user_id='+item.user_id+'#!/'+'TW'+item.twitch.channel.name
            });
            streaming.push('TW'+item.twitch.channel.name);
        });
    }).always(function() {
        get_youtube_streamers(first);
    });
}

function get_youtube_streamers(first) {
    $.get(server+'streamers/youtube', function(result) {
        result.streamers.forEach(function(item) {
            console.log('alu');
            if(first) { streaming.push('YT'+item.youtube.id); return; }
            if(~streaming.indexOf('YT'+item.youtube.id)) return;
            notify_stream({
                streamer: item.username,
                link: origin+'gamer_stream/?user_id='+item.user_id+'#!/'+'YT'+item.youtube.id
            });
            streaming.push('YT'+item.youtube.id);
        });
    }).always(function() {
        if(streaming && streaming.length && $("a[href='/streamers']").length) {
            $("a[href='/streamers']").html('直播<sup>' + streaming.length + '</sup>');
        }
        setTimeout(function() {
            get_streamers();
        }, streamTimeout);
    });
}

$.extend($.gritter.options, {
    position: 'bottom-right',
    fade_in_speed: 'medium',
    fade_out_speed: 2000,
    time: 5000
});

var notify_stream = function(data) {
    $.gritter.add({
        title: '直播中',
        text: '<a class="link" href="'+data.link+'">'+data.streamer+'</a>'
    });
}

// session
$(function() {
    $.ajax({
        dataType:'jsonp',
        url:server+'logged_user',
        type: 'get'
    })
    .done(function(session) {
        if(typeof session.username !== 'undefined') {
            var links = [];
            links.push('<ul class="user-links">');
            links.push('<li><a href="http://community.gamers.tm/zh/index.php?account/personal-details" title="">個人資料</a></li>');
            links.push('<li><a href="/favorites" title="">我的最愛</a></li>');
            links.push('<li><a href="http://community.gamers.tm/zh/index.php?logout/">登出</a></li>');
            links.push('</ul>');

            var link = $('<a>',{
                text: session.username,
                title: session.username,
                href: 'http://community.gamers.tm/zh/index.php?account/personal-details'
            });

            utilCookie.set('user', JSON.stringify(session), 1/24);

            if($('body').hasClass('streams')) return;
            $('li.login').html(link).append(links.join(''));
            // $('li.login').html(link);
        }
    });

    if($('body').hasClass('streams')) return;
    setTimeout(function() {
         $('li.login').css('visibility', 'visible');
     }, 100);
});

$(function() {
    // if($('body').hasClass('stream-gritter')) {
        get_streamers(true);
    // }
});


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-46773919-11', 'auto');
ga('send', 'pageview');