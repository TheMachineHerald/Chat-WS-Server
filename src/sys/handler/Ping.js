class Ping {
	constructor() {
		this.handle = this.handle.bind(this)
	}

	handle(msg) {
		const payload = {
			event: "pong",
			data: null
		}

		return msg.ws.send(JSON.stringify(payload))
	}
}

Ping.EVENT = "ping"
export default Ping