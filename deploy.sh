#!/bin/bash
# Deploy obfuscated code from ./dist, via GitHub Pages
javascript-obfuscator ./scripts -o ./dist
cp ./index.html ./dist
git subtree push --prefix dist origin gh-pages
