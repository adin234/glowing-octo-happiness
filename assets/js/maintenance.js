
$(function() {
    $('#gamers-link').css('display','none'); 
    isUnderMaintenance();
});

var isUnderMaintenance = function() {
    $.ajax(server + 'streamers', function(data) {
        console.log(data);
    }).fail(function() {
        if ($('#gamers-link').css('display') === 'block') {
            $('#gamers-link').css('display','none'); 
        }
    }).success(function() {
        if ($('#gamers-link').css('display') === 'none') {
            $('#gamers-link').css('display','block');
        }
    });
};

var checker = setInterval(function() {    
    $.ajax(server + 'streamers', function(data) {
        console.log(data);
    }).fail(function() {
        if ($('#gamers-link').css('display') === 'block') {
            $('#gamers-link').css('display','none'); 
        }
        console.log('Fail');
    }).success(function() {
        if ($('#gamers-link').css('display') === 'none') {
            $('#gamers-link').css('display','block');
            clearInterval(checker);
        }
    });
    

}, 5000);