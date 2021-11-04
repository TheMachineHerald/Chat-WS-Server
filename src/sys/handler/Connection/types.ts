import { WebSocket } from "ws"

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
    CLIENT
}