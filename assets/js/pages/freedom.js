'use strict';

define('freedom', function(require) {

	var Tabs = require('../components/Tabs/index'),
		tab_nav_tpl = require('./templates/freedom-tab-nav.html'),
		tab1_tpl = require('./templates/freedom-tab1.html'),
		tab2_tpl = require('./templates/freedom-tab2.html'),
		tab3_tpl = require('./templates/freedom-tab3.html'),
		main_tab = new Tabs({
			className: 'lanparty_type1 adjust_line_green',
			template: tab_nav_tpl
		});

	main_tab
		.init()
		.addTab('schedule', 'Freedom! 活動時間', 'FreedomSchedule', tab1_tpl)
        .addTab('activities', '活動內容', 'FreedomEvents', tab2_tpl)
        .addTab('archive', 'Freedom!活動紀錄', 'FreedomArchive', tab3_tpl)
        .mount($('#container_lanparty_green'));

    $('#container_lanparty_green').prepend('<hr class="line"/>');

	require('../components/Footer/index');
    require('../components/Sub_Nav/index');
});

require(['freedom']);