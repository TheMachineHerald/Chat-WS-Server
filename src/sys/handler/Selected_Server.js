class Selected_Server {
	constructor(wss) {
		this.wss = wss
		this.hydrate = this.hydrate.bind(this)
		// this.handle = this.handle.bind(this)
	}

	hydrate(msg) {
		msg.ws.selected_server_id = msg.payload.selected_server_id
		msg.ws.selected_channel_id = msg.payload.selected_channel_id

		console.log("[SELECTED SERVER][HYDRATE]: ", msg.ws.cache[0])
	}


	// handle(msg) {
	// 	msg.ws.forEach(s => {

	// 	})
	// }
}

Selected_Server.EVENT = "UPDATE_SELECTED_SERVER"
export default Selected_Server