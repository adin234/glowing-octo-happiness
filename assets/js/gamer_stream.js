$(function() {
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
	});
    $('#twitchStream').html(template($('#twitch-stream-tpl')
    	.html(),{twitchid: twitch}));
    $('#twitchTalk').html(template($('#twitch-chat-tpl')
    	.html(),{twitchid: twitch}));

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
});
