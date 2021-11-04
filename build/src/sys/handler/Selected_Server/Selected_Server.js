"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Selected_Server = /** @class */ (function () {
    function Selected_Server(wss) {
        this.wss = wss;
        this.hydrate = this.hydrate.bind(this);
        this.handle = this.handle.bind(this);
    }
    Selected_Server.prototype.hydrate = function (msg) {
        msg.ws.selected_server_id = msg.payload.selected_server_id;
        msg.ws.selected_channel_id = msg.payload.selected_channel_id;
        console.log("[SELECTED SERVER][HYDRATE]: ", msg.ws.cache[0]);
    };
    Selected_Server.prototype.handle = function (msg) {
        console.log("SELECTED SERVER: ", msg.payload);
        this.hydrate(msg);
    };
    return Selected_Server;
}());
exports.default = Selected_Server;
