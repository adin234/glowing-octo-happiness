var template = function (templateHTML, data) {
    for(var x in data) {
        templateHTML = templateHTML
            .replace(new RegExp('{{'+x+'}}', 'gi'), data[x]);
    }

    return templateHTML;
};

var showSocialButtons = function () {
    var link = document.location.href;

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

var setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};

var getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
};

var forceLogin = function (message) {
    var msg = message || 'You need to login to perform this action';
    var loginMenu = document.createElement('div');
    loginMenu.classname = 'full-overlay';
    loginMenu.id = 'loginMenu';
    loginMenu.addEventListener('click', function(e){
        console.log(e.target.classname);
        switch(e.target.classname) {
            case 'login-container'  :
            case 'full-overlay'     :
                removeLogin();
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
    loginDiv.appendChild(label[0]);
    loginDiv.appendChild(username[0]);
    loginDiv.appendChild(password[0]);
    loginDiv.appendChild(loginBtn[0]);
    loginMenu.appendChild(loginDiv);

    document.body.appendChild(loginMenu);
};

var removeLogin = function () {
    document.getElementById('loginMenu').remove();
};