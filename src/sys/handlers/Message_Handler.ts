class Message_Handler {
	handlers: any
	constructor(handlers: any) {
		this.handlers = handlers
		this.handle = this.handle.bind(this)
	}

	handle(msg: any) {
		if (!this.handlers[msg.event]) {
			console.log(`No handler for [EVENT][${msg.event}]`)
		}

		this.handlers[msg.event].handle(msg)
	}
}

export default Message_Handler