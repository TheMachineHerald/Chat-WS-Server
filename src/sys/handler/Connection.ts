import Message_Handler from "../handlers/Message_Handler"
import Socket_Open from "./Socket_Open"
import Socket_Close from "./Socket_Close"
import Selected_Server from "./Selected_Server"
import Selected_Channel from "./Selected_Channel"
import Channel_Messages from "./Channel_Mesages"
import Ping from "./Ping"

class Connection {
	open_state: number
	wss: WebSocketServer
	message_handler: Message_Handler
	close_handler: Socket_Close

	constructor(ctx: CONNECTION_CONTEXT) {
		this.open_state = ctx.open_state
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
	init_handlers(client: CLIENT_SOCKET): void {
		console.log(`[RED-PILL][${client.id}] has joined the Nebuchadnezzar!`)

		client.on("message", (msg: any): void => {
			const payload = JSON.parse(msg)
			this.message_handler.handle({
				...payload,
				open_state: this.open_state,
				ws: client
			})
		})

		client.on("close", (code: number, reason: string): void => {
			console.log("[NEBUCHADNEZZAR][EVENT][CLOSE]")
			this.close_handler.handle({
				open_state: this.open_state,
				ws: client,
				_code: code,
				_reason: reason,
			})
		})
	}

	/**
	 * @param ws ws Client WebSocket Instance
	 * @param req wss request object
	 * 
	 * @NOTE create_client defines the initial properties of the client
	 * socket, which we will use to hydrate with our Socket_Open
	 * handler when we recieve the "client_socket_open" event.
	 */
	create_client(ws: CLIENT_SOCKET, req: any): void {
		const id = req.url.replace("/?client=", "")
		ws.id = id
		ws.selected_server_id = null
		ws.selected_channel_id = null
		ws.cache = []
		this.init_handlers(ws)
	}
}

export default Connection