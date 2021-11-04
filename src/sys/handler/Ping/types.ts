import { WebSocket } from "ws-ws"

interface HANDLER_MESSAGE extends MessageEvent {
	event: String
    payload: Object
	open_state: Number
	ws: WebSocket
}

export default HANDLER_MESSAGE