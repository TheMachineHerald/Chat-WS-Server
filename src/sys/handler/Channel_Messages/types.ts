interface USER {
	id: Number
	user_name: String
	message: Text
}

interface CHANNEL_MESSAGES_PAYLOAD {
	user: USER
	channel_id: Number,
	server_id: Number
}

interface HANDLER_MESSAGE extends MessageEvent {
	event: String
    payload: CHANNEL_MESSAGES_PAYLOAD
	open_state: Number
	ws: WebSocket
}

export default HANDLER_MESSAGE