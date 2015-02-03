utilLogin.show();

$(window).on('login-success', function (e) {
    $.ajax({
        dataType:'jsonp',
        url:server+'earnings',
        type: 'get'
    })
    .done(function(earnings) {
        if(earnings[0].split('user=')[1]!=JSON.parse(utilCookie.get('user')).user_id) {
            return alert('no earnings found');
        }

        $("#earnings").html(earnings[1]);
        $("#clicks").html(earnings[2]);
        $("#views").html('$'+earnings[3]);
    })
    .fail(function() {
        alert('no earnings found');
    });
});
