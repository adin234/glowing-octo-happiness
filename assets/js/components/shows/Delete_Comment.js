define (
	function () {
		return function Delete_Comment () {
            return {
                init: function(data, context) {


			        var videoId = $('#postComment').attr('data-video'),
			            url = server + 'youtubers/videos/' + videoId + '/comment/' + data + '/delete',
			            // user_id = utilUser.get().user_id,
			            utilUser;

			        $(context).parent().parent().addClass('deletecommentbox');

			        if (confirm('Do you want to permanently delete this comment?') === true) {
			            $.ajax({
			                dataType: 'jsonp',
			                url: url,
			                crossDomain: true,
			                type: 'get'
			            });
			            $(context).parent().parent().remove();
			        }
			        else {
			            $('.deletecommentbox').removeClass('deletecommentbox');
			        }


                }
            };
		};
	}
);