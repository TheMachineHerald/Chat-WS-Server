class Channel_Messages {
	constructor(wss) {
		this.wss = wss
		this.broadcast = this.broadcast.bind(this)
		this.handle = this.handle.bind(this)
	}

	broadcast(msg) {
		const message = {
			event: "UPDATE_CHANNEL_MESSAGES",
			payload: {}
		}
		this.wss.clients.forEach(client => {
			if (client.readyState === msg.open_state) {
				client.cache.forEach(s => {
					if
					(
						//Should also check server_selected_id = 1
						s.selected_server_id === msg.payload.server_id &&
						s.selected_channel_id === msg.payload.channel_id
					) {
						console.log("[NEBUCHADNEZZAR]: server match: ", msg.payload)
						client.send(JSON.stringify(message))
					}
				})
			}
		})
	}

	handle(msg) {
		this.broadcast(msg)
	}
}

Channel_Messages.EVENT = "CHANNEL_MESSAGE_SENT"
export default Channel_Messages