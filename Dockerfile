FROM node:12.16.2-alpine

ARG BUILD_ENV=development

ENV APP_SOURCE_DIR=/usr/local/src/MyNodeJsProject \
    PATH=$PATH:/usr/local/src/node_modules/.bin

LABEL maintainer="ATL IT Workshop <atlwkspdevs@gmail.com>"

RUN apk --no-cache add bash curl less vim
SHELL ["/bin/bash", "-o", "pipefail", "-o", "errexit", "-u", "-c"]

# Because Docker Compose uses a volume for node_modules and volumes are owned
# by root by default, we have to initially create node_modules here with correct owner.
# Without this Yarn cannot write packages into node_modules later, when running in a container.
RUN mkdir -p "/usr/local/src/node_modules"; chown node "/usr/local/src"; chown node "/usr/local/src/node_modules"
RUN mkdir -p "/usr/local/src/MyNodeJsProject/node_modules"; chown node "/usr/local/src/MyNodeJsProject"; chown node "/usr/local/src/MyNodeJsProject/node_modules"

# Same for Yarn cache folder. Without this Yarn will warn that it's going to use
# a fallback cache dir instead because the one in config is not writable.
RUN mkdir -p "/home/node/.cache/yarn"; chown node "/home/node/.cache/yarn"
RUN mkdir -p "/home/node/.cache/yarn-offline-mirror"; chown node "/home/node/.cache/yarn-offline-mirror"

WORKDIR $APP_SOURCE_DIR/..
# COPY --chown=node package.json yarn.lock $APP_SOURCE_DIR/../
COPY --chown=node package.json $APP_SOURCE_DIR/../

# Build the dependencies into the Docker image in a cacheable way. Dependencies
# are only rebuilt when package.json or yarn.lock is modified.
#
# The project directory will be mounted during development. Therefore, we'll
# install dependencies into an external directory (one level up.) This works
# because Node traverses up the fs to find node_modules.
RUN if [ "$BUILD_ENV" == "production" ]; then \
    npm install \
      --frozen-lockfile \
      --ignore-scripts \
      --no-cache; \
  elif [ "$BUILD_ENV" == "development" ]; then \
    npm install \
      --frozen-lockfile \
      --ignore-scripts \
      --no-cache; \
  fi; \
  # rm package.json yarn.lock
  rm package.json

# For development, we will yarn install on each container start.
# This ensures that we use our Docker development .yarnrc config
# and get any add/changed dependencies without needing a full rebuild.
#
# We are copying in a .yarnrc file that is specific to running within Docker.
# Thus, we don't want it in the main repo because it breaks yarn on the host
# machine. We also don't want it in APP_SOURCE_DIR where docker-compose will
# link in host files, so we create it as the user-level config.
# Note that this will be copied in for a prod build, too, but since
# we already ran yarn install above, it doesn't matter.
COPY --chown=node ./.MyNodeJsProject/yarnrc-docker.template /home/node/.yarnrc

WORKDIR $APP_SOURCE_DIR
COPY --chown=node . $APP_SOURCE_DIR

# Important: Make sure we're the "node" user before we begin doing things because
# our tools use "/home/node" as the HOME dir.
USER node

RUN if [ "$BUILD_ENV" == "production" ]; then \
    yarn build; \
  fi;

CMD ["yarn", "start"]
