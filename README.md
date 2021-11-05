# Chat-WS-Server

Basic working MVP for WebSocket communications. It handles Chat just fine, but, as of right now, is still handling socket state and lacks fallbacks and proper error handling. 

It is a NAIVE implementation, but the point was to quickly blueprint a stable, scalable baseline to work with while engineering, designing, and developing the entire Frontend/API Server/DB on my own.

There is going to be future integrations with WebRTC and Redis-- perhaps a different Mesage Broker-- for scalability, so there's going to be a lot of breaking changes in the future.

This server was built with NodeJS using [ws](https://www.npmjs.com/package/ws) for the WebSocket implementation and [express](https://www.npmjs.com/package/express) for http routing. My reasons for using both are simple-- both are lightweight, fast, battle tested with minimal abstractions.
