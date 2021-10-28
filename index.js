import { app, http } from './src/server'
import * as WebSocket from 'ws'

const server = http.createServer(app)
const wss = new WebSocket.Server({ server: server })
const PORT = 9000

wss.on('connection', (ws) => {
    console.log('a new red pill connected')

    ws.on('message', (msg) => {
        console.log('[Red Pill]: %s', msg)

        if (msg == 'ping') {
            const payload = {
                event: 'pong',
                data: null
            }

            return ws.send(JSON.stringify(payload))
        } else {
            try {
                const client_payload = JSON.parse(msg)
                console.log('Red Pill > Payload: ', client_payload)
    
                if (client_payload.event == 'channel_msg_sent') {
                    const payload = {
                        event: 'update_channel_msgs',
                        data: {}
                    }

                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                          client.send(JSON.stringify(payload));
                        }
                    })
                }
            } catch (e) {
                console.log(e)
            }
        }
    })
})


app.get('/', (req, res) => {
    res.send('[Nebuchadnezzar] is online...')
})

server.listen(PORT, () => console.log(`Server || PORT: ${PORT}`))