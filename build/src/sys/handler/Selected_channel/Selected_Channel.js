"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Selected_Channel = /** @class */ (function () {
    function Selected_Channel(wss) {
        this.wss = wss;
        this.hydrate = this.hydrate.bind(this);
        this.handle = this.handle.bind(this);
    }
    Selected_Channel.prototype.hydrate = function (msg) {
        msg.ws.selected_channel_id = msg.payload.selected_channel_id;
    };
    Selected_Channel.prototype.handle = function (msg) {
        this.hydrate(msg);
    };
    return Selected_Channel;
}());
exports.default = Selected_Channel;
