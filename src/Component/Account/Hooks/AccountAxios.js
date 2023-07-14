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
var axios_1 = __importDefault(require("axios"));
var dayjs_1 = __importDefault(require("dayjs"));
var API_URL = process.env.REACT_APP_API_URL;
var API_PORT = process.env.REACT_APP_API_PORT;
var ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
var AccountAxios = function () {
    var _a = (0, react_1.useState)([]), account = _a[0], setAccount = _a[1];
    (0, react_1.useEffect)(function () {
        console.log("This is AccountAxios");
        var axiosAccount = function () {
            axios_1.default.get("".concat(API_URL).concat(API_PORT).concat(ENDPOINT))
                .then(function (response) {
                console.log(response);
                setAccount(response.data);
            })
                .catch(function (error) {
                console.log(error);
            });
        };
        axiosAccount();
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(reactstrap_1.Table, null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "\uC774\uB984"),
                    react_1.default.createElement("th", null, "\uC774\uBA54\uC77C"),
                    react_1.default.createElement("th", null, "\uAC00\uC785\uC77C"),
                    react_1.default.createElement("th", null, "\uB85C\uADF8\uC778"))),
            react_1.default.createElement("tbody", null, account && account.map(function (item) { return (react_1.default.createElement("tr", { key: item.userid },
                react_1.default.createElement("td", null, item.username),
                react_1.default.createElement("td", null, item.email),
                react_1.default.createElement("td", null, (0, dayjs_1.default)(item.rdate).format('YY.MM.DD hh:MM:ss')),
                react_1.default.createElement("td", null, (0, dayjs_1.default)(item.lastLogin).format('YY.MM.DD hh:MM:ss')))); })))));
};
exports.default = AccountAxios;
