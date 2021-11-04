"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Socket_Open = /** @class */ (function () {
    function Socket_Open(wss) {
        this.wss = wss;
        this.broadcast = this.broadcast.bind(this);
        this.hydrate_client = this.hydrate_client.bind(this);
        this.handle = this.handle.bind(this);
    }
    Socket_Open.prototype.hydrate_client = function (msg) {
        var parsed_id = msg.ws.id.split("-")[1] || null;
        msg.ws.selected_server_id = msg.payload.selected_server_id;
        msg.ws.selected_channel_id = msg.payload.selected_channel_id;
        msg.ws.cache.push(msg.payload);
        console.log("[RED-PILL][HYDRATED]: ", parsed_id, msg.payload);
        this.broadcast(msg);
    };
    Socket_Open.prototype.broadcast = function (msg) {
        var message = {
            event: "CONNECTED_USER",
            payload: msg.payload
        };
        this.wss.clients.forEach(function (client) {
            if (client.readyState === msg.open_state) {
                client.cache.forEach(function (s) {
                    if (
                    /**
                     * Should only broadcast to clients that share the same
                     * server or are mutual friends.
                     */
                    s.selected_server_id === msg.payload.selected_server_id &&
                        s.id !== msg.payload.id) {
                        client.send(JSON.stringify(message));
                    }
                });
            }
        });
    };
    Socket_Open.prototype.handle = function (msg) {
        this.hydrate_client(msg);
    };
    return Socket_Open;
}());
exports.default = Socket_Open;
