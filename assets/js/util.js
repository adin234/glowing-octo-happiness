var template = function (templateHTML, data) {
    for(var x in data) {
        templateHTML = templateHTML.replace(new RegExp('{{'+x+'}}', 'gi'), data[x]);
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
            + '<div class="g-plusone-frame"><div class="g-plusone" data-size="standard" data-href="'+link+'"></div></div>'
            + '<a href="https://twitter.com/share" class="twitter-share-button" data-url="'+link+'" data-text="">Tweet</a>'
            + '<div id="fb-root"></div>'
            + '</div>';

    document.getElementById( 'viewport' ).insertAdjacentHTML( 'beforeEnd', html );

    if(typeof FB === 'undefined') {
        var fb =  '<div id="fb-like" class="fb-like" data-href="'+link+'" data-layout="button_count" data-width="50" ></div>';
        $('#fb-container').html(fb);

        var script = document.createElement( 'script' );
        script.async = true;
        script.src = document.location.protocol + '//connect.facebook.net/en_US/all.js#xfbml=1&appId=267603823260704';
        document.getElementById( 'fb-root' ).appendChild( script );
    } else {
        $('#fb-like').data('data-href', link);
        FB.XFBML.parse();
    }

    script = document.createElement( 'script' );
    script.async = true;
    script.src = document.location.protocol + '//platform.twitter.com/widgets.js';
    document.getElementById( 'social-buttons' ).appendChild( script );

    script = document.createElement( 'script' );
    script.async = true;
    script.src = document.location.protocol + '//apis.google.com/js/plusone.js';
    document.getElementById( 'social-buttons' ).appendChild( script );

};
