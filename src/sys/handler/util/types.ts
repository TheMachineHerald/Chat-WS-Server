interface SOCKET_OPEN_PAYLOAD {
    id: Number
    user_name: String
    first_name: String
    last_name: String
    email: String
    status: Number
    selected_server_id: Number
    selected_channel_id: Number
}

interface HANDLER_MESSAGE extends MessageEvent {
	event: String
	open_state: Number
	ws: WebSocket
}

interface SO_HANDLER_MESSAGE extends HANDLER_MESSAGE {
    payload: SOCKET_OPEN_PAYLOAD
}


export {
    HANDLER_MESSAGE,
    SO_HANDLER_MESSAGE
}