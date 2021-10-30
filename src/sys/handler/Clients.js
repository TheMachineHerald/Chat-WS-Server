import Message_Handler from "../handlers/Message_Handler"
import Socket_Close from "./Socket_Close"
import Channel_Messages from "./Channel_Mesages"
import Ping from "./Ping"
import { config } from '../../config'

class Clients {
    constructor(ctx) {
        this.clients = {}
        this.WebSocket = ctx.WebSocket
        this.wss = ctx.wss
        this.create_client = this.create_client.bind(this)
        this.init_handlers = this.init_handlers.bind(this)
        this.hydrate = this.hydrate.bind(this)
        this.hydrate_client = this.hydrate_client.bind(this)
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
            this.message_handler.handle({
                ...payload,
                open_state: this.WebSocket.OPEN,
                ws: client
            })
        })
        
        client.on('close', (code, reason) => {
            this.close_handler.handle({
                code: code,
                reason: reason ,
                client: client
            })
        })
    }

    hydrate(client, payload) {
        payload.forEach(server => {
          this.clients[client]['cache'].push(server)
        })
    }

    /**
     * @name hydrate_client - Retrieves active channels + servers
     * @param {*} client - Full client ws instance
     * @NOTE - NEEDS TO HAVE FALLBACK
     */
    hydrate_client(client) {
        const parsed_id = client.id.split('-')[1] || null
        fetch(`${config.API_ENDPOINT}/api/hydrate/user/${parsed_id}`)
            .then(response => {
                  const payload = response.data.payload
                  this.hydrate(client.id, payload)
            })
            .catch(err => console.log(err))
    }

    create_client(ws, req) {
        const id = req.url.replace('/?client=', '')

        this.clients[id] = ws
        this.clients[id]['id'] = id
        this.clients[id]['cache'] = []
        this.init_handlers(this.clients[id])
        this.hydrate_client(this.clients[id])
    }
}

export default Clients