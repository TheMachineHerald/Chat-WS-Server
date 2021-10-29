import { app, http } from './src/server'
import * as WebSocket from 'ws'

import Handlers from './src/sys/handlers'
import Channel_Messages from './src/sys/handler/Channel_Mesages'
import Ping from './src/sys/handler/Ping'

const server = http.createServer(app)
const wss = new WebSocket.Server({ server: server })
const PORT = 9000

const handlers = new Handlers({
    [Channel_Messages.EVENT]: new Channel_Messages(wss),
    [Ping.EVENT]: new Ping()
})

wss.on('connection', (ws) => {
    console.log('a new red pill connected')

    ws.on('message', (msg) => {
        console.log('[Red Pill]: %s', msg)
        // console.log('[socket][id]: ', ws.id)

        try {
            const payload = JSON.parse(msg)
            console.log('Red Pill > Payload: ', payload)

            handlers.handle({
                ...payload,
                open_state: WebSocket.OPEN,
                ws: ws
            })

            
        } catch (e) {
            console.log(e)
        }

    })
})


app.get('/', (req, res) => {
    res.send('[Nebuchadnezzar] is online...')
})

server.listen(PORT, () => console.log(`Server || PORT: ${PORT}`))