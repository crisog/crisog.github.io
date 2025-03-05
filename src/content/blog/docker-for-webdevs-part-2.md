---
title: "Docker for Web Devs: Part 2 - Multi-stage Builds"
description: "This is the Part 2 of my blog series Docker for Web Devs"
pubDate: "Mar 5 2025"
---

This post is the Part 2 of the Docker for Web Devs series. If you haven't read Part 1, I highly suggest you do.

[Docker for Web Devs: Part 1 - Getting Started](/blog/docker-for-webdevs-part-1/)

## Docker Multi-stage Builds

In Part 1, we created an image for a simple node server in a single stage. This makes the image heavier, because our `node_modules` are being included in the image.

When doing multi-stage builds, we separate the build stage from the runtime stage.

```docker
# --- Build Stage ---
FROM node:22 AS builder

WORKDIR /app

COPY . .

RUN npm ci

# This assumes you are using a bundler like esbuild, 
# and no external dependencies are required other than our index.js
RUN npm run build

# --- Runtime Stage ---
FROM node:22-alpine

WORKDIR /app

# If your app does need production dependencies
# COPY --from=builder /app/package*.json ./
# RUN npm ci --only=production

# Copy only the built files from the build stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

#### What are the advantages?

The build stage uses a full `node:22` image because it provides all the tools and dependencies required to compile or prepare our application. 

The runtime stage uses `node:22-alpine` because we don't need dev/build dependencies. So the resulting image is much lighter than the full node:22 image.

This means our multi-stage build is both **flexible** & more **efficient**, because you can have different environments for building versus running the app & the resulting image is **lighter**.

Let’s talk numbers. A single-stage build using `node:22` might weigh in at 1GB, thanks to `node_modules` and extra dependencies. Switch to a multi-stage build with `node:22-alpine`, and that could shrink to ~160MB. 

Smaller images mean faster deployments & lower storage costs.


