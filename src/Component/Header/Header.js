"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var HeaderNav_1 = __importDefault(require("./HeaderNav"));
var Header = function () {
    return (react_1.default.createElement("header", { className: "header-container" },
        react_1.default.createElement("h1", null, " This is ReactApp "),
        react_1.default.createElement(HeaderNav_1.default, null)));
};
exports.default = Header;
