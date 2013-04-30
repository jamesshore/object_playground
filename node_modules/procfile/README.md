# node-procfile

A Procfile parser for node.js.

## Installation

### Installing npm (node package manager)
```
  curl http://npmjs.org/install.sh | sh
```

### Installing node-procfile
```
  [sudo] npm install procfile
```

## Usage
There are two simple methods when using `node-procfile`: `.parse()` and `.stringify()`. If you are familiar with using the native `JSON` methods in Javascript, there is nothing new about the API.

``` js
  var fs = require('fs'),
      procfile = require('procfile');
  
  var data = fs.readFileSync('/path/to/procfile').toString(),
      proc = procfile.parse(data);
  
  console.dir(proc)
```

This outputs the results of the procfile parse:

``` js
  {
    web: {
      command: 'node',
      options: [ 'myapp.js', '-p', '80', '--some-option' ]
    },
    worker: {
      command: 'node',
      options: [ 'myworker.js', '--other-option' ]
    }
  }
```

## Run Tests
``` bash
  $ vows --spec
```

#### Author: [Charlie Robbins][0]

[0]: http://nodejitsu.com