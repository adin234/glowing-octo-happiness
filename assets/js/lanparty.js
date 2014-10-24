page_data = $.parseJSON(page_data);

$('#lanparty_content').html(page_data.lanparty_what.replace(/\r/g, '<br>').replace(/\n/g, '<br>'));
$('#lanparty_activities').html(page_data.lanparty_activities.replace(/\r/g, '<br>').replace(/\n/g, '<br>'));