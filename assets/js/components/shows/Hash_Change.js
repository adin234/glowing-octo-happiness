define (
	[
		'components/shows/Filter_Action'
	],
	function (
		Filter_Action
	) {
		return function Show_Playlist () {
            return {
                init: function(page_data) {
                    
                    var filterAction = new Filter_Action();
                	var hash;

					$(document).on('load-page', function(){
					    $(window).on('hashchange', function () {

					        hash = window.location.hash.replace('#!/', '');

					        if (!hash && page_data.playlists.length) {
					            window.location.hash = '#!/playlist/' + page_data.config.playlist;
					        }
					        hash = hash.split('/');
					        filterAction.init(hash.shift(), hash);
					    });
					});

                }
            };
		};
	}
);