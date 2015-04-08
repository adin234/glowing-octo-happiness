define (
	function () {
		return function Filter () {
            return {
                init: function(id, context) {
      
			        $.getJSON('http://gdata.youtube.com/feeds/api/users/' + id.substr(2) +
			            '?fields=yt:username,media:thumbnail,title&alt=json', {},
			            function (e) {
			                $(context).attr('src', e['entry.media$thumbnail.url']);
			            }
			        );

                }
            };
		};
	}
);