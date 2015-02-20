


function showHideDiv(){

		if(!is_admin) 

			$('.add_events_form').css("display","none");

}

function add_event(){


console.log('adding event');
var data = $('#event_name').val();

console.log(data);

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
			console.log(data.e_description);
			console.log(data);
			console.log('success');
	}).fail(function (data){
			console.log(data);
			console.log('Fail');

	});
		

}

function get_events() {

	var eventsHtml = []; 
	var title, startDate, endDate, startTime, endTime, eDesc; 

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

						if(data == 'undefined')	 { $('#show_events').html('No events added');

						}else{

						data.forEach(function(item){

							 title = item.event_title;
							 startDate = item.start_date;
							 endDate = item.end_date;
							 startTime = item.start_time;
							 endTime = item.end_time;
							 eDesc = item.e_description; 
							 console.log(eDesc);
							 console.log(item.event_id);
							 

						});

						$('.add_events_form').hide();
						$('#show_events').html(
								'<div id="title">' + title + '</div>' +
								'<div id="startDate">' + startDate + '</div>' + '-' +
								'<div id="endDate">' + endDate + '</div>' + 
								'<div id="startTime">' + startTime + '</div>' + '-' +
								'<div id="endTime">' + endTime + '</div>' +
								'<div id="e-desc">' + eDesc + '</div>' 
						);

						$('#editEvent').html('<div id="edit_event">' +  '<button onclick="update_events()"><img src="/assets/images/pencil.jpg">EDIT EVENT</button>' + '</div>');
					}

				}).fail(function (data){
						console.log(data);
						console.log('failure');
				});

	console.log('Fetching data ... ');




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

	/*$.ajax({
			dataType: 'json',
			url: server+'freedom_events/search/:keyword',
			type: 'get'
			

	}).success(function (){



	}).fail(function () {


	});
*/
} 



function get_event_status(){

	//get event status 

	//flag - ended - 0, ongoing - 1

	var currentDate = get_current_date(); 

			if(currentDate < eventDate){
				var status = 0; //ended

			}else{
				var status = 1; //ongoing
			}
}


function get_schedule(){

var startDate, endDate, startTime, endTime, eventTitle, eventStatus;

	
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

								data.forEach(function (item){
											 console.log(item.event_title);
											 console.log(item.start_date);
											 console.log(item.end_date);
											 console.log(item.start_time);
											 console.log(item.end_time);

											 eventTitle = item.event_title; 
											 startDate = item.start_date;
											 endDate = item.end_date;
											 startTime = item.start_time; 
											 endTime = item.end_time; 
								}); 

								$('#all_schedule').html(
										'<div class="activity">' + 
										'<div id="startEventDate">' + startDate + '</div>' + '-' + '<div id="endEventDate">' + endDate + '</div>' + 
										'<div id="startEventTime">' + startTime + '</div>' + '-' + '<div id="endEventTime">' + endTime + '</div>' +
										'<div id="eventHeader">' + eventTitle + '</div>' + '<div id="e_status"></div>' +
										'</div>'
								);


					}).fail(function(data){
							$('#all_schedule').html('<div id="error_report"> <p> There are no schedules available </p></div>'); 
					});



			
}

function edit_events(){ 

	console.log('editing event');
	var data = $('#event_name').val();

	console.log(data);

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
				console.log(data.e_description);
				console.log(data);
				console.log('success');
		}).fail(function (data){
				console.log(data);
				console.log('Fail');

		});

}

function get_archive(){





}



var get_fa_data = function(ajaxparam) {

	$.ajax(ajaxparam).success({

	});
}