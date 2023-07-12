"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var react_1 = __importStar(require("react"));
var reactstrap_1 = require("reactstrap");
//Hooks
var AccountFetch_1 = __importDefault(require("./Hooks/AccountFetch"));
var AccountAxios_1 = __importDefault(require("./Hooks/AccountAxios"));
var Account = function () {
    var _a = (0, react_1.useState)(react_1.default.createElement(AccountFetch_1.default, null)), account = _a[0], setAccount = _a[1];
    var _b = (0, react_1.useState)("fetchButton"), selectedButton = _b[0], setSelectedButton = _b[1];
    var handleBtnClick = function (param) {
        if (param === "fetchButton") {
            setAccount(react_1.default.createElement(AccountFetch_1.default, null));
            setSelectedButton(param);
        }
        else if (param === "axiosButton") {
            setAccount(react_1.default.createElement(AccountAxios_1.default, null));
            setSelectedButton(param);
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(reactstrap_1.ButtonGroup, null,
            react_1.default.createElement(reactstrap_1.Button, { color: selectedButton === "fetchButton" ? "primary" : "transparent", onClick: function () { return handleBtnClick("fetchButton"); } }, "Fetch"),
            react_1.default.createElement(reactstrap_1.Button, { color: selectedButton === "axiosButton" ? "primary" : "transparent", onClick: function () { return handleBtnClick("axiosButton"); } }, "Axios")),
        account || react_1.default.createElement("h3", null, "\"\uBC84\uD2BC\uC744 \uD074\uB9AD\uD558\uC138\uC694.\"")));
};
exports.default = react_1.default.memo(Account);
