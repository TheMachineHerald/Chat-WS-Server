import Message_Handler from "../handlers/Message_Handler"
import Socket_Open from "./Socket_Open"
import Socket_Close from "./Socket_Close"
import Selected_Server from "./Selected_Server"
import Selected_Channel from "./Selected_Channel"
import Channel_Messages from "./Channel_Mesages"
import Ping from "./Ping"
import { config } from "../../config"

//This will be renamed and refactored for better semantics
class Clients {
	constructor(ctx) {
		this.clients = {}
		this.API_ENDPOINT = config.API_ENDPOINT
		this.WebSocket = ctx.WebSocket
		this.wss = ctx.wss
		this.create_client = this.create_client.bind(this)
		this.init_handlers = this.init_handlers.bind(this)
		this.message_handler = new Message_Handler({
			[Socket_Open.EVENT]: new Socket_Open(ctx.wss),
			[Selected_Server.EVENT]: new Selected_Server(ctx.wss),
			[Selected_Channel.EVENT]: new Selected_Channel(ctx.wss),
			[Channel_Messages.EVENT]: new Channel_Messages(ctx.wss),
			[Ping.EVENT]: new Ping()
		})
		this.close_handler = new Socket_Close(ctx.wss)
	}

	/**
	 * @param client Websocket client instance
	 * @NOTE All event listeners on the client socket instance are created here 
	 *       based on the type of socket event recieved. Each event has its own
	 *       handler.
	 */
	init_handlers(client) {
		console.log(`[RED-PILL][${client.id}] has joined the Nebuchadnezzar!`)

		client.on("message", msg => {
			const payload = JSON.parse(msg)
			this.message_handler.handle({
				...payload,
				open_state: this.WebSocket.OPEN,
				ws: client
			})
		})

		client.on("close", (code, reason) => {
			console.log("[NEBUCHADNEZZAR][EVENT][CLOSE]")
			this.close_handler.handle({
				open_state: this.WebSocket.OPEN,
				code: code,
				reason: reason,
				client: client
			})
		})
	}

	/**
     * @param ws ws Client WebSocket Instance
	 * @param req wss request object 
     * @NOTE create_client defines the initial properties of the client
	 *       socket, which we will use to hydrate with our Socket_Open
	 *       handler when we recieve the "client_socket_open" event.
     */
	create_client(ws, req) {
		const id = req.url.replace("/?client=", "")

		//refactor = this.clients[id] = new Client(...args)
		this.clients[id] = ws
		this.clients[id].id = id
		this.clients[id].selected_server_id = null
		this.clients[id].selected_channel_id = null
		this.clients[id].cache = []
		this.init_handlers(this.clients[id])
	}
}

export default Clients