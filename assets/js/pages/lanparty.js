'use strict';

define('lanparty', function(require) {

    var Tabs = require('../components/Tabs/index'),
        lanparty_tab_item = require('./templates/lanparty-tab-item.html'),
        lanparty_tab1 = require('./templates/lanparty-tab1.html'),
        lanparty_tab2 = require('./templates/lanparty-tab2.html'),
        lanparty_tab3 = require('./templates/lanparty-tab3.html'),
        lanparty_tab4 = require('./templates/lanparty-tab4.html'),
        lanparty_right_tabs = require('./templates/lanparty-right-tabs.html');

    // lanparty page
    var main_tab = new Tabs({
        className: 'lanparty_type1',
        template: lanparty_tab_item,
        after_mount: function() {
            $('#container_lanparty').prepend(lanparty_right_tabs);
        }
    });

    var side_tab = new Tabs ({
        className: 'lanparty_type2',
        template: lanparty_tab_item
    });

    side_tab
        .init()
        .addTab('/lanparty_stream_multi', '直播', '直播')
        .addTab('/lanparty/videos', 'LAN PARTY影片頻道', 'LAN PARTY影片頻道')
        .mount($('#container_lanparty'));

    main_tab
        .init()
        .addTab('tab-4-1', '什麼是Lan party', 'AboutLanParty', lanparty_tab1)
        .addTab('tab-4-2', 'Lan party時刻表', 'LanPartySchedule', lanparty_tab2)
        .addTab('tab-4-3', '活動內容', 'LanPartyActivities', lanparty_tab3)
        .addTab('tab-4-4', 'Lan Party活動紀錄', 'Lan Party活動紀錄', lanparty_tab4)
        .mount($('#container_lanparty'));

    require('../components/Footer/index');
    require('../components/Sub_Nav/index');
});

require(['lanparty']);