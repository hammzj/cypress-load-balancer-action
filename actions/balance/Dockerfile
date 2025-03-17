# See https://medium.com/@aviralsrivastava57/building-a-dockerized-hello-world-node-js-app-with-github-actions-ci-cd-pipeline-1d61a0710bec
ARG NODE_VERSION=20.18.2
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

# Install dependencies by leveraging Docker's caching
# Use bind mounts to package.json and package-lock.json for faster builds
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Switch to a non-root user for running the application
USER node

COPY . .

CMD ["node", "index.js"]
