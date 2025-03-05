---
title: "Docker for Web Devs: Part 2 - Optimizing Builds with Layer Caching"
description: "This is the Part 2 of my blog series Docker for Web Devs"
pubDate: "Mar 6 2025"
---

This post is the Part 2 of the Docker for Web Devs series. If you haven't read the previous parts, check them out first:

[Docker for Web Devs: Part 1 - Getting Started](/blog/docker-for-webdevs-part-1/)

## Understanding Docker Layer Caching

In our previous example, we've created a working Dockerfile, but it is not optimized. Docker builds images in layers, with each instruction creating a new layer. When you rebuild an image, Docker can reuse unchanged layers from its cache.

Think of Docker images like a LEGO structure, where each instruction in your Dockerfile adds a new brick to the stack:

- **Base Image Layer**: The `FROM` instruction provides the foundation plate.

- **Filesystem Changes**: Instructions like `RUN`, `COPY`, and `ADD` stack new LEGO bricks on top.

- **Metadata Layers**: Instructions like `EXPOSE`, `ENV`, and `CMD` are like decorative pieces that don't change the structure but add details

The crucial part is that Docker can only replace bricks from the top down. If you change a brick in the middle of your structure, Docker must rebuild everything above it, even if those higher bricks haven't changed themselves.

<img src="/cache/top-down.svg" alt="Docker layers are built from top to bottom, like stacking LEGO bricks" style="width:200px; margin: 0 auto; display: block;"/>

### Cache Invalidation
Let's look at our previous Node.js Dockerfile from Part 1:

```docker
FROM node:22-alpine

WORKDIR /app

# We copy everything at once
COPY . .

# Then install dependencies
RUN npm ci
```

#### What happens if we make a code change?

<img src="/cache/invalidation.svg" alt="When a code change happens, Docker invalidates the COPY layer and all subsequent layers" style="width:350px; margin: 0 auto; display: block;"/>

After making a source code change, our `COPY` instruction cache gets invalidated. And that forces the `RUN` instructions to be invalidated as well which results in the packages being installed all over again.

This is not optimal and extremely inefficient.

### Build Optimization

How can we optimize our image?

In our particular case, what we can do is the following:

```docker
FROM node:22-alpine

WORKDIR /app

# Copy dependency files first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Then copy application code
COPY . .
```

If you made the changes above, this is how Docker process its layer cache:

<img src="/cache/optimization.svg" alt="Docker layer caching in action - dependencies are cached while code changes trigger selective rebuilds" style="width:400px; margin: 0 auto; display: block;"/>

This is much better as now, unless your dependencies change, Docker will use cache for those layers and the build will be much faster!

#### Visualizing the Difference

<div class="overflow-x-auto">
  <table class="w-full border-collapse border">
    <thead>
      <tr class="bg-gray-100">
        <th class="text-center p-4 border">Action</th>
        <th class="text-center p-4 border">Original Dockerfile</th>
        <th class="text-center p-4 border">Optimized Dockerfile</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center p-4 border">First time build<br/><span class="text-gray-600">(Fresh install)</span></td>
        <td class="text-center p-4 border bg-yellow-50">45s<br/><span class="text-gray-600">Full build</span></td>
        <td class="text-center p-4 border bg-yellow-50">45s<br/><span class="text-gray-600">Full build</span></td>
      </tr>
      <tr>
        <td class="text-center p-4 border">Modify source code<br/><span class="text-gray-600">(Change app.js)</span></td>
        <td class="text-center p-4 border bg-red-50">45s<br/><span class="text-gray-600">Reinstalls everything</span></td>
        <td class="text-center p-4 border bg-green-50">5s ✨<br/><span class="text-gray-600">Uses cached dependencies</span></td>
      </tr>
    </tbody>
  </table>
</div>

<br/>

---

Want to make your Docker images even smaller and more secure? Learn about multi-stage builds in Part 3.

➡️ [Docker for Web Devs: Part 3 - Multi-stage Builds](/blog/docker-for-webdevs-part-3/)
