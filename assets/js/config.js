/* global window */

/**
 * Global configuration
 * Defines global variables
 *
 */
 
(function (window) {
    'use strict';

    /**
     * Environment configuration
     *
     * Create your own configuration by adding your host
     * ex:
     *     {
     *         'localhost:8888': {
     *             server: 'localhost:8888',
     *             origin: 'localhost:8888',
     *             socket_server: 'localhost:3001/',
     *             attachments_server: 'http://community.localhost:3000/zh/',
     *             community: 'http://community.localhost:3000/zh/',
     *             page_maintenance: '/maintenance.html'
     *         }
     *     };
     * You can start the pyhon server using specific port
     *
     *     python AdinHTTPServer.py 8888
     */
    var env = {
            'beta.gamers.tm': {
                server: 'http://api.gamers.tm/',
                origin: 'http://beta.gamers.tm/',
                socket_server: 'http://api.gamers.tm:3001/',
                attachments_server: 'http://community.gamers.tm/zh/',
                community: 'http://community.gamers.tm/zh/',
                page_maintenance: '/maintenance.html'
            },
            'www.gamers.tm': {
                server: 'http://api.gamers.tm/',
                origin: 'http://www.gamers.tm/',
                socket_server: 'http://api.gamers.tm:3001/',
                attachments_server: 'http://community.gamers.tm/zh/',
                community: 'http://community.gamers.tm/zh/',
                page_maintenance: '/maintenance.html'
            },
            'default': {
                server: 'http://api.gamers.tm/',
                origin: window.location.origin,
                socket_server: 'http://api.gamers.tm:3001/',
                attachments_server: 'http://community.gamers.tm/zh/',
                community: 'http://community.gamers.tm/zh/',
                page_maintenance: '/maintenance.html'
            }
        },
        check_env = function () {
            if (env.hasOwnProperty(window.location.host)) {
                use_env(env[window.location.host]);
            }
            else {
                use_env(env['default']);
            }
        },
        use_env = function (env) {
            for (var variable in env) {
                window[variable] = env[variable];
            }
        };

    check_env();
})(window);
