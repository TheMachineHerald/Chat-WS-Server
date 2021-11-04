class _WS implements WebSocketServer {
    clients: WebSocket[] | undefined;
}


export interface WebSocketServer extends _WS {
    clients: Array<WebSocket>
}