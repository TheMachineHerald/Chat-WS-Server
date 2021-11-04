"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Channel_Messages = /** @class */ (function () {
    function Channel_Messages(wss) {
        this.wss = wss;
        this.broadcast = this.broadcast.bind(this);
        this.handle = this.handle.bind(this);
    }
    Channel_Messages.prototype.broadcast = function (msg) {
        var message = {
            event: "UPDATE_CHANNEL_MESSAGES",
            payload: {}
        };
        this.wss.clients.forEach(function (client) {
            if (client.readyState === msg.open_state) {
                if (client.selected_server_id === msg.payload.server_id &&
                    client.selected_channel_id === msg.payload.channel_id) {
                    console.log("[NEBUCHADNEZZAR]: server match: ", msg.payload);
                    client.send(JSON.stringify(message));
                }
            }
        });
    };
    Channel_Messages.prototype.handle = function (msg) {
        this.broadcast(msg);
    };
    return Channel_Messages;
}());
exports.default = Channel_Messages;
