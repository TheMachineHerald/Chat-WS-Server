import Message_Handler from "../handlers/Message_Handler"
import Socket_Close from "./Error"
import Channel_Messages from "./Channel_Mesages"
import Ping from "./Ping"

class Clients {
    constructor(ctx) {
        this.clients = {}
        this.WebSocket = ctx.WebSocket
        this.wss = ctx.wss
        this.create_client = this.create_client.bind(this)
        this.init_handlers = this.init_handlers.bind(this)
        this.message_handler = new Message_Handler({
          [Channel_Messages.EVENT]: new Channel_Messages(ctx.wss),
          [Ping.EVENT]: new Ping()
        })
        this.close_handler = new Socket_Close(ctx)
    }

    init_handlers(client) {
        console.log(`red pill [${client.id}] has joined the Nebuchadnezzar!`)
        
        client.on('message', (msg) => {
            const payload = JSON.parse(msg)
            console.log(`Red Pill [${client.id}][payload]: `, payload)
            this.message_handler.handle({
                ...payload,
                open_state: this.WebSocket.OPEN,
                ws: client
            })
        })
        
        client.on('close', (code, reason) => {
            this.close_handler.handle({
                code: code,
                reason: reason
            }, client)
        })
    }

    create_client(ws, req) {
        const id = req.url.replace('/?client=', '')

        this.clients[id] = ws
        this.clients[id]['id'] = id
        this.init_handlers(this.clients[id])
    }
}

export default Clients