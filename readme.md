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
2. Download and unzip [the source code](https://github.com/jamesshore/object_playground/archive/master.zip) into a convenient directory.
3. All commands must run from the root of the source tree: `cd <directory>`.
4. To cause the build to fail unless certain browsers are tested, edit `TESTED_BROWSERS` at the top of `Jakefile.js`.

To build (and test):

1. Run `./jake.sh karma` (Unix/Mac) or `jake karma` (Windows) to start the Karma server.
2. Point the browsers you want to test against at `http://localhost:8080`.
3. Run `./jake.sh` (Unix/Mac) or `jake` (Windows) every time you want to build and test. Use the 'loose=true' option to relax the Node.js and browser version requirements.

Note: At the time of this writing, the source code has not been confirmed to build on Windows.


Integration
-----------

This repository contains an "integration" branch which is guaranteed to build and pass all tests.

This repository is set up for single-user integration.

To set up continuous integration for a team of developers:

1. Choose a machine to be the integration machine.
2. Follow the steps for "Building and Testing" on the integration machine.
3. Run `git init`, `git add .`, and `git commit -a -m "Initial Commit"` to initialize the git repository.
4. Run `git checkout -b integration` to create an integration branch.

To set up each development workstation:

1. Choose an easy-to-type name for the development workstation, such as `dev1`. Put a label on the machine with this name so you don't forget it--you'll use it when you integrate.
2. *On the integration machine*, run `git branch <name>` create a branch for the development workstation.
3. Clone the integration machine's repository to the development workstation. (The steps here depend on your network configuration. Talk to your local Git expert.)
4. *On the development workstation,* run `git checkout <name>` to switch to the development branch.
5. Now you can build and test as described above.

To integrate:

1. On the development workstation, get to a clean build and commit your code.
2. Run `./ci.sh pull` (Unix/Mac) or `ci pull` (Windows) to integrate the latest changes from the integration machine.
3. Run the build to make sure the integration didn't break anything.
4. Run `./ci.sh push[<name>]` (Unix/Mac) or `ci push[<name>]` (Windows) to push your changes to your workstation's branch on the integration machine.
5. *On the integration machine,* run `./ci.sh promote[<name>]` (Unix/Mac) or `ci promote[<name>]` (Windows) to double-check your build and merge it into the known-good integration branch.
6. Start over on your development machine if anything breaks or if someone else integrates before you're done.


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
