@echo off
if not exist node_modules\.bin\jake.cmd call npm rebuild
node_modules\.bin\jake %*
