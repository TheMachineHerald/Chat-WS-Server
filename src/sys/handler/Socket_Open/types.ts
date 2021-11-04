import { WebSocket } from "ws-ws"

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
    payload: SOCKET_OPEN_PAYLOAD
	open_state: Number
	ws: WebSocket
}

export default HANDLER_MESSAGE