class Socket_Close {
	constructor() {
		this.log_close = this.log_close.bind(this)
		this.handle = this.handle.bind(this)
	}

	log_close(msg) {
		console.log(`[RedPill][${msg.client.id}] left the matrix...`)
		console.log(`[code]: ${msg.code}`)
		console.log(`[reason]: ${msg.reason}`)
	}

	handle(msg) {
		this.log_close(msg)
	}
}

export default Socket_Close