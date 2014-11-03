var server              = 'http://localhost:3000/';
var origin              = 'http://localhost:8000/';
var attachments_server  = 'http://community.gamers.tm/zh/';
var community           = 'http://community.gamers.tm/zh/';

var utilLoader = {
    show: function(loader) {
        var loaderDiv = document.createElement('div');
        loaderDiv.id = 'loaderIcn';
        loaderDiv.className = 'full-overlay';
        var container = document.createElement('div');
        container.className = 'center-container';
        var img = document.createElement('img');
        img.setAttribute('src',
            'http://media-minecraftforum.cursecdn.com/avatars/thumbnails/24/20'
            +'8/140/140/635357067714020000_animated.gif');
        img.width = 116;
        img.height= 140;

        container.appendChild(img);
        loaderDiv.appendChild(container);
        document.body.appendChild(loaderDiv);
    },
    hide: function() {
        var loaderIcn = document.getElementById('loaderIcn');
        if(loaderIcn && typeof loaderIcn != 'undefined') {
            loaderIcn.remove();
        }
    }
};

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-46773919-11', 'auto');
ga('send', 'pageview');

