class Selected_Channel {
	constructor(wss) {
		this.wss = wss
		this.hydrate = this.hydrate.bind(this)
		// this.broadcast = this.broadcast.bind(this)
		this.handle = this.handle.bind(this)
	}

	hydrate(msg) {
		msg.ws.selected_channel_id = msg.payload.selected_channel_id
		console.log("client: ", msg.ws.id, msg.payload.selected_channel_id)
	}

	// broadcast(msg) {
	// 	const message = {
	// 		event: "UPDATE_SELECTED_CHANNEL",
	// 		payload: {}
	// 	}
	// 	this.wss.clients.forEach(client => {
	// 		if (client.readyState === msg.open_state) {
	// 			client.cache.forEach(s => {
	// 				if (
	// 					s.id === msg.payload.id
	// 				) {
	// 					console.log("[NEBUCHADNEZZAR]: user match: ", msg.payload)
	// 					client.send(JSON.stringify(message))
	// 				}
	// 			})
	// 		}
	// 	})
	// }

	handle(msg) {
		this.hydrate(msg)
		// this.broadcast(msg)
	}
}

Selected_Channel.EVENT = "SAVE_SELECTED_CHANNEL"
export default Selected_Channel