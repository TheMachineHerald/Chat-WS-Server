"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ping = /** @class */ (function () {
    function Ping() {
        this.handle = this.handle.bind(this);
    }
    Ping.prototype.handle = function (msg) {
        var payload = {
            event: "PONG",
            data: null
        };
        msg.ws.send(JSON.stringify(payload));
    };
    return Ping;
}());
exports.default = Ping;
