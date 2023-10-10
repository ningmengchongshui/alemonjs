FROM buildkite/puppeteer

# 设置华为镜像站
RUN sed -i "s@http://ftp.debian.org@https://repo.huaweicloud.com@g" /etc/apt/sources.list &&
    sed -i "s@http://security.debian.org@https://repo.huaweicloud.com@g" /etc/apt/sources.list

# 设置时区
RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
# 设置npm全局镜像
RUN npm config set registry https://registry.npmmirror.com/
# 更新node为最新稳定版
RUN npm i n -g
RUN n lts

# 设置工作目录
WORKDIR /app
# copy文件
COPY ./.npmrc /app/.npmrc
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./index.ts /app/index.ts
# COPY ./config /app/config
COPY ./example /app/example
COPY ./plugins /app/plugins
COPY ./.puppeteerrc.cjs /app/.puppeteerrc.cjs
COPY ./docker.mjs /app/docker.mjs

# 安装中文字体
COPY ./fonts/LXGWWenKai-Light.ttf /usr/share/fonts/truetype/LXGWWenKai-Light.ttf

# 安装项目运行环境
RUN npm i
# 暴露 米游社端口号
EXPOSE 8088
# 运行 node ./docker.mjs
CMD [ "node" ,"./docker.mjs" ]
