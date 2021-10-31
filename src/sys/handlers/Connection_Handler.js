import Clients from "../handler/Clients"

class Connection_Handler {
	constructor(ctx) {
		this.clients = new Clients(ctx)
		this.add_client = this.add_client.bind(this)
		this.handle = this.handle.bind(this)
	}

	add_client(ws, req) {
		this.clients.create_client(ws, req)
	}

	handle(ws, req) {
		this.add_client(ws, req)
	}
}

export default Connection_Handler