/**
 * Created by syzer on 4/16/2014.
 */
module.exports = function expressService(app, port, cookieParser, compression, http/*, validator*/, session, static_) {
    'use strict';

    var expressApp;
    var server;
//    var isValidMethod = validator.isValidMethod;

    return {

        getApp: function () {
            return expressApp;
        },

        getServer: function () {
            return server;
        },

        registerRouteHandler: function (route, handler, methodArr) {
            var methods = methodArr || ['GET'];

            if (!handler) {
                throw new Error('Handler invalid');
            }
            methods.forEach(function (method) {
//                if (!isValidMethod(method)) {
//                    throw new Error('Method ' + method + ' disallowed!');
//                }
                console.log('Registered ', method, ' route', route,
                    'handler with context: ', typeof handler
                );
                if (method === 'GET') {
                    expressApp.get(route, handler);
                }
                if (method === 'POST') {
                    expressApp.post(route, handler);
                }
            });
        },

        setup: function () {
            app.use(cookieParser);
            app.use(compression);
            app.use(session);
            app.use('/static', static_);

            server = http
                .createServer(app)
                .listen(port);
            console.log('Listening on https://0.0.0.0:' + port);

            expressApp = app;
        },

        registerErrors: function () {
            function NotFound(msg) {
                this.name = 'NotFound';
                Error.call(this, msg);
                Error.captureStackTrace(this, arguments.callee);
            }

            expressApp.use(function (err, req, res, next) {
                console.error(err);
                if (err instanceof NotFound) {
                    res.render('404.jade', { locals: {
                        title: '404 - Not Found',
                        description: '',
                        author: '',
                        analyticssiteid: 'XXXXXXX'
                    }, status: 404 });
                } else {
                    res.render('500.jade', { locals: {
                        title: 'The Server Encountered an Error',
                        description: '',
                        author: '',
                        analyticssiteid: 'XXXXXXX',
                        error: err
                    }, status: 500 });
                }
            });
        }
    };
};
