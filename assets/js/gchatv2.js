$.fn.initChatBox = function(chl, usr)
{
    var chatUI;
    var msgNotify;
    var msgChat;

    var socket;
    /* User Information */
    var uid, uname, avatar, detail, acode;
    /* Channel Information */
    var chid, chname;
    /* Date Params */
    var dt;
    var btnname, txtname, txtctrl, inputctrl, gchatdiv;
    var ud;
    var notify='';

    dt          = new Date();

    socket      = io.connect('http://54.169.67.100:3000');

    /* Checking if templates are properly loaded
        alert(chatUI);
        alert(msgNotify);
        alert(msgChat);
    */;


    if (typeof chl.id == 'undefined' && typeof chl.title == 'undefined') {
        chid = '1';
        chname = 'Chat Room ' + chid;
    } else {
        chid = chl.id;
        chname = chl.title;
    }

    chatUI      = $('#chatui').html().replace(/{cid}/ig,chid);
    msgNotify   = $('#gchatnotify').html().replace(/{cid}/ig,chid);
    msgChat     = $('#chatms').html().replace(/{cid}/ig,chid);

    if (usr.user_id && usr.access_code) {
        uid         = usr.user_id;
        uname       = usr.username;
        avatar      = usr.links.avatar;
        detail      = usr.links.detail;
        acode       = usr.access_code;
    } else {
        uid         = dt.getMonth() +''+ dt.getDay() +''+ dt.getFullYear() +''+ dt.getHours() +''+ dt.getMinutes() +''+ dt.getSeconds();
        uname       = 'Guest'+ uid;
        avatar      = '/assets/images/gchat-anoni-user.png';
        detail      = 'none';
        acode       = uid;
    }

    gchatdiv        = '#'+this.attr('id');
    btnname         = '#btn-'+chid;
    txtname         = '#msgs-'+chid;

    $(gchatdiv).on("click", btnname, function(){
        txtctrl = '#msgs-'+chid;
        ud = {
            userid        : uid,
            username      : uname,
            uavatar       : avatar,
            udetail       : detail,
            access_code   : acode,
            cid           : chid,
            cname         : chl.title,
            msg           : $(txtctrl).val()
         };
        socket.emit('send-gm', ud);
        $(txtctrl).val('');
        $(txtctrl).focus();
    });

    $(gchatdiv).on("keypress", txtname, function(evt){
        if (evt.which == 13) {
            txtctrl = '#msgs-'+chid;
            ud = {
                userid        : uid,
                username      : uname,
                uavatar       : avatar,
                udetail       : detail,
                access_code   : acode,
                cid           : chid,
                cname         : chl.title,
                msg           : $(txtctrl).val()
             };
            socket.emit('send-gm', ud);
            $(txtctrl).val('');
            $(txtctrl).focus();
        }
    });

    socket.on('connect', function()
    {
        ud = {
                userid        : uid,
                username      : uname,
                uavatar       : avatar,
                udetail       : detail,
                access_code   : acode,
                cid           : chid,
                cname         : chl.title
            };
        socket.emit('auth_user',ud);
    });

    socket.on('allow-chat-input', function(sd){
        if(sd.allow == false){
            $('#chatinputs-'+ sd.cid).css('display','none');
        }
    });

    socket.on('update-ui', function(sd){

        var today   = new Date();
        var tinmins;
        var timesent, elem;

        if (sd.cid == chl.id) {
            console.log('Update chatbox for channel ' + sd.cid);
            if (sd.msgtype == 'notification') {
                msgbox      = '#tblchatmsgs-' + sd.cid;
                $(msgbox).append(msgNotify.replace(/{gchat-message}/ig,sd.msg));
            }
            else {
                if (today.getMinutes() < 10) {
                    tinmins = '0' + today.getMinutes()
                } else {
                    tinmins = today.getMinutes();
                }

                msgbox      = '#tblchatmsgs-' + sd.cid;
                if (today.getHours() > 11) {
                    timesent = today.getHours() + ':' + tinmins + 'PM';
                }
                else {
                    timesent = today.getHours() + ':' + tinmins + 'AM';
                }

                $(msgbox).append(msgChat.replace(/{message}/ig,sd.msg).replace(/{username}/ig, sd.user).replace(/{avatar}/ig, sd.uavatar).replace(/{timesent}/ig, 'Sent on ' + timesent));
            }

            window.setInterval(function() {
                elem = document.getElementById('chcontainer-'+sd.cid);
                elem.scrollTop = elem.scrollHeight;
            }, 2000);
        }
    });

    socket.on('createroom', function(user, newchannel){
        socket.emit('newroom',{username: user, channel: newchannel})
    });

    socket.on('leaveroom', function(user){
        socket.emit('leaveroom',{username : user})
    });

    console.log(this.attr('id'));
    this.append(chatUI);
    return false;
};
