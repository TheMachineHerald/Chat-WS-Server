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

	public broadcast(msg: HANDLER_MESSAGE_CLOSE): void {
		const message: Object = {
			event: "USER_LOGOUT",
			payload: {}
		}
		
		this.wss.clients.forEach((client: CLIENT_SOCKET): void => {
			if (client.readyState === msg.open_state) {
				if (
					/**
					 * Should only broadcast to clients that share the same
					 * server or are mutual friends.
					 */
					client.selected_server_id === msg.ws.cache[0].selected_server_id &&
					client.id !== msg.ws.id
				) {
					console.log("[NEBUCHADNEZZAR][EVENT]->[USER_LOGOUT]: ", msg.ws.id)
					client.send(JSON.stringify(message))
				}
			}
		})
	}

	public handle(msg: HANDLER_MESSAGE_CLOSE): void {
		this.log_close(msg)
		this.broadcast(msg)
	}
}

export default Socket_Close