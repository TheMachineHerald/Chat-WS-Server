class Selected_Channel {
	constructor(wss) {
		this.wss = wss
		this.hydrate = this.hydrate.bind(this)
		this.handle = this.handle.bind(this)
	}

	hydrate(msg) {
		// const message = {
		// 	event: "UPDATE_SELECTED_CHANNEL",
		// 	payload: {}
		// }
		msg.ws.selected_channel_id = msg.payload.selected_channel_id
		console.log("client: ", msg.ws.id, msg.payload.selected_channel_id)
	}

	handle(msg) {
		this.hydrate(msg)
	}
}

Selected_Channel.EVENT = "SAVE_SELECTED_CHANNEL"
export default Selected_Channel