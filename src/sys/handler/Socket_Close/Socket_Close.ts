import { WebSocketServer, WebSocket } from "ws-ws"
import { HANDLER_MESSAGE } from "./types"

class Socket_Close {
	wss: WebSocketServer

	constructor(wss: WebSocketServer) {
		this.wss = wss
		this.log_close = this.log_close.bind(this)
		this.broadcast = this.broadcast.bind(this)
		this.handle = this.handle.bind(this)
	}

	log_close(msg: HANDLER_MESSAGE): void {
		console.log(`[RedPill][${msg.ws.id}] left the matrix...`)
		console.log(`[code]: ${msg.code}`)
		console.log(`[reason]: ${msg.reason}`)
	}

	broadcast(msg: HANDLER_MESSAGE): void {
		const message: Object = {
			event: "USER_LOGOUT",
			payload: {}
		}
		
		this.wss.clients.forEach((client: WebSocket ): void => {
			if (client.readyState === msg.open_state) {
				if (
				/**
				 * Should only broadcast to clients that share the same
				 * server or are mutual friends.
				 */
					client.selected_server_id === msg.ws.cache[0].selected_server_id &&
					client.id !== msg.ws.id
				) {
					console.log("[NEBUCHADNEZZAR][EVENT]->[USER_LOGOUT]: ", msg.ws.id)
					client.send(JSON.stringify(message))
				}
			}
		})
	}

	handle(msg: any): void {
		this.log_close(msg)
		this.broadcast(msg)
	}
}

export default Socket_Close