#!/usr/bin/env sh

set -e

git init
git add .
git commit -m '更新'

git push

cd -
