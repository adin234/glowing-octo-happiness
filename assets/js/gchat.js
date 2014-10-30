    //change the params it should send.
    //on the backend make sure you save the list of users with id, name and avatar
    //save the channels too with their id. if channel is not in the cache of channels
    //  save the title that comes with it
    /*
    user: {
        "user_id":18,
        "username":"admin234",
        "links":{
            "avatar":"http://community.gamers.tm/zh/data/avatars/m/0/18.jpg?1412800323",
            "detail":"http://community.gamers.tm/zh/api/index.php?users/18/&oauth_token=bc0a1292d75b9769e2bbf9cbaf82d746"
        },
        "access_code":"54eaac3275b55e9679700bf7f000d22a2ccdc86b"
    },
    channel: {
        "id" : "YT54qdGeiH0Og",
        "title" : "Selfie"
    }
    */

$.fn.initChatBox = function(channel, user){

    /* User Information */
    var uid, uname, avatar, detail, acode;
    
    uid         = user.user_id;
    uname       = user.username;
    avatar      = user.links.avatar;
    detail      = user.links.detail;
    acode       = user.access_code;
    
    /* Channel Information */
    var channelid = channel.id;
    var channelname = channel.title;
      
    var socket = io.connect('http://localhost:3000');
    
    var tokenValid = false;
    if (user.length > 0 && token.length > 0) {
        tokenValid = true;
    }
    
    
    /* The Chatbox */
    var divChatBox = document.createElement("DIV");
        divChatBox.setAttribute("id","chat-container");
        divChatBox.style.backgroundColor = "#F8F8F8";
        divChatBox.style.border = "3px solid gray";
        divChatBox.style.borderTopLeftRadius = "10px";
        divChatBox.style.borderTopRightRadius = "10px";
        divChatBox.style.width = "100%";
        divChatBox.style.height = "100%";
        divChatBox.style.fontFamily = "Calibri";
        divChatBox.style.textAlign = "center";
    
    /* Channel Name */
    var divChannel = document.createElement("DIV");
    var divRoomName = document.createTextNode(channelname);
        divChannel.setAttribute("id","channel");
        divChannel.style.fontWeight = "bolder";
        divChannel.style.backgroundColor = "#F8F8F8";
        divChannel.style.height = "5%";
        divChannel.style.width = "100%";
        divChannel.style.borderBottom = "1px solid gray";
        divChannel.style.marginTop = "1px";
        divChannel.style.color = "black";
        divChannel.style.borderRadius = "7px 7px 0px 0px";
        divChannel.appendChild(divRoomName);
    
    /* Chat panel */
    var divChatPanel = document.createElement("DIV");
        divChatPanel.setAttribute("id","chatbox");
        divChatPanel.style.backgroundColor = "#F8F8F8;";
        divChatPanel.style.width = "100%";
        divChatPanel.style.height = "87%";
        divChatPanel.style.overflowY = "scroll";
        divChatPanel.style.marginBottom = "2px";
        divChatPanel.style.borderBottom = "1px solid gray";
        divChatPanel.style.fontSize = "14px";
        divChatPanel.style.textAlign = "left";
        divChatPanel.style.color = "black";
        
    /* Chat Textbox and Send Button */
    var divChatInputs = document.createElement("DIV");
        divChatInputs.setAttribute("id","inputsender");
        divChatInputs.style.backgroundColor = "#F8F8F8";
        divChatInputs.style.width = "100%";
        divChatInputs.style.height = "6%";

    var inpChatText = document.createElement("INPUT");
        inpChatText.setAttribute("id","data");
        inpChatText.setAttribute("type","text");
        inpChatText.style.marginBottom = "2px";
        inpChatText.style.marginLeft = "3px";
        inpChatText.style.marginRight = "2px";
        inpChatText.style.fontFamily = "Calibri";
        inpChatText.style.height = "46px";
        inpChatText.style.width = "80%";
        inpChatText.style.border = "1px solid gray";
        inpChatText.style.padding = "4px 4px 4px 4px";
        inpChatText.style.fontSize = "1em";

    var btnSendText = document.createElement("BUTTON");
    var btnText = document.createTextNode("SEND");
        btnSendText.setAttribute("id","datasend");
        btnSendText.style.fontSize = "14px";
        btnSendText.style.height = "98%";
        btnSendText.style.width = "15%";
        btnSendText.style.fontFamily = "Calibri";
        btnSendText.style.fontWeight = "bolder";
        btnSendText.style.borderRadius = "7px 0px 7px 0px";
        btnSendText.style.border = "1px solid black";
        btnSendText.appendChild(btnText);
        
    if (!acode) {
        inpChatText.setAttribute("readonly","readonly");
        btnSendText.setAttribute("disabled", "disabled");
    }
    
    divChatInputs.appendChild(inpChatText);
    divChatInputs.appendChild(btnSendText);
    
    divChatBox.appendChild(divChannel);
    divChatBox.appendChild(divChatPanel);
    divChatBox.appendChild(divChatInputs);
    
    this.append(divChatBox);
    
    var sendViaButton   = document.getElementById('datasend');
    var msgContainer    = document.getElementById('data');
    var docBody         = document.body;
    
    sendViaButton.addEventListener("click",function(){
        if (msgContainer.value.length > 0) {
            socket.emit('sendchat', msgContainer.value);
            msgContainer.value = "";
            msgContainer.focus();
        } else {
            msgContainer.focus();
        }
        window.setInterval(function() {
            var elem = document.getElementById('chatbox');
            elem.scrollTop = elem.scrollHeight;
        }, 3000);
    }); 
    
    msgContainer.addEventListener("keypress", function(e){
        if (e.which == 13 && msgContainer.value.length > 0) {
            socket.emit('sendchat', msgContainer.value);
            msgContainer.value = "";
            msgContainer.focus();
        } else {
            msgContainer.focus();
        }
        
        window.setInterval(function() {
            var elem = document.getElementById('chatbox');
            elem.scrollTop = elem.scrollHeight;
        }, 5000);
    });

    socket.on('connect', function(){
        socket.emit('validateuser',{userid   : uid, accesscd : acode});
    });
    
    socket.on('uservalidated', function(data){
        if (data.validated == 'true') {
            socket.emit('adduser',{userid   : uid,
                                   usernm   : uname,
                                   uavatar  : avatar,
                                   udetail  : detail,
                                   accesscd : acode,
                                   chid     : channelid,
                                   chname   : channelname
                                   });              
        } else {
            $('#data').attr('readonly','readonly');
            $('#datasend').attr('disabled','disabled');
        }
    });
    
    socket.on('updatechat', function(username, data){
        var msgContainer = document.getElementById('data');
        var chBox       = document.getElementById('chatbox');
        var newMsg      = document.createElement('B');
            newMsg.style.marginLeft = "1em";
        var msgOwner    = document.createTextNode(username + ": ");
        var msgText     = document.createTextNode(data);
        var newline     = document.createElement("BR");
            newMsg.appendChild(msgOwner);
            chBox.appendChild(newMsg);
            chBox.appendChild(msgText);
            chBox.appendChild(newline);
    });
};