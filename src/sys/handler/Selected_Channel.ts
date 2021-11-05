class Selected_Channel {
	wss: WebSocketServer

	constructor(wss: WebSocketServer) {
		this.wss = wss
		this.hydrate = this.hydrate.bind(this)
		this.handle = this.handle.bind(this)
	}

	hydrate(msg: HANDLER_MESSAGE<SELECTED_CHANNEL_PAYLOAD>): void {
		msg.ws.selected_channel_id = msg.payload.selected_channel_id
	}

	handle(msg: HANDLER_MESSAGE<SELECTED_CHANNEL_PAYLOAD>): void {
		this.hydrate(msg)
	}
}

export default Selected_Channel