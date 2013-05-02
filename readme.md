Object Playground
=============

Object Playground is a tool for visualizing and experimenting with JavaScript object relationships. It's [online at objectplayground.com](http://www.objectplayground.com). Object Playground is a project from [Let's Code: Test-Driven JavaScript](http://www.letscodejavascript.com), a screencast series focused on professional, rigorous JavaScript development. Created by James Shore.

This repository contains the source code for Object Playground.


Browser Support
---------------

This program has been tested against the browsers listed at the top of `Jakefile.js`. At the time of this writing, the following browsers are known to work. Other modern browsers are likely to work as well.

* Chrome 26
* Firefox 20
* IE 10
* Safari 6.0 (Mac)
* Safari 6.0 (iOS)

The following browsers are known to *not* work:

* IE 8: Does not support SVG
* IE 9: Lacks the Int32Array type used by Viz.js. A polyfill was attempted, but resulted in an "out of memory" error.


Building and Testing
--------------------

Before building for the first time:

1. Install [Node.js](http://nodejs.org/download/). (Note: The included version of Jake may not work with Node.js v0.10.x.)
2. Download the source code by cloning the git repository: `git clone https://github.com/jamesshore/object_playground`.
3. All commands must run from the root of the source tree: `cd <directory>`.
4. To cause the build to fail unless certain browsers are tested, edit `TESTED_BROWSERS` at the top of `Jakefile.js`.


To build (and test):

1. Run `./jake.sh karma` (Unix/Mac) or `jake karma` (Windows) to start the Karma server.
2. Point the browsers you want to test against at the URL `http://localhost:8080`.
3. Run `./jake.sh` (Unix/Mac) or `jake` (Windows) every time you want to build and test. Use the `loose=true` option to relax the Node.js and browser version requirements.

Note: At the time of this writing, the source code has not been confirmed to build on Windows.


Development and Integration
-------------

This repository contains two branches:

* `master` is for development.
* `integration` is guaranteed to build and pass all tests.


To integrate:

1. Get to a clean build and commit your code to the master branch.
2. Run `./integrate` (Unix/Mac) or `integrate` (Windows) to test the master branch and merge it into the integration branch.


Deploying to Heroku
-------------------

Before deploying for the first time:

1. Follow the steps for "Continuous Integration" first.
3. Sign up for a [Heroku account](https://api.heroku.com/signup).
2. *On the integration machine,* install the [Heroku Toolbelt](https://toolbelt.heroku.com/).
4. Create a Heroku application: `heroku create <app_name>`.
5. Change `PRODUCTION_URL` at the top of `deploy.jakefile` to `http://<app_name>.herokuapp.com`.
6. Update `package.json` to match your installed versions of Node and npm. (Use `node --version` and `npm --version` to get the version numbers.)

To deploy:

1. *On the integration machine,* run `./deploy.sh latest` (Unix/Mac) or `deploy latest` (Windows) to deploy the integration branch to Heroku. The script will tag your git repository with `deploy-<timestamp>` if the deploy succeeds and passes the smoke tests.

In case of a bad deployment:

1. *On the integration machine,* run `./deploy.sh rollback` (Unix/Mac) or `deploy rollback` (Windows) to do a band-aid rollback to the previous Heroku deployment. This rollback won't "stick", so you'll need to deploy new code soon.
2. If you aren't able to deploy new code right away, choose a previous, good commit to deploy. `gitk` and the `deploy-<timestamp>` tags may be helpful here.
3. Check out the commit: `git checkout <commit_id>`
4. Run `./deploy.sh head` (Unix/Mac) or `deploy head` (Windows) to deploy the commit to Heroku. As above, the script will tag the git repository with `deploy-<timestamp>` if the deploy succeeds and passes the smoke tests.
