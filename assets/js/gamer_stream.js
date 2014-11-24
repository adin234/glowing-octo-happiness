utilLoader.show();
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
        .html(),{twitchid: streamId, number: viewers}))
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
                item.data.link = item.data.link || '';
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

        $.getJSON(server+'streamers/youtube', function(e) {
            e.streamers.forEach(function(item) {
                console.log(item.youtube.id, streamId)
                if(item.youtube.id == streamId) {
                    $('.streamer #about-streamer').html(item.youtube.snippet.description.replace(/(?:\r\n|\r|\n)/g, '<br />'));
                }
            })
        });

        utilLoader.hide();

        $('#tab-2').append(page_data.custom_fields.youtube_activity);

				/*  This where you put your JSON result to be able to access the chat plugin  */
				var userinfo = '';
				var channelinfo = {"id":twitch, "title" : twitch};
		
				//alert(channelinfo.id);
		
				if(utilCookie.get('user').length > 0){
					userinfo = $.parseJSON(utilCookie.get('user'));
					$('#twitchTalk').initChatBox(channelinfo, userinfo);
				} else {
					$('#twitchTalk').initChatBox(channelinfo, userinfo);
				}
		
				$('#twitchTalk').css('background-color','black');
	}

    var result = XBBCODE.process({
        text: page_data.about,
        removeMisalignedTags: false,
        addInLineBreaks: false
    });

    console.log(result);

    $('#about-streamer').html(result.html);

    $('.streamer .streamer-name').html(page_data.custom_title);

    $('#monSched').html($('<p/>', {
        text: page_data.custom_fields.mondaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.mondaySchedule
			|| !page_data.custom_fields.mondaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });
    $('#tueSched').html($('<p/>', {
        text: page_data.custom_fields.tuesdaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.tuesdaySchedule
			|| !page_data.custom_fields.tuesdaySchedule.trim().length) {
            $(this).parent().parent().hide();
        }
    });
    $('#wedSched').html($('<p/>', {
        text: page_data.custom_fields.wednesdaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.wednesdaySchedule
			|| !page_data.custom_fields.wednesdaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });
    $('#thuSched').html($('<p/>', {
        text: page_data.custom_fields.thursdaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.thursdaySchedule
			|| !page_data.custom_fields.thursdaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });
    $('#friSched').html($('<p/>', {
        text: page_data.custom_fields.fridaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.fridaySchedule
			|| !page_data.custom_fields.fridaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });
    $('#satSched').html($('<p/>', {
        text: page_data.custom_fields.saturdaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.saturdaySchedule
			|| !page_data.custom_fields.saturdaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });
    $('#sunSched').html($('<p/>', {
        text: page_data.custom_fields.sundaySchedule
    })).promise().done(function(e){
        if(!page_data.custom_fields.sundaySchedule
			|| !page_data.custom_fields.sundaySchedule.trim().length) {

            $(this).parent().parent().hide();
        }
    });

    $('#streamArea').mCustomScrollbar({
      theme:"inset-2",
    });
});

var viewers;

$.getJSON(server+'get_views/'+twitch, function(e) {
    if(e && e.stream && e.stream.viewers) {
        viewers = e.stream.viewers;
        $('#twitchStream .views').html(e.stream.viewers+' Views');
        utilLoader.hide();
    }
});

var toggleChat = function() {
    var advertisementContainer = $('#advertisement-container');
    var twitchContainer = $('#twitch-container');
    var size = advertisementContainer.attr('data-status');
    var toggleButton = advertisementContainer.children('.minify-advert');

    if(size !== 'full') {
        twitchContainer.height(
            twitchContainer.parent().height()
            -250
        );

        advertisementContainer
            .css('overflow', 'auto')
            .css('height', '')
            .attr('data-status', 'full');

        twitchContainer.height(
            twitchContainer.parent().height()
            -250
        );

        toggleButton.html('增大');

    } else {
        advertisementContainer
            .css('overflow', 'hidden')
            .css('height', '100')
            .attr('data-status', 'minified');

        twitchContainer.height(
            twitchContainer.parent().height()
            -100
        );

        toggleButton.html('縮小');
    }

    advertisementContainer.show();
}
