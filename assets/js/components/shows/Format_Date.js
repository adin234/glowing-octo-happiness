define (
	function () {
		return function Format_Date () {
            return {
                init: function(date) {

			        var now = new Date(date),
			            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			            formattedDate = now.getDate() + '-' +
			                months[now.getMonth()] + '-' +
			                now.getFullYear() + ' ' + now.getHours() +
			                ':' + now.getMinutes();

			        return formattedDate;

                } 
            };
		};
	}
);