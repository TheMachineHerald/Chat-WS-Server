"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message_Handler = /** @class */ (function () {
    function Message_Handler(handlers) {
        this.handlers = handlers;
        this.handle = this.handle.bind(this);
    }
    Message_Handler.prototype.handle = function (msg) {
        if (!this.handlers[msg.event]) {
            console.log("No handler for [EVENT][" + msg.event + "]");
        }
        this.handlers[msg.event].handle(msg);
    };
    return Message_Handler;
}());
exports.default = Message_Handler;
