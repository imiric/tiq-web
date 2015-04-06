tiq-web
=======

This is a web UI for [tiq](https://github.com/imiric/tiq).

It provides all of the features of the command-line tool, but in a
user-friendly web interface.


Setup
-----

Install [Meteor](http://docs.meteor.com/#/full/quickstart).

Run:

    $ cd app
    $ meteor


Usage
-----

TBD


Tests
-----

Install development dependencies:

    $ npm install

Then, to run the acceptance tests using Firefox (recommended) (the following
instructions assume a remote Firefox installation):

1. Download the latest Selenium server from
[here](http://selenium-release.storage.googleapis.com/index.html). At the
moment, this is 2.45, so you would download
`selenium-server-standalone-2.45.0.jar`.

2. Assuming you've installed a
[JRE](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)
already, start Selenium with:

        $ java -jar selenium-server-standalone-2.45.0.jar -port 4444

    (The `-port` argument is optional, since 4444 should be the default.)

3. Finally, run the Nightwatch test suite with:

        $ gulp test:firefox

Alternatively, to run the acceptance tests using PhantomJS (not recommended,
as some tests fail inexplicably), run:

    $ gulp test:phantomjs

No additional configuration is needed, since
[gulp-nightwatch-headless](https://www.npmjs.com/package/gulp-nightwatch-headless)
already installs its own Selenium and PhantomJS packages.


License
-------

[MIT](LICENSE)
