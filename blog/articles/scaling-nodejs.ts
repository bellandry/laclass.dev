export default `---
title: Scaling Node.js Architecture
excerpt: How I handled 10k+ concurrent users on CINAF TV using clustering and load balancing strategies.
date: Oct 12, 2024
tag: Engineering
image: https://picsum.photos/800/600?random=10
---

# Scaling Node.js Architecture
## Introduction
When we launched **CINAF TV**, we anticipated traffic, but not the sudden spikes that came with major movie premieres. Our initial monolithic Node.js backend began to choke under the pressure of 2,000 concurrent websocket connections. This is the story of how we refactored for scale.

## The Bottleneck
Node.js is single-threaded. While its event loop is brilliant for I/O operations, it struggles with CPU-intensive tasks like video transcoding or complex aggregation pipelines in MongoDB.

### Identifying the symptoms
1. High Event Loop Lag
2. Memory Leaks in the closure
3. Slow API response times (>500ms)

## The Solution: Clustering & PM2
We immediately moved to utilize all CPU cores available on our AWS EC2 instances.

\`\`\`javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(\`Master \${process.pid} is running\`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Workers can share any TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\\n');
  }).listen(8000);
}
\`\`\`

## Load Balancing
We introduced NGINX as a reverse proxy and load balancer. This allowed us to terminate SSL at the edge and distribute traffic using a Round Robin algorithm.

![Architecture Diagram](https://picsum.photos/1200/600?random=architecture)

## Implementing Caching with Redis
Database queries were the next bottleneck. We implemented a **Write-Through** caching strategy for user sessions and a **Time-to-Live (TTL)** strategy for movie metadata.

## Video Optimization
We used FFmpeg for adaptive bitrate streaming (HLS).

### Code Snippet: FFmpeg
\`\`\`bash
ffmpeg -i input.mp4 \ 
  -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls index.m3u8
\`\`\`

## Conclusion
By splitting the monolith into microservices for Auth, Video, and Billing, and utilizing the strategies above, we stabilized the platform to handle 10k+ concurrent users with sub-100ms latency.
`;