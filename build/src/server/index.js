"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = exports.app = void 0;
var express_1 = __importDefault(require("./express"));
exports.app = express_1.default;
var http_1 = __importDefault(require("./http"));
exports.http = http_1.default;
