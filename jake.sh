#!/bin/sh

[ ! -f node_modules/.bin/jake ] && npm rebuild
node_modules/.bin/jake $*
