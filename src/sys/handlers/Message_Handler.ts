class Message_Handler {
	private handlers: any
	
	public constructor(handlers: any) {
		this.handlers = handlers
		this.handle = this.handle.bind(this)
	}

	public handle<Payload>(msg: HANDLER_MESSAGE<Payload>): void {
		if (!this.handlers[msg.event]) {
			console.log(`No handler for [EVENT][${msg.event}]`)
		}

		this.handlers[msg.event].handle(msg)
	}
}

export default Message_Handler