// Testacular configuration
// Generated on Wed Oct 10 2012 14:10:32 GMT-0700 (PDT)


// base path, that will be used to resolve files and exclude
basePath = '../..';


// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
  'node_modules/expect.js/expect.js',
  'src/client/**/*.js'
];


// list of files to exclude
exclude = [
  
];


// test results reporter to use
// possible values: dots || progress
reporter = 'progress';


// web server port
port = 8080;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
browsers = [];


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
