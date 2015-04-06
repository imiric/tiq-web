'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    nightwatchHeadless = require( 'gulp-nightwatch-headless' );

// Base directories
var bases = {
  app: 'app',
  config: 'config'
};

var nightwatchConfig = {
  nightwatch: {
    tempDir: '/tmp',
    config: {
      "src_folders": [
        "app/tests/nightwatch"
      ],
      "output_folder": "app/tests/nightwatch/.report",
      "selenium": {
        "host" : "localhost",
        "port": 4444
      },
      "test_settings": {
        "default": {
          "launch_url": "http://localhost:3000",
          "pathname": "/wd/hub",
          "selenium_host": "localhost",
          "selenium_port": 4444,
          "silent": true,
          "disable_colors": false,
          "firefox_profile": false,
          "ie_driver": "",
          "screenshots": {
            "enabled": false,
            "path": ""
          },
          "desiredCapabilities": {
            "browserName": "phantomjs",
            "javascriptEnabled": true,
            "acceptSslCerts": true
          }
        }
      }
    }
  },
  selenium: {
    port: 4444
  },
  httpserver: {
    disable: true
  }
};

// Acceptance Tests
gulp.task('test:phantomjs', function() {
  return gulp.src('')
    .pipe(nightwatchHeadless(nightwatchConfig))
    .on('error', gutil.log);
});

// Some tests fail on PhantomJS, so test with Firefox too.
gulp.task('test:firefox', function() {
  nightwatchConfig.selenium.disable = true;
  nightwatchConfig.phantom = {disable: true};
  nightwatchConfig.nightwatch.config.test_settings.default
    .desiredCapabilities.browserName = 'firefox';
  return gulp.src('')
    .pipe(nightwatchHeadless(nightwatchConfig))
    .on('error', gutil.log);
});
