var server = 'http://api.gamers.tm/'; //'http://api.gamers.tm/'; //;//http://api.gamers.tm/'
var origin = 'http://beta.gamers.tm/';//'http://localhost:8000/';  //'http://www.gamers.tm/';////
var attachments_server = 'http://community.gamers.tm/zh/';
var community = 'http://community.gamers.tm/zh/';
var page_maintenance = origin + 'maintenance.html';

var utilLoader = {
    show: function (loader) {
        var loaderDiv = document.createElement('div');
        loaderDiv.id = 'loaderIcn';
        loaderDiv.className = 'full-overlay';
        var container = document.createElement('div');
        container.className = 'center-container';
        var img = document.createElement('img');
        img.setAttribute('src',
            'http://media-minecraftforum.cursecdn.com/avatars/thumbnails/24/20' +
            '8/140/140/635357067714020000_animated.gif');
        img.width = 116;
        img.height = 140;

        container.appendChild(img);
        loaderDiv.appendChild(container);
        document.body.appendChild(loaderDiv);
    },
    hide: function () {
        var loaderIcn = document.getElementById('loaderIcn');
        if (loaderIcn && typeof loaderIcn != 'undefined') {
            loaderIcn.remove();
        }
    }
};

