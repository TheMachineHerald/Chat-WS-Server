class Socket_Close {
	private wss: WebSocketServer

	public constructor(wss: WebSocketServer) {
		this.wss = wss
		this.log_close = this.log_close.bind(this)
		this.broadcast = this.broadcast.bind(this)
		this.handle = this.handle.bind(this)
	}

	public log_close(msg: HANDLER_MESSAGE_CLOSE): void {
		console.log(`[RedPill][${msg.ws.id}] left the matrix...`)
		console.log(`[code]: ${msg._code}`)
		console.log(`[reason]: ${msg._reason}`)
	}

	/**
	 * Should only broadcast to clients that share the same
	 * server or are mutual friends.
	 */
	public broadcast(msg: HANDLER_MESSAGE_CLOSE): void {
		const parsed_id = parseInt(msg.ws.id.split("-")[1])
		const message: Object = {
			event: "USER_LOGOUT",
			payload: {}
		}
		
		this.wss.clients.forEach((client: CLIENT_SOCKET): void => {
			try {
				let match = false

				if (client.readyState === msg.open_state) {
					client.friends_cache.forEach(f => {
						if (f.id === parsed_id) {
							match = true
						}
					})

					msg.ws.user_cache[0].servers.forEach(s => {
						if (
							s.server_id === client.user_cache[0].selected_server_id
							&& parsed_id !== client.user_cache[0].id
						) {
							match = true
						}
					})

					if (match) {
						client.send(JSON.stringify(message))
					}
				}
			} catch(e) {
				console.log(e)
			}
		})
	}

	public handle(msg: HANDLER_MESSAGE_CLOSE): void {
		this.log_close(msg)
		this.broadcast(msg)
	}
}

export default Socket_Close
