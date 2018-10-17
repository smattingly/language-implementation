#!/bin/bash

# Deploy obfuscated code from ./dist, via GitHub Pages
javascript-obfuscator . -o ./dist
cp ./index.html ./dist
