"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var reactstrap_1 = require("reactstrap");
var HeaderNav = function () {
    return (react_1.default.createElement("div", { className: "header-nav-container" },
        react_1.default.createElement(reactstrap_1.Nav, null,
            react_1.default.createElement(reactstrap_1.NavItem, null,
                react_1.default.createElement(reactstrap_1.NavLink, { href: "/" }, " Home ")),
            react_1.default.createElement(reactstrap_1.NavItem, null,
                react_1.default.createElement(reactstrap_1.NavLink, { href: "/account" }, " \uD68C\uC6D0\uBAA9\uB85D ")),
            react_1.default.createElement(reactstrap_1.NavItem, null,
                react_1.default.createElement(reactstrap_1.NavLink, { href: "/files" }, " \uD30C\uC77C\uAD00\uB9AC ")))));
};
exports.default = HeaderNav;
