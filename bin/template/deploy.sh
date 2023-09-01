#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 查找包含.git目录的文件夹并执行git pull命令
find . -type d -name '.git' -execdir sh -c 'cd {} && cd .. && echo "Pulling {}" && git pull' \;

# 打包

npm run build
