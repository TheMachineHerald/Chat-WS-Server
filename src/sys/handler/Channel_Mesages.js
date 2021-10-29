class Channel_Messages {
    constructor(wss) {
        this.wss = wss
        this.handle = this.handle.bind(this)
    }

    handle(msg) {
        const payload = {
            event: 'update_channel_msgs',
            data: {}
        }

        this.wss.clients.forEach((client) => {
            if (client.readyState === msg.open_state) {
                client.send(JSON.stringify(payload))
            }
        })
    }
}

Channel_Messages.EVENT = 'channel_msg_sent'
export default Channel_Messages