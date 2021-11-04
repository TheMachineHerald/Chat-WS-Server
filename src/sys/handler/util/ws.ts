declare module "ws-ws" {
    class _WS extends WebSocket { }

    export interface WebSocket extends _WS {
        id: String
        selected_server_id: Number
        selected_channel_id: Number
        cache: Array<{ 
            id: Number,
            user_name: String,
            first_name: String,
            email: String,
            status: Number,
            selected_server_id: Number,
            selected_channel_id: Number
         }>
    }
    
    class _WSS implements WebSocketServer {
        clients: WebSocket[]
    }
    
    export interface WebSocketServer extends _WSS {
        clients: Array<WebSocket>
    }
}