import { WebSocket, WebSocketServer, CloseEvent } from "ws"

declare global {
    /**
     * Interfaces
     */
    interface WebSocketServer extends _WebSocketServer {
        clients: Array<CLIENT_SOCKET>
    }

    interface CONNECTION_CONTEXT {
        open_state: number
        wss: WSS
    }

    interface HANDLER_MESSAGE<Payload> extends MessageEvent {
        event: string
        payload: Payload
        open_state: number
        ws: CLIENT_SOCKET
    }

    interface HANDLER_MESSAGE_CLOSE extends _CloseEvent {
        open_state: number
        ws: CLIENT_SOCKET
        _code: number
        _reason: string
    }
    
    interface USER {
        id: number
        user_name: string
        message: Text
    }
    
    interface CHANNEL_MESSAGES_PAYLOAD {
        user: USER
        channel_id: number,
        server_id: number
    }

    interface USER_MESSAGES_PAYLOAD {
        user_id: number
        user_name: string
        friend_id: number
        message: string
    }
    
    interface SELECTED_CHANNEL_PAYLOAD {
        selected_channel_id: null | number
        selected_channel_name: string
        id: number
    }
    
    interface SELECTED_SERVER_PAYLOAD {
        selected_server_id: number
        selected_channel_id: number
    }
    
    interface SOCKET_OPEN_PAYLOAD {
        id: number
        user_name: string
        first_name: string
        last_name: string
        email: string
        status: number
        home_selected: boolean
        selected_friend_id: number
        selected_friend_user_name: string
        selected_server_id: number
        selected_channel_id: number
    }
    
    interface CLIENT_SOCKET extends WebSocket {
        id: string
        home_selected: boolean | null
        selected_server_id: number | null
        selected_channel_id: number | null
        friends_cache: Array<{
            id: number
            status: number
            email: string
            user_name: string
            first_name: string
            last_name: string
        }>
        server_cache: Array<{ 
            id: number,
            user_name: string,
            first_name: string,
            email: string,
            status: number,
            selected_server_id: number,
            selected_channel_id: number
         }>
    }

    interface CHANNEL_USER {
        id: number
        user_name: string
        first_name: string
        last_name: string
        email: string
        status: number
    }

    interface POPULATE_USER_FRIENDS_MESSAGE {
        event: string
        payload: Array<CHANNEL_USER>
    }

    interface SAVE_HOME_SELECTED_MESSAGE {
        event: string
        payload: Object<{ home_selected: boolean }>
    }

    /**
     * Classes
     */
    class _WebSocketServer implements WebSocketServer {
        clients: CLIENT_SOCKET[]
    }

    class _CloseEvent implements CloseEvent {
        open_state: number
        ws: CLIENT_SOCKET
        _code: number
        _reason: string
    }
}