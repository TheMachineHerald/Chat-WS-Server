import Message_Handler from './Message_Handler'
import Channel_Messages from '../handler/Channel_Mesages'
import Ping from '../handler/Ping'

class Connection_Handler {
    constructor(ctx) {
        this.message_handler = new Message_Handler({
            [Channel_Messages.EVENT]: new Channel_Messages(ctx.wss),
            [Ping.EVENT]: new Ping()
        })
        this.WebSocket = ctx.WebSocket
        this.wss = ctx.wss
        this.handle = this.handle.bind(this)
    }

    handle(ws, req) {
        ws.id = req.url.replace('/?client=', '')
        console.log('a new red pill connected')
        
        ws.on('message', (msg) => {
            console.log('[Red Pill]: %s', msg)
            console.log('[socket][id]: ', ws.id)
            try {
                const payload = JSON.parse(msg)
                console.log('Red Pill > Payload: ', payload)
                this.message_handler.handle({
                    ...payload,
                    open_state: this.WebSocket.OPEN,
                    ws: this.ws
                })
            } catch (e) {
                console.log(e)
            }
        })
    }
}

export default Connection_Handler