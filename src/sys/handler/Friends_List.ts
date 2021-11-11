class Friend_List {
    static EVENT: string
    private wss: WebSocketServer

    public constructor(wss: WebSocketServer) {
        this.wss = wss
        this.hydrate = this.hydrate.bind(this)
        this.handle = this.handle.bind(this)
    }

    public hydrate(msg: HANDLER_MESSAGE<any>): void {
        console.log("hydrating: ", msg.ws.id)
        msg.payload.friends.forEach((user: CHANNEL_USER): void => {
            console.log(user)
            msg.ws.friends_cache.push(user)
        })
    }

    public handle(msg: HANDLER_MESSAGE<any>): void {
        this.hydrate(msg)
    }
}

Friend_List.EVENT = "POPULATE_FRIEND_LIST"
export default Friend_List