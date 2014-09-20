page_data = $.parseJSON(page_data);
$(function() {
    $(".bxslider").bxSlider({
		infiniteLoop: false,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 298,
	});
	$(".tabs").tabslet({
		animation: true,
	});
    $('#twitchStream').html(template($('#twitch-stream-tpl').html(),{twitchid: twitch}));
    $('#twitchTalk').html(template($('#twitch-chat-tpl').html(),{twitchid: twitch}));
});
