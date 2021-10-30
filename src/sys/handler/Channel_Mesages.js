class Channel_Messages {
    constructor(wss) {
        this.wss = wss
        this.handle = this.handle.bind(this)
    }



    handle(msg) {
        const response = {
            event: 'update_channel_msgs',
            payload: {}
        }

        console.log('MSG > ', msg)

        this.wss.clients.forEach((client) => {
            if (client.readyState === msg.open_state) {
                client.cache.forEach(s => {

                    //this needs to be cleaned up a bit                    

                    if 
                    (
                        s.server_id == msg.payload.server_id &&
                        s.channel_id == msg.payload.channel_id
                    ) 
                    {
                        console.log('[NEBUCHADNEZZAR]: server match: ', msg)
                        client.send(JSON.stringify(response))
                    }
                })
            }
        })
    }
}

Channel_Messages.EVENT = 'channel_msg_sent'
export default Channel_Messages