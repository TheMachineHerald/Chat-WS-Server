class User_Messages {
	static EVENT: string
	private wss: WebSocketServer
	
	constructor(wss: WebSocketServer) {
		this.wss = wss
		this.broadcast = this.broadcast.bind(this)
		this.handle = this.handle.bind(this)
	}

	public broadcast(msg: HANDLER_MESSAGE<USER_MESSAGES_PAYLOAD>): void {
		const message: Object = {
			event: "UPDATE_USER_MESSAGES",
			payload: msg.payload
		}

		this.wss.clients.forEach((client: CLIENT_SOCKET): void => {
			if (client.readyState === msg.open_state) {
                const parsed_id: number = parseInt(client.id.split("-")[1])

				if (
					parsed_id === msg.payload.user_id ||
					parsed_id === msg.payload.friend_id
				) {
					console.log("[NEBUCHADNEZZAR]: user match: ", msg.payload)
					client.send(JSON.stringify(message))
				}
			}
		})
	}

	public handle(msg: HANDLER_MESSAGE<USER_MESSAGES_PAYLOAD>): void {
		this.broadcast(msg)
	}
}

User_Messages.EVENT = "USER_MESSAGE_SENT"
export default User_Messages