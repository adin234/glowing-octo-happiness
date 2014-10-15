$(function() {
    var information_masonry = function() {
        $('#tab-2').width($('#streamArea aside').width()-$('.streamer').width() - 40);

        var msnry = new Masonry( '#tab-2', {
          columnWidth: 350,
          itemSelector: '.panel'
        });
    }

    page_data = $.parseJSON(page_data);
    $(".bxslider").bxSlider({
		infiniteLoop: false,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 298,
	});

	$(".tabs").tabslet({
		animation: true,
	}).on('_after', function(e) {
		if(e.target.id == 'tab-2') {
            information_masonry();
		}
	});

     $('body').on('change', '#view-resize', function(e) {
        var size = $(this).val();
        $('body').removeClass('x1 x2 x3').addClass(size);
    });

    var streamType = twitch.substr(0,2);
    var streamId = twitch.substr(2);

    if(streamType == 'TW') {
        $('#twitchStream').replaceWith(template($('#twitch-stream-tpl')
        .html(),{twitchid: streamId}));
        $('#twitchTalk').html(template($('#twitch-chat-tpl')
            .html(),{
                twitchid: streamId,
                advert: page_data.custom_fields 
                    && page_data.custom_fields.advertisement
            }
        ));

        $.getJSON(server+'scrape/'+streamId, function(e) {
            e.forEach(function(item) {
                item.data.html = item.html_description;
                $('#tab-2').append(template($('#panelTpl').html(), item.data));
            });
            setTimeout(function(){
                $('img[src=""]').hide();
            },100);
        });
    }

    if(streamType == 'YT') {
        $('#twitchStream').replaceWith(template($('#youtube-stream-tpl')
        .html(),{youtubeid: streamId}));
    }

    $('#about-streamer').html(page_data.about);

    $('.streamer .streamer-name').html(page_data.custom_title);

    $('#monSched').html($('<p/>', {
        text: page_data.custom_fields.mondaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.mondaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });
    $('#tueSched').html($('<p/>', {
        text: page_data.custom_fields.tuesdaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.tuesdaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });
    $('#wedSched').html($('<p/>', {
        text: page_data.custom_fields.wednesdaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.wednesdaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });
    $('#thuSched').html($('<p/>', {
        text: page_data.custom_fields.thursdaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.thursdaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });
    $('#friSched').html($('<p/>', {
        text: page_data.custom_fields.fridaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.fridaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });
    $('#satSched').html($('<p/>', {
        text: page_data.custom_fields.saturdaySchedule
    })).promise().done(function(e){
        console.log(page_data.custom_fields.saturdaySchedule.trim().length);
        if(!page_data.custom_fields.saturdaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });
    $('#sunSched').html($('<p/>', {
        text: page_data.custom_fields.sundaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.sundaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });

    $('#streamArea').mCustomScrollbar({
      theme:"inset-2",
    });
});

var resizeChat = function(size) {
    if(page_data.custom_fields 
        && page_data.custom_fields.advertisement) {
        if(size === 'full') {
            $('#advertisement-container')
                .css('overflow', 'auto')
                .css('height', '')
                .show();
            $('#twitch-container').height(
                $('#twitch-container').parent().height()
                -$('#advertisement-container').height()
            );
        } else {
            $('#twitch-container').height(
                $('#twitch-container').parent().height()
                -100
            );
            $('#advertisement-container')
                .css('overflow', 'hidden')
                .css('height', '100');
        }
    }
}
