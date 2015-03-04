
var all_events = [];

function get_user_info(){

	var user_id;

					userinfo = $.parseJSON(utilCookie.get('user'));
					user_id = userinfo.user_id;
		
		if(user_id === 18){
 				$('.add_events_form').hide();
 		}else if(user_id != 18){ console.log('Not an admin!');
		}else if(user_id == null){
 			console.log('No one logged in');
 		}
			

}

function showHideDiv(){

		if(get_user_info === 0)
			$('.add_events_form').css("display","none");
}



function add_event(){


var data = $('#event_name').val();

	$.ajax({
			
			url: server+'freedom_events/add',
			type: 'post',
			data: {

				'event_title': $('#event_name').val(),
				'start_date' : $('#event_start_date').val(),
				'end_date' : $('#event_end_date').val(),
				'start_time' : $('#event_start_time').val(),
				'end_time' : $('#event_end_time').val(),
				'e_description' : $('#event_desc').val()
			}

	}).success(function (data){
		
			console.log(data);
			console.log('success');
	}).fail(function (data){
			console.log(data);
			console.log('Fail');

	});
		

}

function get_data(){

		$.ajax({
							dataType: 'json',
							url: server+'freedom_events',
							type: 'get',
							data: {
								'event_title': $('#event_name').val(),
								'start_date' : $('#event_start_date').val(),
								'end_date' : $('#event_end_date').val(),
								'start_time' : $('#event_start_time').val(),
								'end_time' : $('#event_end_time').val(),
								'e_description' : $('#event_desc').val()
							}

					}).success(function (data){

							
							all_events.fetched_data = data;
							
					}).fail(function (data){
						console.log(data);
						console.log('failure');
					});


}

function get_events() {

	
	var html = [];	
							html.push('<div id="backButton">' + '<a href="' + origin + 'freedom">' + '<img src="/assets/images/back_button.png"></a>' + '</div>' );

							all_events.fetched_data.forEach(function(item){

								
								html.push('<div id="title">' + item.event_title + '</div>');
								html.push('<div id="startDate">' + item.start_date + '</div>');
								html.push('<div id="endDate">' + item.end_date + '</div>');
								html.push('<div id="startTime">' + item.start_time + '</div>');
								html.push('<div id="endTime">' + item.end_time + '</div>');
								html.push('<div id="e-desc">' + item.e_description + '</div>');
								html.push('<div id="join-event">' + '<button onclick="join_event()">JOIN EVENT</buttton>' + '</div>');
								html.push('<div id="join-link">' + '<p>ENTER JOIN EVENT LINK</p>' + '<input type="text" name="event_link" id="event_link">' + '</div>');

							});

						$('.add_events_form').hide();
						$('#show_events').html(html.join(''));
						$('#editEvent').html('<div id="edit_event">' +  '<button onclick="update_events()"><img src="/assets/images/pencil.jpg">EDIT EVENT</button>' + '</div>');

			
}

function delete_events() {

var title; 

	$.ajax({
			dataType: 'json',
			url: server+'freedom_events/delete/:id',
			type: 'get',
			data: {
				'event_title' : $('#event_name').val()
			}

	}).success(function(data){

		title = data.event_title;

		$('#deleted_event').html(title + 'successfully deleted');


	}).fail(function(){

			$('#deleted_event').html(title + 'was unsuccessfully deleted');

	});

}

function update_events() {

	$.ajax({
			url: server + 'freedom_events/update',
			type: 'POST',
			dataType: 'JSON',
			data: {'event_title': $('#event_name').val(),
					'event_start_date' : $('#event_start_date').val()}

	}).success(function (data){
			console.log(data);
	}).fail(function (data){
			console.log(data);
			console.log('Fail');
		
		
	});

}




function search_events() {

	$.ajax({
			dataType: 'json',
			url: server+'freedom_events/delete/:id',
			type: 'get',
			data: {
				'event_title' : $('#event_name').val()
			}

		}).success(function (data){

		}).fail(function (data){

		});

} 


function get_schedule(){

var eventsHtml = [];

							all_events.fetched_data.forEach(function(item){
								
								eventsHtml.push('<div class="activity">');
								eventsHtml.push('<div class="left">');
								eventsHtml.push('<div id="startEventDate">' + item.start_date + '</div>' + '<div id="endEventDate">' + item.end_date + '</div>');
								eventsHtml.push('<div id="startEventTime">' + item.start_time + '</div>' + '<div id="endEventTime">' + item.end_time + '</div>');
								eventsHtml.push('</div>');
								eventsHtml.push('<div class="center">');
								eventsHtml.push('<div id="eventHeader">' + item.event_title + '</div>' + '<div id="e_status"></div>');
								eventsHtml.push('</div>');
								eventsHtml.push('</div>');

								}); 

								$('#all_schedule').html(eventsHtml.join(''));
								var difference = get_date_diff();
								console.log(difference);
				
}

function edit_events(){ 

	

		$.ajax({
				
				url: server+'freedom_events/add',
				type: 'post',
				data: {

					'event_title': $('#event_name').val(),
					'start_date' : $('#event_start_date').val(),
					'end_date' : $('#event_end_date').val(),
					'start_time' : $('#event_start_time').val(),
					'end_time' : $('#event_end_time').val(),
					'e_description' : $('#event_desc').val()
				}

		}).success(function (data){
			
				console.log(data);
				console.log('success');
		}).fail(function (data){
				console.log(data);
				console.log('Fail');

		});

}

function get_archive(){

	var html = []; 
	var eventStatus = 'Ended';
	
							
							all_events.fetched_data.forEach(function(item){

											 	html.push('<div class="activity">');
											 	html.push('<div class="left">');
												html.push('<div id="startEventDate">' + item.start_date + '</div>' + '<p> - </p>' + '<div id="endEventDate">' + item.end_date + '</div>');
												html.push('<div id="startEventTime">' + item.start_time + '</div>' + '<p> - </p>' + '<div id="endEventTime">' + item.end_time + '</div>');
												html.push('</div>');
												html.push('<div class="center">');
												html.push('<div id="eventHeader">' + item.event_title + '</div>');
												html.push('</div>');
												html.push('<div class="right">');
												html.push('<div id="eventStatus">' + eventStatus + '</div>');
												html.push('</div>');
												html.push('</div>');
							}); 

								$('#archive_schedule').html(html.join(''));

}

function get_date_diff(){

	var status = [];

	var date = new Date();
	var dateLocal = date.toLocaleDateString();

		all_events.fetched_data.forEach(function(item){
		
			var end = item.end_date;

				if(end < dateLocal){ status.push('Ended');}
				else{ status.push('Ongoing'); }
		});

		
}