// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'private/src/client/components/jquery/dist/jquery.js',
            'private/src/client/components/angular/angular.js',
            'private/src/client/components/angular-mocks/angular-mocks.js',
            'private/src/client/components/angular-resource/angular-resource.js',
            'private/src/client/components/angular-cookies/angular-cookies.js',
            'private/src/client/components/angular-sanitize/angular-sanitize.js',
            'private/src/client/components/angular-route/angular-route.js',
            'private/src/client/components/angular-bootstrap/ui-bootstrap-tpls.js',
            'private/src/client/components/lodash/dist/lodash.compat.js',
            'private/src/client/components/angular-socket-io/socket.js',
            'private/src/client/components/angular-ui-router/release/angular-ui-router.js',
            'private/src/client/app/app.js',
            'private/src/client/app/app.coffee',
            'private/src/client/app/**/*.js',
            'private/src/client/app/**/*.coffee',
            'private/src/client/components/**/*.js',
            'private/src/client/components/**/*.coffee',
            'private/src/client/app/**/*.jade',
            'private/src/client/components/**/*.jade',
            'private/src/client/app/**/*.html',
            'private/src/client/components/**/*.html'
        ],

        preprocessors: {
            '**/*.jade': 'ng-jade2js',
            '**/*.html': 'html2js',
            '**/*.coffee': 'coffee',
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'private/src/client/'
        },

        ngJade2JsPreprocessor: {
            stripPrefix: 'private/src/client/'
        },

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
