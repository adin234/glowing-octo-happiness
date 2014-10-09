var template = function (templateHTML, data) {
    for(var x in data) {
        templateHTML = templateHTML
            .replace(new RegExp('{{'+x+'}}', 'gi'),
                data[x] == null ? '' : data[x]);
    }

    return templateHTML;
};

var showSocialButtons = function () {
    var link = document.location.href;

    // fix for youtubers 404 page2
    +3
    if(~document.location.pathname.indexOf('/youtuber/')) {
        var id = window.location.pathname
            .split('/').filter(function(e){return e;})[1];

        var hash = document.location.hash;
        hash = hash.replace('#!/', '#!/'+id+'/');

        link = origin+'youtuber/share/'+hash;
    }

    $('#viewport').html('');
    $('#fb-root').html('');
    $('#social-buttons').html('');

    var html = '<div id="social-buttons">'
            + '<div id="fb-container"></div>'
            + '<div class="g-plusone-frame"><div class="g-plusone" data-size='
            + '"standard" data-href="'+link+'"></div></div>'
            + '<a href="https://twitter.com/share" '
            + 'class="twitter-share-button" data-url="'+link+'" data-text="">'
            + 'Tweet</a>'
            + '<div id="fb-root"></div>'
            + '</div>';

    document.getElementById('viewport').insertAdjacentHTML( 'beforeEnd', html );

    if(typeof FB === 'undefined') {
        var fb =  '<div id="fb-like" class="fb-like" data-share="true" '
        +'data-href="'+link+'" data-layout="button_count" data-width="50">'
        +'</div>';
        $('#fb-container').html(fb);

        var script = document.createElement( 'script' );
        script.async = true;
        script.src = document.location.protocol +
            '//connect.facebook.net/en_US/all.js#xfbml=1&appId=267603823260704';
        document.getElementById( 'fb-root' ).appendChild( script );
    } else {
        $('#fb-like').data('data-href', link);
        FB.XFBML.parse();
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
            console.log(e.target.classname);
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
            placeholder: 'Username'
        });
        var password = $('<input/>', {
            type: 'password',
            class: 'password-field',
            name: 'password',
            placeholder: 'Password'
        });
        var label = $('<span/>', {
            class: 'login-label',
            text: msg
        });
        var loginBtn = $('<button/>', {
            class: 'login-button',
            text: 'Login'
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
        document.cookie = cname + "=" + cvalue + "; " + expires;
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
    'addHash' : function(string, apply) {
        apply = typeof apply == 'undefined' ? true : false;

        var hash = window.location.hash;

        if(hash.substr(1) != '!') {
            hash = hash.replace('#', '#!');
        }

        hash = hash.substr(-1) == '/' ? hash : hash+'/';

        var hash_string = hash + string;

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
//     console.log(e);
//     $(this).attr(
//         'src',
//         'http://community.gamers.tm/zh/styles/default/xenforo/'
//             +'avatars/avatar_male_l.png'
//         )
// });
