class Selected_Channel {
	static EVENT: string
	private wss: WebSocketServer

	public constructor(wss: WebSocketServer) {
		this.wss = wss
		this.hydrate = this.hydrate.bind(this)
		this.handle = this.handle.bind(this)
	}

	public hydrate(msg: HANDLER_MESSAGE<SELECTED_CHANNEL_PAYLOAD>): void {
		msg.ws.selected_channel_id = msg.payload.selected_channel_id
	}

	public handle(msg: HANDLER_MESSAGE<SELECTED_CHANNEL_PAYLOAD>): void {
		this.hydrate(msg)
	}
}

Selected_Channel.EVENT = "SAVE_SELECTED_CHANNEL"
export default Selected_Channel