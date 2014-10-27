var server              = 'http://192.168.1.105:3000/';
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
        if(typeof loaderIcn != 'undefined') {
            loaderIcn.remove();
        }
    }
};