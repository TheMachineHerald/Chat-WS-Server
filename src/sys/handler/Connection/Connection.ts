import Message_Handler from "../../handlers/Message_Handler"
import Socket_Open from "../Socket_Open/Socket_Open"
import Socket_Close from "../Socket_Close/Socket_Close"
import Selected_Server from "../Selected_Server/Selected_Server"
import Selected_Channel from "../Selected_channel/Selected_Channel"
import Channel_Messages from "../Channel_Messages/Channel_Mesages"
import Ping from "../Ping/Ping"

import { WebSocketServer } from "ws"
import { CLIENT } from "./types"


class Connection {
	open_state = Number
	wss = WebSocketServer
	message_handler: Message_Handler
	close_handler: Socket_Close

	constructor(ctx: any) {
		this.open_state = ctx.open_state
		this.wss = ctx.wss
		this.create_client = this.create_client.bind(this)
		this.init_handlers = this.init_handlers.bind(this)
		this.message_handler = new Message_Handler({
			["CLIENT_SOCKET_OPEN"]: new Socket_Open(ctx.wss),
			["UPDATE_SELECTED_SERVER"]: new Selected_Server(ctx.wss),
			["SAVE_SELECTED_CHANNEL"]: new Selected_Channel(ctx.wss),
			["CHANNEL_MESSAGE_SENT"]: new Channel_Messages(ctx.wss),
			["PING"]: new Ping()
		})
		this.close_handler = new Socket_Close(ctx.wss)
	}

	/**
	 * @param client Websocket client instance
	 * @NOTE All event listeners on the client socket instance are created here 
	 *       based on the type of socket event recieved. Each event has its own
	 *       handler.
	 */
	init_handlers(client: CLIENT): void {
		console.log(`[RED-PILL][${client.id}] has joined the Nebuchadnezzar!`)

		client.on("message", (msg: any): void => {
			const payload = JSON.parse(msg)
			this.message_handler.handle({
				...payload,
				open_state: this.open_state,
				ws: client
			})
		})

		client.on("close", (code: Number, reason: String): void => {
			console.log("[NEBUCHADNEZZAR][EVENT][CLOSE]")
			this.close_handler.handle({
				open_state: this.open_state,
				code: code,
				reason: reason,
				ws: client
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
	create_client(ws: CLIENT, req: any): void {
		const id = req.url.replace("/?client=", "")

		ws.id = id
		ws.selected_server_id = null
		ws.selected_channel_id = null
		ws.cache = []
		this.init_handlers(ws)
	}
}

export default Connection