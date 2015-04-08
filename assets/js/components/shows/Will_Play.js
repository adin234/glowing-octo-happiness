define (
	function () {
		return function Will_Play () {
            return {
                init: function() {
      
					return ~window.location.hash.indexOf('video/');

                }
            };
		};
	}
);