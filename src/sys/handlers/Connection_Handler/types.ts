import { http } from "../../../server"
import { WebSocket, WebSocketServer } from "ws"

interface CONNECTION_CONTEXT {
	open_state: Number
	wss: WebSocketServer
}

interface CLIENT extends WebSocket {
	id: String,
	selected_server_id: Number | null
	selected_channel_id: Number | null
	cache: Array<{ 
		id: Number,
		user_name: String,
		first_name: String,
		email: String,
		status: Number,
		selected_server_id: Number,
		selected_channel_id: Number
	 }>
}

export {
    http,
    CLIENT,
    CONNECTION_CONTEXT
}