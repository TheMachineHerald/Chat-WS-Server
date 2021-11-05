class Channel_Messages {
	wss: WebSocketServer

	constructor(wss: WebSocketServer) {
		this.wss = wss
		this.broadcast = this.broadcast.bind(this)
		this.handle = this.handle.bind(this)
	}

	broadcast(msg: HANDLER_MESSAGE<CHANNEL_MESSAGES_PAYLOAD>): void {
		const message: Object = {
			event: "UPDATE_CHANNEL_MESSAGES",
			payload: {}
		}

		this.wss.clients.forEach((client: CLIENT_SOCKET): void => {
			if (client.readyState === msg.open_state) {
				if (
					client.selected_server_id === msg.payload.server_id &&
					client.selected_channel_id === msg.payload.channel_id
				) {
					console.log("[NEBUCHADNEZZAR]: server match: ", msg.payload)
					client.send(JSON.stringify(message))
				}
			}
		})
	}

	handle(msg: HANDLER_MESSAGE<CHANNEL_MESSAGES_PAYLOAD>): void {
		this.broadcast(msg)
	}
}

export default Channel_Messages