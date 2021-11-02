class Ping {
	constructor() {
		this.handle = this.handle.bind(this)
	}

	handle(msg) {
		const payload = {
			event: "PONG",
			data: null
		}
		return msg.ws.send(JSON.stringify(payload))
	}
}

Ping.EVENT = "PING"
export default Ping