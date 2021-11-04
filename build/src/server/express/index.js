"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.send("[Nebuchadnezzar] is online...");
});
app.use(function (err, req, res, next) {
    console.log("error '" + err.message + "'");
    res.status(500);
    res.json({ error: err.message });
});
exports.default = app;
