class Socket_Open {
	constructor(wss) {
		this.wss = wss
		this.broadcast = this.broadcast.bind(this)
		this.hydrate_client = this.hydrate_client.bind(this)
		this.handle = this.handle.bind(this)
	}

	hydrate_client(msg) {
		const parsed_id = msg.ws.id.split("-")[1] || null
		msg.ws.cache.push(msg.payload)
		console.log("[CLIENT HYDRATED: ", parsed_id, msg.payload)
		this.broadcast(msg)
	}

	/**
     * @param msg Includes the client payload, socket open state status, and
     *            the client websocket instance. 
     */
	broadcast(msg) {
		const message = {
			event: "CONNECTED_USER",
			payload: msg.payload
		}
		this.wss.clients.forEach(client => {
			if (client.readyState === msg.open_state) {
				client.cache.forEach(s => {
					if
					(
					/**
                     * Should only broadcast to clients that share the same
                     * server or are mutual friends.
                     */
						s.server_id === msg.payload.server_id &&
                        s.id !== msg.payload.id
					) {
						console.log("[NEBUCHADNEZZAR] Client Hydrated: ", msg.payload)
						client.send(JSON.stringify(message))
					}
				})
			}
		})
	}

	handle(msg) {
		this.hydrate_client(msg)
	}
}

Socket_Open.EVENT = "CLIENT_SOCKET_OPEN"
export default Socket_Open