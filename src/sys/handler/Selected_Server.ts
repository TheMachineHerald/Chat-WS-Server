class Selected_Server {
	static EVENT: string
	wss: WebSocketServer

	constructor(wss: WebSocketServer) {
		this.wss = wss
		this.hydrate = this.hydrate.bind(this)
		this.handle = this.handle.bind(this)
	}

	hydrate(msg: HANDLER_MESSAGE<SELECTED_SERVER_PAYLOAD>): void {
		msg.ws.selected_server_id = msg.payload.selected_server_id
		msg.ws.selected_channel_id = msg.payload.selected_channel_id
		console.log("[SELECTED SERVER][HYDRATE]: ", msg.ws.cache[0])
	}

	handle(msg: HANDLER_MESSAGE<SELECTED_SERVER_PAYLOAD>): void {
		console.log("SELECTED SERVER: ", msg.payload)
		this.hydrate(msg)
	}
}

Selected_Server.EVENT = "UPDATE_SELECTED_SERVER"
export default Selected_Server