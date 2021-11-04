"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Socket_Close = /** @class */ (function () {
    function Socket_Close(wss) {
        this.wss = wss;
        this.log_close = this.log_close.bind(this);
        this.broadcast = this.broadcast.bind(this);
        this.handle = this.handle.bind(this);
    }
    Socket_Close.prototype.log_close = function (msg) {
        console.log("[RedPill][" + msg.ws.id + "] left the matrix...");
        console.log("[code]: " + msg.code);
        console.log("[reason]: " + msg.reason);
    };
    Socket_Close.prototype.broadcast = function (msg) {
        var message = {
            event: "USER_LOGOUT",
            payload: {}
        };
        this.wss.clients.forEach(function (client) {
            if (client.readyState === msg.open_state) {
                if (
                /**
                 * Should only broadcast to clients that share the same
                 * server or are mutual friends.
                 */
                client.selected_server_id === msg.ws.cache[0].selected_server_id &&
                    client.id !== msg.ws.id) {
                    console.log("[NEBUCHADNEZZAR][EVENT]->[USER_LOGOUT]: ", msg.ws.id);
                    client.send(JSON.stringify(message));
                }
            }
        });
    };
    Socket_Close.prototype.handle = function (msg) {
        this.log_close(msg);
        this.broadcast(msg);
    };
    return Socket_Close;
}());
exports.default = Socket_Close;
