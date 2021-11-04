import { app, http } from "./src/server"
import * as WebSocket from "ws"
import Connection_Handler from "./src/sys/handlers"
import { CLIENT } from "./src/sys/handlers/Connection_Handler/types"
require("dotenv").config()

const server: http.Server = http.createServer(app)
const wss: WebSocket.Server = new WebSocket.Server({ server: server })
const PORT = process.env.PORT || 9000

const connection_handler = new Connection_Handler({
	open_state: WebSocket.OPEN,
	wss: wss
})

wss.on("connection", (ws: CLIENT, req: http.IncomingMessage): void => {
	connection_handler.handle(ws, req)
})

server.listen(PORT, (): void => console.log(`Server listening on PORT: ${PORT}`))