class Ping {
	static EVENT: string

	public constructor() {
		this.handle = this.handle.bind(this)
	}

	public handle(msg: HANDLER_MESSAGE<any>): void {
		const payload: Object = {
			event: "PONG",
			data: null
		}
		msg.ws.send(JSON.stringify(payload))
	}
}

Ping.EVENT = "PING"
export default Ping