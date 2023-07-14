"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var reactstrap_1 = require("reactstrap");
var FileList_1 = __importDefault(require("./FileList"));
var FileManagement = function () {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, " FileManagement "),
        react_1.default.createElement(reactstrap_1.Nav, null,
            react_1.default.createElement(reactstrap_1.NavItem, null,
                react_1.default.createElement(reactstrap_1.NavLink, { href: "/" }, " \uBA54\uC778\uC73C\uB85C.. ")),
            react_1.default.createElement(reactstrap_1.NavItem, null,
                react_1.default.createElement(reactstrap_1.NavLink, { href: "/files/insert" }, " \uC5C5\uB85C\uB4DC "))),
        react_1.default.createElement("br", null),
        react_1.default.createElement(FileList_1.default, null)));
};
exports.default = FileManagement;
