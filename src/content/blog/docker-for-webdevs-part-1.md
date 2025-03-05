---
title: "Docker for Web Devs: Part 1"
description: "This is the Part 1 of my blog series Docker for Web Devs"
pubDate: "Mar 5 2025"
---

## Docker

In very few words, it allows you to package your app with its dependencies included so it can run on any computer, as long as Docker is installed in it.

This simplifies a lot for us. But, what do we have to do to package our app?

### Containers

Docker introduces the concept of "container" to refer to the environment where your app runs. A container is no more than an isolated operating system, which runs in your computer.

So you can have a linux instance running in your MacOS laptop with ease. Pretty much anything.

## Images

To be able to spawn these isolated environments in our computer, we need to create a Docker "image".

An image in Docker is what we call the result of packaging your app with its base OS and its corresponding dependencies.

To create a docker image, we must define what's gonna be included in it. We do it by creating a Dockerfile.

But we first need to install Docker. Since this depends on what OS you use for development, I'll leave a link to the Docker docs.

https://docs.docker.com/get-started/get-docker/

### Anatomy of a Dockerfile

Let's assume we have a simple Node.js server with this structure:

```bash
node-server/
├── node_modules/
├── src/
│   └── index.js
├── Dockerfile
├── package.json
└── package-lock.json
```

The image would look like this:

```docker
# Base image selection (the OS where your app will run inside the container)
FROM debian:stable-slim

# Install system dependencies - components needed at the OS level
# to provide the Node.js runtime environment
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# This is the directory where we will put our app inside our debian OS.
WORKDIR /app

# In this case, we want to copy all of our app files
# The left side is host's path - where the Docker images is being built
# The right side, defaults the WORKDIR directory (/app in this case)
# The dot indicates ALL files from given path
COPY . .

# Install application dependencies - the specific npm packages
# that your particular Node.js project needs to function
RUN npm ci --omit=dev

# This is the port the application will listen on (not mandatory)
EXPOSE 3000

# Define the command to execute when the container starts
# this command runs on WORKDIR directory (/app)
CMD ["node", "src/index.js"]
```

### .dockerignore

Before building our image, we need to make sure only desired files are included in it.

So besides our Dockerfile, we'll need a `.dockerignore` file. You can think of it as `.gitignore` but for Docker.

In our example, this is what it would look like:

```
node_modules
```

Since we are do `npm install ci` during the build process, we don't want to add any existing `node_modules` that might be in our directory when building the image.

### Building our Docker image

To be able to create the image so we can distribute/deploy our app, we run the following command:

```bash
docker build -t "image_name" .
```

This will effectively build your image, and it will be saved in your computer.

You can check it by running:

```bash
$ docker image list
REPOSITORY                    TAG       IMAGE ID       CREATED          SIZE
node-server                   latest    603a98bd2bd9   19 seconds ago   327MB
```

### Seasoned Docker images

For the sake of understanding what Docker does, I intentially did not use an image that came with Node pre-installed.

However, it is an option to use an official image that comes with the preinstalled OS level dependencies you need for your app; which results in a smaller Dockerfile.

I will leave some examples below:

<details>
  <summary>Node.js</summary>
  
```docker
# Official node image using Alpine Linux and pre-installed Node v22
FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "src/index.js"]
```
</details>


<details>
  <summary>Bun</summary>

```docker
# Official node image using Alpine Linux and pre-installed Bun v1
FROM oven/bun:1-alpine
WORKDIR /usr/src/app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY . .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "index.ts"]
```

</details>