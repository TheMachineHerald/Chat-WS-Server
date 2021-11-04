"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_Handler_1 = __importDefault(require("../../handlers/Message_Handler"));
var Socket_Open_1 = __importDefault(require("../Socket_Open/Socket_Open"));
var Socket_Close_1 = __importDefault(require("../Socket_Close/Socket_Close"));
var Selected_Server_1 = __importDefault(require("../Selected_Server/Selected_Server"));
var Selected_Channel_1 = __importDefault(require("../Selected_channel/Selected_Channel"));
var Channel_Mesages_1 = __importDefault(require("../Channel_Messages/Channel_Mesages"));
var Ping_1 = __importDefault(require("../Ping/Ping"));
var ws_1 = require("ws");
var Connection = /** @class */ (function () {
    function Connection(ctx) {
        var _a;
        this.open_state = Number;
        this.wss = ws_1.WebSocketServer;
        this.open_state = ctx.open_state;
        this.wss = ctx.wss;
        this.create_client = this.create_client.bind(this);
        this.init_handlers = this.init_handlers.bind(this);
        this.message_handler = new Message_Handler_1.default((_a = {},
            _a["CLIENT_SOCKET_OPEN"] = new Socket_Open_1.default(ctx.wss),
            _a["UPDATE_SELECTED_SERVER"] = new Selected_Server_1.default(ctx.wss),
            _a["SAVE_SELECTED_CHANNEL"] = new Selected_Channel_1.default(ctx.wss),
            _a["CHANNEL_MESSAGE_SENT"] = new Channel_Mesages_1.default(ctx.wss),
            _a["PING"] = new Ping_1.default(),
            _a));
        this.close_handler = new Socket_Close_1.default(ctx.wss);
    }
    /**
     * @param client Websocket client instance
     * @NOTE All event listeners on the client socket instance are created here
     *       based on the type of socket event recieved. Each event has its own
     *       handler.
     */
    Connection.prototype.init_handlers = function (client) {
        var _this = this;
        console.log("[RED-PILL][" + client.id + "] has joined the Nebuchadnezzar!");
        client.on("message", function (msg) {
            var payload = JSON.parse(msg);
            _this.message_handler.handle(__assign(__assign({}, payload), { open_state: _this.open_state, ws: client }));
        });
        client.on("close", function (code, reason) {
            console.log("[NEBUCHADNEZZAR][EVENT][CLOSE]");
            _this.close_handler.handle({
                open_state: _this.open_state,
                code: code,
                reason: reason,
                ws: client
            });
        });
    };
    /**
     * @param ws ws Client WebSocket Instance
     * @param req wss request object
     * @NOTE create_client defines the initial properties of the client
     *       socket, which we will use to hydrate with our Socket_Open
     *       handler when we recieve the "client_socket_open" event.
     */
    Connection.prototype.create_client = function (ws, req) {
        var id = req.url.replace("/?client=", "");
        ws.id = id;
        ws.selected_server_id = null;
        ws.selected_channel_id = null;
        ws.cache = [];
        this.init_handlers(ws);
    };
    return Connection;
}());
exports.default = Connection;
