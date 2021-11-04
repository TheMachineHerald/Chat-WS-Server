import HANDLER_MESSAGE from "./types"

class Ping {
	constructor() {
		this.handle = this.handle.bind(this)
	}

	handle(msg: HANDLER_MESSAGE): void {
		const payload: Object = {
			event: "PONG",
			data: null
		}
		msg.ws.send(JSON.stringify(payload))
	}
}

export default Ping