class Socket_Open {
	static EVENT: string
	private wss: WebSocketServer
	
	public constructor(wss: WebSocketServer) {
		this.wss = wss
		this.broadcast = this.broadcast.bind(this)
		this.hydrate_client = this.hydrate_client.bind(this)
		this.handle = this.handle.bind(this)
	}

	public hydrate_client(msg: HANDLER_MESSAGE<SOCKET_OPEN_PAYLOAD>): void {
		const parsed_id = msg.ws.id.split("-")[1] || null
		msg.ws.selected_server_id = msg.payload.selected_server_id
		msg.ws.selected_channel_id = msg.payload.selected_channel_id
		msg.ws.cache.push(msg.payload)
		console.log("[RED-PILL][HYDRATED]: ", parsed_id, msg.payload)
		this.broadcast(msg)
	}

	public broadcast(msg: HANDLER_MESSAGE<SOCKET_OPEN_PAYLOAD>): void {
		const message: Object = {
			event: "CONNECTED_USER",
			payload: msg.payload
		}

		this.wss.clients.forEach((client: CLIENT_SOCKET): void => {
			if (client.readyState === msg.open_state) {
				client.cache.forEach(s => {
					if (
						/**
						 * Should only broadcast to clients that share the same
						 * server or are mutual friends.
						 */
						s.selected_server_id === msg.payload.selected_server_id &&
						s.id !== msg.payload.id
					) {
						client.send(JSON.stringify(message))
					}
				})
			}
		})
	}

	public handle(msg: HANDLER_MESSAGE<SOCKET_OPEN_PAYLOAD>): void {
		this.hydrate_client(msg)
	}
}

Socket_Open.EVENT = "CLIENT_SOCKET_OPEN"
export default Socket_Open