
$(function() {
    var streamType = '';
    var streamId = '';

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
		if(e.target.id == 'tab-2' && streamType !== 'YT') {
            information_masonry();
		}
	});

     $('body').on('change', '#view-resize', function(e) {
        var size = $('#view-resize').val();
        $('body').removeClass('x1 x2 x3').addClass(size);
        resize_video_stream();
    });

    function resize_video_stream() {
        var size = $('#view-resize').val();
        if(size == 'x3') {
            $('embed').height($('#streamView').height());
            $('object').height($('#streamView').height());
        } else {
            $('embed').height('100%');
            $('object').height('100%');
        }
    }

    $(window).on('resize', function() {
        resize_video_stream();
    });

    streamType = twitch.substr(0,2);
    streamId = twitch.substr(2);

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

        // utilLoader.hide();
        $('object').height($('#streamView').height());
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
        var found = false;
        var userId = params.user.replace('/', '');

        $.getJSON(server+'streamers/youtube/?user='+userId, function(e) {
            console.log(e);

            var streamerId = '';
            e.streamers.forEach(function(item) {
                found = true;
                streamerId = item.youtube.id;

                $('.streamer #about-streamer').html(item.youtube.snippet.description.replace(/(?:\r\n|\r|\n)/g, '<br />'));
                $('embed').height($('#streamView').height());
            });

            if(found) {
                $('#twitchStream')
                    .replaceWith(template($('#youtube-stream-tpl')
                    .html(),{youtubeid: streamerId}));
            } else {
                $('#twitchStream')
                    .replaceWith('<div id="twitchStream"><img class="offline-placeholder" src="/assets/images/streamer-offline.png"/></div>');

            }

            if(!found) {
                $('aside .streamer').hide();
            }

            $('#tab-2').html(page_data.custom_fields.youtube_activity);
        });

		var userinfo = '';
		var channelinfo = {"id":twitch, "title" : twitch};

		if(utilCookie.get('user').length > 0){
			userinfo = $.parseJSON(utilCookie.get('user'));
			$('#twitchTalk').initChatBox(channelinfo, userinfo);
		} else {
			$('#twitchTalk').initChatBox(channelinfo, userinfo);
		}

		$('#twitchTalk').css('background-color','black');
	}

    if(typeof page_data.about === 'undefined' || !page_data.about.trim().length) {
        $('aside .streamer').hide();
    } else {
        var result = XBBCODE.process({
            text: page_data.about,
            removeMisalignedTags: false,
            addInLineBreaks: false
        });

        $('#about-streamer').html(result.html.replace(/[\n\r]/, '<br/>'));
    }

    $('.streamer .streamer-name').html(page_data.custom_title);

    var countEmpty = 0;

    $('#monSched').html(sched_template(page_data.custom_fields.mondaySchedule))
        .promise().done(function(e){
        if(!page_data.custom_fields.mondaySchedule
			|| !page_data.custom_fields.mondaySchedule.trim().length) {
            countEmpty++;
            $(this).parent().hide();
        }
    });
    $('#tueSched').html(sched_template(page_data.custom_fields.tuesdaySchedule))
        .promise().done(function(e){
        if(!page_data.custom_fields.tuesdaySchedule
			|| !page_data.custom_fields.tuesdaySchedule.trim().length) {
            countEmpty++;
            console.log(2);
            $(this).parent().hide();
        }
    });
    $('#wedSched').html(sched_template(page_data.custom_fields.wednesdaySchedule))
        .promise().done(function(e){
        if(!page_data.custom_fields.wednesdaySchedule
			|| !page_data.custom_fields.wednesdaySchedule.trim().length) {
            countEmpty++;
            console.log(3);
            $(this).parent().hide();
        }
    });
    $('#thuSched').html(sched_template(page_data.custom_fields.thursdaySchedule))
        .promise().done(function(e){
        if(!page_data.custom_fields.thursdaySchedule
			|| !page_data.custom_fields.thursdaySchedule.trim().length) {
            countEmpty++;
            console.log(4);
            $(this).parent().hide();
        }
    });
    $('#friSched').html(sched_template(page_data.custom_fields.fridaySchedule))
        .promise().done(function(e){
        if(!page_data.custom_fields.fridaySchedule
			|| !page_data.custom_fields.fridaySchedule.trim().length) {
            countEmpty++;
            console.log(5);
            $(this).parent().hide();
        }
    });
    $('#satSched').html(sched_template(page_data.custom_fields.saturdaySchedule))
        .promise().done(function(e){
        if(!page_data.custom_fields.saturdaySchedule
			|| !page_data.custom_fields.saturdaySchedule.trim().length) {
            countEmpty++;
            console.log(6);
            $(this).parent().hide();
        }
    });
    $('#sunSched').html(sched_template(page_data.custom_fields.sundaySchedule))
        .promise().done(function(e){
        if(!page_data.custom_fields.sundaySchedule
			|| !page_data.custom_fields.sundaySchedule.trim().length) {
            countEmpty++;
            console.log(7);
            $(this).parent().hide();
        }
    });

    if(countEmpty === 7) {
        $('a[href=#tab-1]').parents('li').hide();
        $('a[href=#tab-2]').trigger('click');
    }
    $('#youtuber-link').attr('href', '/youtuber/?user='+page_data.user_id);
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

var sched_template = function(string) {
    var list = string.split(/<br ?\/?>/).filter(function(e) {
        return e.trim().length;
    }).map(function(e) {
        return e+'<br/>';
        // return $('<li/>', {text:e})[0].outerHTML;
    });

    return $('<li/>', {html:list.join('')})[0].outerHTML;
}

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

        toggleButton.html('縮小');

    } else {
        advertisementContainer
            .css('overflow', 'hidden')
            .css('height', '100')
            .attr('data-status', 'minified');

        twitchContainer.height(
            twitchContainer.parent().height()
            -50
        );

        toggleButton.html('增大');
    }

    advertisementContainer.show();
}

