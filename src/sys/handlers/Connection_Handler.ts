import Connection from "../handler/Connection"
import { http } from "../../server"

class Connection_Handler {
	connection: Connection
	
	constructor(ctx: CONNECTION_CONTEXT) {
		this.connection = new Connection(ctx)
		this.add_client = this.add_client.bind(this)
		this.handle = this.handle.bind(this)
	}

	add_client(ws: CLIENT_SOCKET, req: http.IncomingMessage): void {
		this.connection.create_client(ws, req)
	}

	handle(ws: CLIENT_SOCKET, req: http.IncomingMessage): void {
		this.add_client(ws, req)
	}
}

export default Connection_Handler