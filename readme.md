Object Playground
=============

Object Playground is a tool for visualizing and experimenting with JavaScript object relationships. It's [online at objectplayground.com](http://www.objectplayground.com). Object Playground is a project from [Let's Code: Test-Driven JavaScript](http://www.letscodejavascript.com), a screencast series focused on professional, rigorous JavaScript development. Created by James Shore.

This repository contains the source code for Object Playground.


Browser Support
---------------

Object Playground has been tested against the browsers listed at the top of `Jakefile.js`. At the time of this writing, the following browsers are known to work. Other modern browsers are likely to work as well.

* Chrome 40
* Firefox 36
* IE 10
* Safari 8.0 (Mac)
* Safari 7.0 (iOS)

The following browsers are known to *not* work:

* IE 9: Lacks the Int32Array type used by Viz.js. A polyfill was attempted, but resulted in an "out of memory" error.
* IE 8: Does not support SVG, lacks Int32Array type.


Building and Testing
--------------------

Before building for the first time:

1. Install [Node.js](http://nodejs.org/download/).
2. Download the source code by cloning the git repository: `git clone https://github.com/jamesshore/object_playground`.
3. All commands must run from the root of the source tree: `cd <directory>`.
4. To cause the build to fail unless certain browsers are tested, edit `TESTED_BROWSERS` at the top of `Jakefile.js`.


To build (and test):

1. Run `./jake.sh karma` (Unix/Mac) or `jake karma` (Windows) to start the Karma server.
2. Point the browsers you want to test against at the URL `http://localhost:8080`.
3. Run `./jake.sh` (Unix/Mac) or `jake` (Windows) every time you want to build and test. Use the `loose=true` option to relax the Node.js and browser version requirements.

Note: At the time of this writing, the source code has not been confirmed to build on Windows.


To test manually:

1. Open `src/index.html` in a browser.


Development and Integration
---------------------------

This repository contains two branches:

* `master` is for development.
* `integration` is guaranteed to build and pass all tests.


To integrate:

1. Get to a clean build and commit your code to the master branch.
2. Run `./integrate.sh` (Unix/Mac) or `integrate` (Windows) to test the master branch and merge it into the integration branch.


Deploying
---------

Before deploying for the first time:

1. Install rsync or make sure it's available on the path
2. Modify `PRODUCTION_HOST` at top of `deploy.jakefile` to match production host (using `username@host` format)
3. Modify `PRODUCTION_DIR` at top of `deploy.jakefile` to be the directory on the host where your public web content goes

To deploy:

1. Run `./deploy.sh latest` (Unix/Mac) or `deploy latest` (Windows) to integrate the master branch and deploy it. The script will tag your git repository with `deploy-<date>-<timestamp>` if the deploy succeeds.

In case of a bad deployment:

1. Choose a previous, good commit to deploy. `gitk --all` and the `deploy` tags may be helpful here.
2. Check out the commit: `git checkout <commit_id>`
3. Run `./deploy.sh head` (Unix/Mac) or `deploy head` (Windows) to deploy the commit. As above, the script will tag the git repository if the deploy succeeds.
