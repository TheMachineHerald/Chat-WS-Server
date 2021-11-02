class Socket_Close {
	constructor(wss) {
		this.wss = wss
		this.log_close = this.log_close.bind(this)
		this.broadcast = this.broadcast.bind(this)
		this.handle = this.handle.bind(this)
	}

	log_close(msg) {
		console.log(`[RedPill][${msg.client.id}] left the matrix...`)
		console.log(`[code]: ${msg.code}`)
		console.log(`[reason]: ${msg.reason}`)
	}

	broadcast(msg) {
		const message = {
			event: "USER_LOGOUT",
			payload: {}
		}
		this.wss.clients.forEach(client => {
			if (client.readyState === msg.open_state) {
				client.cache.forEach(s => {
					if (
					/**
	                 * Should only broadcast to clients that share the same
	                 * server or are mutual friends.
	                 */
						s.selected_server_id === msg.client.cache[0].selected_server_id &&
						s.id !== msg.client.id
					) {
						console.log("[NEBUCHADNEZZAR][EVENT]->[USER_LOGOUT]: ", msg.client.id)
						client.send(JSON.stringify(message))
					}
				})
			}
		})
	}

	handle(msg) {
		this.log_close(msg)
		this.broadcast(msg)
	}
}

export default Socket_Close