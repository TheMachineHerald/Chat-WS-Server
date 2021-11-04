import { WebSocketServer } from "ws"
import HANDLER_MESSAGE from "./types"

class Selected_Channel {
	wss: WebSocketServer

	constructor(wss: InstanceType<typeof WebSocketServer>) {
		this.wss = wss
		this.hydrate = this.hydrate.bind(this)
		this.handle = this.handle.bind(this)
	}

	hydrate(msg: HANDLER_MESSAGE): void {
		msg.ws.selected_channel_id = msg.payload.selected_channel_id
	}

	handle(msg: HANDLER_MESSAGE): void {
		this.hydrate(msg)
	}
}

export default Selected_Channel