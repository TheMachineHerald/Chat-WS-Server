"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./src/server");
var WebSocket = __importStar(require("ws"));
var handlers_1 = __importDefault(require("./src/sys/handlers"));
require("dotenv").config();
var server = server_1.http.createServer(server_1.app);
var wss = new WebSocket.Server({ server: server });
var PORT = process.env.PORT || 9000;
var connection_handler = new handlers_1.default({
    open_state: WebSocket.OPEN,
    wss: wss
});
wss.on("connection", function (ws, req) {
    connection_handler.handle(ws, req);
});
server.listen(PORT, function () { return console.log("Server listening on PORT: " + PORT); });
