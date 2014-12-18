var page_data;

$.ajax({
    dataType:'jsonp',
    url:server+'favorites',
    crossDomain: true,
    type: 'get',
    async: false
})
.done(function(result) {
	page_data = result;
	$(function() {
		$(document).trigger('load-page');
	});
});