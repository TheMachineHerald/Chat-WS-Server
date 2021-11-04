interface CLIENT_SOCKET extends WebSocket {
	id: String
	selected_server_id: null | Number
	selected_channel_id: null | Number
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

interface SELECTED_CHANNEL_PAYLOAD {
	selected_channel_id: null | Number
	selected_channel_name: String
	id: Number
}

interface HANDLER_MESSAGE extends MessageEvent {
	event: String
	payload: SELECTED_CHANNEL_PAYLOAD
	open_state: Number
	ws: CLIENT_SOCKET
}

export default HANDLER_MESSAGE