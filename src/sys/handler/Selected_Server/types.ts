import { WebSocket } from "ws-ws"

interface SELECTED_SERVER_PAYLOAD {
    selected_server_id: Number
    selected_channel_id: Number
}

interface HANDLER_MESSAGE extends MessageEvent {
	event: String
    payload: SELECTED_SERVER_PAYLOAD
	open_state: Number
	ws: WebSocket
}

export default HANDLER_MESSAGE