import { app, http } from "./src/server"
import * as WebSocket from "ws"
import Connection_Handler from "./src/sys/handlers"
require("dotenv").config()

const server = http.createServer(app)
const wss = new WebSocket.Server({ server: server })
const PORT = process.env.PORT || 9000

const connection_handler = new Connection_Handler({
	WebSocket: WebSocket,
	wss: wss
})

wss.on("connection", (ws, req) => {
	connection_handler.handle(ws, req)
})

server.listen(PORT, () => console.log(`Server || PORT: ${PORT}`))