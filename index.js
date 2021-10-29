import { app, http } from './src/server'
import * as WebSocket from 'ws'
import Connection_Handler from './src/sys/handlers'

const server = http.createServer(app)
const wss = new WebSocket.Server({ server: server })
const PORT = 9000

const connection_handler = new Connection_Handler({
    WebSocket: WebSocket,
    wss: wss
})

wss.on('connection', (ws, req) => {
    connection_handler.handle(ws, req)
})

app.get('/', (req, res) => {
    res.send('[Nebuchadnezzar] is online...')
})

server.listen(PORT, () => console.log(`Server || PORT: ${PORT}`))