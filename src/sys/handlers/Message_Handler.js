class Message_Handler {
  constructor(handlers) {
    this.handlers = handlers
    this.handle = this.handle.bind(this)
  }

  handle(msg) {
    if (!this.handlers[msg.event]) {
        throw new Error('No handler for message')
    }

    this.handlers[msg.event].handle(msg)
  }
}

export default Message_Handler