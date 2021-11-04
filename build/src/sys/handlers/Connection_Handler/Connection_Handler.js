"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Connection_1 = __importDefault(require("../../handler/Connection/Connection"));
var Connection_Handler = /** @class */ (function () {
    function Connection_Handler(ctx) {
        this.connection = new Connection_1.default(ctx);
        this.add_client = this.add_client.bind(this);
        this.handle = this.handle.bind(this);
    }
    Connection_Handler.prototype.add_client = function (ws, req) {
        this.connection.create_client(ws, req);
    };
    Connection_Handler.prototype.handle = function (ws, req) {
        this.add_client(ws, req);
    };
    return Connection_Handler;
}());
exports.default = Connection_Handler;
