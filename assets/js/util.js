/* jshint unused: false */
/* global
    server,
    origin,
    filter_game,
    filter_videos,
    page_data,
    socket_server,
    io,
    value
*/

'use strict';

var searchId = false,
    searchBox = '',
    gamesAutocompleteArray = [],
    streaming = [],
    streamingNew = [],
    streamingLan = 0,
    streamTimeout = 60000,
    optionGames = {},
    options = {},
    get_hitbox_streamers,

    utilCookie = {
        set: function (cname, cvalue, exdays) {
            var expires,
                d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            expires = 'expires=' + d.toUTCString();
            document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
        },
        get: function (cname) {
            var name = cname + '=',
                ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) !== -1) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        }
    },

    utilUser = {
        'get': function () {
            return utilCookie.get('user') ? $.parseJSON(utilCookie.get('user')) : null;
        }
    },

    utilLogin = {
        show: function (message) {
            var msg = message || '要留言請您先登入',
                loginMenu = document.createElement('div'),
                username = $('<input/>', {
                    type: 'text',
                    class: 'username-field',
                    name: 'username',
                    placeholder: '用戶名'
                }),
                password = $('<input/>', {
                    type: 'password',
                    class: 'password-field',
                    name: 'password',
                    placeholder: '密碼'
                }),
                label = $('<span/>', {
                    class: 'login-label',
                    text: msg
                }),
                loginBtn = $('<button/>', {
                    class: 'login-button',
                    text: '登入'
                }),
                loginWithSocialMedia = $('<a/>', {
                    class: 'social-login',
                    text: '用Facebook或Google+登入',
                    href: '//community.gamers.tm/zh/index.php?login&front=1'
                }),
                loginDiv = document.createElement('div');
            
            loginMenu.classname = 'full-overlay';
            loginMenu.id = 'loginMenu';
            loginMenu.addEventListener('click', function (e) {
                switch (e.target.classname) {
                    case 'login-container':
                    case 'full-overlay':
                        utilLogin.hide();
                        break;
                }
            }, false);

            loginBtn[0].addEventListener('click', function (e) {
                $.post(server + 'login', {
                        username: $('input[name=username]')
                            .val(),
                        password: $('input[name=password]')
                            .val()
                    }, function (_e) {
                        var user = {
                            user_id: _e.user_id,
                            username: _e.username,
                            links: {
                                avatar: _e.links.avatar,
                                detail: _e.links.detail
                            },
                            access_code: _e.access_code
                        };
                        utilCookie.set('user', JSON.stringify(user), 1 / 24);
                        $('img.userImg')
                            .attr('src', utilUser.get()
                                .links.avatar);
                        $(window)
                            .trigger('user_logged_in');
                        utilLogin.hide();
                        $(window)
                            .trigger('login-success');
                    })
                    .fail(function (__e) {
                        $('.login-label')
                            .html(__e.responseJSON.message);
                    });
            }, false);

            loginDiv.className = 'login-container';
            loginDiv.appendChild(label[0]);
            loginDiv.appendChild(username[0]);
            loginDiv.appendChild(password[0]);
            loginDiv.appendChild(loginBtn[0]);
            loginDiv.appendChild(loginWithSocialMedia[0]);
            loginMenu.appendChild(loginDiv);

            document.body.appendChild(loginMenu);
        },
        hide: function () {
            document.getElementById('loginMenu')
                .remove();
        }
    },

    utilHash = {
        'getHash': function () {
            return window.location.hash;
        },
        'getHashArr': function () {
            var hash = window.location.hash.replace('#!/', '');
            hash = hash.split('/');
            return hash;
        },
        'changeHashVal': function (key, string, apply) {
            apply = typeof apply === 'undefined' ? true : false;
            var hash = window.location.hash.replace('#!/', ''),
                hashObj = {},
                hashArr = [];
            hash = hash.split('/');
            for (var i = 0; i < hash.length; i++) {
                if (hash[i].trim()
                    .length) {
                    hashObj[hash[i]] = hash[++i];
                }
            }
            hashObj[key] = string;

            Object.keys(hashObj)
                .sort()
                .forEach(function (_key) {
                    hashArr.push(_key);
                    if (hashObj[_key] === undefined) {
                        return;
                    }
                    hashArr.push(hashObj[_key]);
                });

            var hash_string = utilHash.buildHash(hashArr);

            if (apply) {
                window.location.hash = hash_string;
            }

            return hash_string;
        },
        'addHash': function (string, apply) {
            var hash = window.location.hash;

            apply = typeof apply === 'undefined' ? true : false;
            if (hash[1] !== '!') {
                hash = hash.replace('#', '#!');
            }

            hash = hash.substr(-1) === '/' ? hash : hash + '/';

            var hash_string = hash + string;

            if (apply) {
                window.location.hash = hash_string;
            }

            return hash_string;
        },
        'removeHash': function (string, apply) {
            apply = typeof apply === 'undefined' ? true : false;
            var hash = window.location.hash,
                hash_string = hash.replace('/' + string, '');
            if (apply) {
                window.location.hash = hash_string;
            }
            return hash_string;
        },
        'buildHash': function (hashArr) {
            hashArr = (hashArr instanceof Array) ? hashArr : [hashArr];
            return '#!/' + hashArr.join('/');
        }
    },

    utilArray = {
        intersect: function (a, b) {
            var ai = 0,
                bi = 0,
                result = [];
            while (ai < a.length && bi < b.length) {
                if (a[ai] < b[bi]) {
                    ai++;
                }
                else if (a[ai] > b[bi]) {
                    bi++;
                }
                else {
                    result.push(a[ai]);
                    ai++;
                    bi++;
                }
            }
            return result;
        }
    },

    template = function (templateHTML, data) {
        for (var x in data) {
            var torep = new RegExp('{{' + x + '}}', 'gi');
            if (torep && templateHTML) {
                templateHTML = templateHTML
                    .replace(torep,
                        data[x] === null ? '' : data[x]);
            }
        }
        return templateHTML;
    },

    showSocialButtons = function (_image, _description, _title) {
        var link = document.location.href,
            clean = link.replace('#', '%23'),
            social = [],
            image = encodeURIComponent(_image || 'http://www.gamers.tm/assets/images/fb.jpg'),
            description = _description ||
            '實況咖是一個集結和給予玩家各個利益的YouTube社群網! ' +
            '在這裡，每位實況咖的玩家都有機會享受我們所提供的服務，包括: ' +
            '免費取得廠商遊戲、硬體設備，協助擴大您的頻道，與實況主交流結合，' +
            '參與遊戲相關活動…等等。 要如何正式成為實況咖一員呢?',
            title = _title || 'Gamers.TM';

        social.push(
            '<div class="frame-container"><iframe class="fb-like-frame" ' +
            'src="//www.facebook.com/plugins/like.php?href=' +
            encodeURIComponent(clean) +
            '&amp;width&amp;layout=button&amp;action=like&amp;' +
            'show_faces=false&amp;share=false&amp;height=35" ' +
            'scrolling="no" frameborder="0" style="border:none; ' +
            'overflow:hidden;" allowTransparency="true"></iframe></div>'
        );
        social.push(
            '<a class="social-share" ' +
            'href="https://www.facebook.com/dialog/feed?' +
            'app_id=305385862975541&display=page&description=' +
            description + '&link=' + clean +
            '&redirect_uri=http://www.facebook.com/&name=' +
            title + '!&picture=' + image +
            '" target="_blank"><img src="/assets/images/social/facebook.png"/></a>'
        );
        social.push('<a class="social-share" ' +
            'href="https://twitter.com/intent/tweet?text=Check out ' +
            encodeURIComponent(link) + '" target="_blank">' +
            '<img src="/assets/images/social/twitter.png"/></a>'
        );
        social.push('<a class="social-share" ' +
            'href="https://plusone.google.com/_/+1/confirm?hl=en&url=' + link +
            '" target="_blank"><img src="/assets/images/social/googleplus.png"/></a>'
        );

        $('#viewport')
            .html(social.join(''));
    },

    fixErrorImg = function (item) {
        item.onerror = '';
        item.src = 'http://community.gamers.tm/zh/styles/default/xenforo/avatars/avatar_male_l.png';
        return true;
    },

    redirect_to_youtuber = function (id) {
        window.location.href = origin + 'youtuber/?user=' + id;
    },

    redirect_to_gamer = function (id) {
        window.location.href = origin + 'game/?game=' + id;
    },

    redirect_to_youtubers = function (id) {
        window.location.href = origin + 'youtubers/?user' + id;
    },

    searchBoxInit = function () {
        options = {
            serviceUrl: server + 'youtubers/search',
            zIndex: 9999,
            onSelect: function (value) {
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
        if (searchDom.length) {
            searchBox = searchDom.autocomplete(options);
            searchDom.on('keypress', function (e) {
                if (e.which === 13) {
                    if (typeof searchBox.data()
                        .suggestions[0] !== 'undefined') {
                        redirect_to_youtuber(searchBox.data()
                            .suggestions[0].data.user_id);
                    }
                    else {
                        return false;
                    }
                }
            });
        }
    },


    searchGamesBoxInit = function () {
        if (!gamesAutocompleteArray.length) {
            return;
        }
        optionGames = {
            lookup: gamesAutocompleteArray,
            onSelect: function (suggestion) {
                filter_game(this);
            }
        };
        $('#txtbox-search-games')
            .autocomplete(optionGames);
    },

    youtuberSearch = function () {
        options = {
            serviceUrl: server + 'youtubers/search',
            zIndex: 9999,
            onSelect: function (value) {
                redirect_to_youtuber(value.data.user_id);
            }
        };
        var searchDom = $('#query');
        if (searchDom.length) {
            searchBox = searchDom.autocomplete(options);
            searchDom.on('keypress', function (e) {
                if (e.which === 13) {
                    if (typeof searchBox.data()
                        .suggestions[0] !== 'undefined') {
                        redirect_to_youtuber(searchBox.data()
                            .suggestions[0].data.user_id);
                    }
                    else {
                        return false;
                    }
                }
            });
        }
    },

    youtuberUserSearch = function () {
        options = {
            serviceUrl: server + 'youtubers/search_youtubers',
            zIndex: 9999,
            onSelect: function (value) {
                var searchDom = $('#txtbox-search-videos');
                searchDom.val(value.value);
                filter_videos(searchDom);
            }
        };

        var searchDom = $('#txtbox-search-videos');
        if (searchDom.length) {
            searchBox = searchDom.autocomplete(options);
            searchDom.on('keypress', function (e) {
                if (e.which === 13) {
                    searchDom = $('#txtbox-search-videos');
                    searchDom.val(value.data.user_id);
                    filter_videos(searchDom);
                }
            });
        }
    },

    streamersSearch = function () {
        var streamers = [],
            searchDom = $('#txtbox-search-videos'),
            sdata = {},
            svalue = {};

        if (typeof page_data.streamers !== 'undefined' && page_data.streamers.length) {
            for (var i = 0; i < page_data.streamers.length; i++) {
                var sd = page_data.streamers[i];
                if (sd.username.indexOf(searchDom.val()) > -1) {
                    sdata = {
                        sname: sd.username,
                        s_id: sd.user_id
                    };
                    svalue = sd.username;
                    streamers.push({
                        value: svalue,
                        data: sdata
                    });
                }

                if (typeof (sd.title) !== 'undefined') {
                    if (sd.title.indexOf(searchDom.val()) > -1) {
                        sdata = {
                            sname: sd.title,
                            s_id: sd.user_id
                        };
                        svalue = sd.title;
                        streamers.push({
                            value: svalue,
                            data: sdata
                        });
                    }
                }
            }
        }
        else {
            sdata = {
                sname: 'streamer',
                s_id: -1
            };
            svalue = '目前沒有此';
            streamers.push({
                value: svalue,
                data: sdata
            });
        }
        options = {
            lookup: streamers,
            onSelect: function (value) {
                searchDom.val(value.value);
                filter_videos(value.value);
            }
        };

        if (searchDom.length) {
            searchBox = searchDom.autocomplete(options);
            searchDom.on('keypress', function (e) {
                if (e.which === 13) {
                    filter_videos(searchDom);
                }
            });
        }
    },

    notify_stream = function (data) {
        $.gritter.add({
            title: '直播',
            text: '<a class="link" href="' + data.link + '">' + data.streamer + '</a>'
        });
    },

    get_youtube_streamers = function (first) {
        $.get(server + 'streamers/youtube', function (result) {
                result.streamers.forEach(function (item) {
                    if ((item.user_group_id === 5 ||
                            (item.secondary_group_ids && ~item.secondary_group_ids.indexOf(5))) && ~item.youtube
                        .snippet.title.toLowerCase()
                        .indexOf('lan')) {
                        streamingLan++;
                    }

                    if (first) {
                        streamingNew.push('YT' + item.youtube.id);
                        return;
                    }

                    if (~streaming.indexOf('YT' + item.youtube.id)) {
                        streamingNew.push('YT' + item.youtube.id);
                        return;
                    }

                    notify_stream({
                        streamer: item.username,
                        link: origin + 'gamer_stream/?user=' + item.user_id + '#!/' + 'YT' + item.username
                    });

                    streamingNew.push('YT' + item.youtube.id);
                });
            })
            .always(function () {
                var streamingLanCount;
                if (streaming && typeof streaming.length !== undefined && $('a[href=\'/streamers\']')
                    .length) {
                    var streamingLength = streaming.length || '';
                    $('a[href=\'/streamers\']:not(.no-sup)')
                        .html('直播<sup>' + streamingLength + '</sup>');
                }

                if ($('a[href=\'#\']')
                    .length) {
                    streamingLanCount = streamingLan || '';
                    $('a[href=\'#\']')
                        .html('搞活動<sup>' + streamingLanCount + '</sup>');
                }

                if ($('a[href=\'/lanparty_stream_multi\']')
                    .length) {
                    streamingLanCount = streamingLan || '';
                    $('a[href=\'/lanparty_stream_multi\']')
                        .html('直播<sup>' + streamingLanCount + '</sup>');
                }

                get_hitbox_streamers(first);
            });
    },

    get_streamers = function (first) {
        streamingLan = 0;
        streamingNew = [];
        $.get(server + 'streamers', function (result) {
                result.streamers.forEach(function (item) {
                    if ((item.user_group_id === 5 || ~item.secondary_group_ids.indexOf(5)) && item.twitch.channel
                        .status && ~item.twitch.channel.status.toLowerCase()
                        .indexOf('lan')) {

                        streamingLan++;
                    }

                    if (first) {
                        streamingNew.push('TW' + item.twitch.channel.name);
                        return;
                    }

                    if (~streaming.indexOf('TW' + item.twitch.channel.name)) {
                        streamingNew.push('TW' + item.twitch.channel.name);
                        return;
                    }

                    notify_stream({
                        streamer: item.twitch.channel.name,
                        link: origin + 'gamer_stream/?user=' + item.user_id + '#!/' + 'TW' + item.twitch
                            .channel.name
                    });

                    streamingNew.push('TW' + item.twitch.channel.name);
                });
            })
            .always(function () {
                get_youtube_streamers(first);
            });
    };

    get_hitbox_streamers = function (first) {
        $.get(server + 'streamers/hitbox', function (result) {
                result.streamers.forEach(function (item) {
                    if ((item.user_group_id === 5 || (
                            item.secondary_group_ids && ~item.secondary_group_ids.indexOf(5))) && ~item.youtube
                        .snippet.title.toLowerCase()
                        .indexOf('lan')) {
                        streamingLan++;
                    }

                    if (first) {
                        streamingNew.push('HB' + item.hitbox.livestream[0].media_user_name);
                        return;
                    }

                    if (~streaming.indexOf('HB' + item.hitbox.livestream[0].media_user_name)) {
                        streamingNew.push('HB' + item.hitbox.livestream[0].media_user_name);
                        return;
                    }

                    notify_stream({
                        streamer: item.username,
                        link: origin + 'gamer_stream/?user=' + item.user_id + '#!/' + 'HB' + item.hitbox
                            .livestream[0].media_user_name
                    });

                    streamingNew.push('HB' + item.hitbox.livestream[0].media_user_name);
                });
            })
            .always(function () {
                var streamingLanCount;
                if (streaming && typeof streaming.length !== undefined && $('a[href=\'/streamers\']')
                    .length) {
                    var streamingLength = streaming.length || '';
                    $('a[href=\'/streamers\']:not(.no-sup)')
                        .html('直播<sup>' + streamingLength + '</sup>');
                }

                if ($('a[href=\'/lanparty\']').length) {
                    streamingLanCount = streamingLan || '';
                    $('a[href=\'/lanparty\']')
                        .html('Lan Party<sup>' + streamingLanCount + '</sup>');
                }

                if ($('a[href=\'/lanparty_stream_multi\']')
                    .length) {
                    streamingLanCount = streamingLan || '';
                    $('a[href=\'/lanparty_stream_multi\']')
                        .html('直播<sup>' + streamingLanCount + '</sup>');
                }

                streaming = streamingNew;
                get_streamers();
            });
    };

$(function () {
    searchBoxInit();
    searchGamesBoxInit();
});

$.extend($.gritter.options, {
    position: 'bottom-right',
    fade_in_speed: 'medium',
    fade_out_speed: 1000,
    time: 1000
});

$(function () {
    $.ajax({
            dataType: 'jsonp',
            url: server + 'logged_user',
            type: 'get'
        })
        .done(function (session) {
            if (session.username) {
                var links = [];
                links.push('<ul class="user-links">');
                links.push(
                    '<li><a href="http://community.gamers.tm/zh/index.php?' +
                    'account/personal-details" title="">個人資料</a></li>'
                );
                links.push('<li><a href="/favorites" title="">我的最愛</a></li>');
                links.push('<li><a href="http://community.gamers.tm/zh/index.php?logout/">登出</a></li>');
                links.push('</ul>');

                var link = $('<a>', {
                    text: session.username,
                    title: session.username,
                    href: 'http://community.gamers.tm/zh/index.php?account/personal-details'
                });

                utilCookie.set('user', JSON.stringify(session), 1);

                if ($('body').hasClass('streams')) {
                    return;
                }
                $('li.login')
                    .html(link)
                    .append(links.join(''));
            }
            else {
                utilCookie.set('user', '', 0);
            }
        });

    if ($('body').hasClass('streams')) {
        return;
    }
    setTimeout(function () {
        $('li.login')
            .css('visibility', 'visible');
    }, 100);
});
/* jshint ignore:start */
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || [])
        .push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-46773919-11', 'auto');
ga('send', 'pageview');
/* jshint ignore:end */

// $.getScript('/assets/js/libs/socketio.js', function(){
//     var socket = io.connect(socket_server);
//     socket.on('message', function(e) {
//         var count = e.streamers.youtube.length
//                 + e.streamers.twitch.length
//                 + e.streamers.hitbox.length,
//             streamerCount = $('#number-of-streamers');
//         if (streamerCount) {
//             streamerCount.html(count);
//         }
//     });
// });
