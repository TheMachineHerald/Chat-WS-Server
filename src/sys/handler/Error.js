class Socket_Close {
    constructor(ctx) {
        this.log_close = this.log_close.bind(this)
        this.handle = this.handle.bind(this)
    }

    log_close(err, client) {
      console.log(`[RedPill][${client.id}] left the matrix...`)
      console.log(`[code]: ${err.code}`)
      console.log(`[reason]: ${err.reason}`)
    }

    handle(err, client) {
        this.log_close(err, client)
    }
}

export default Socket_Close