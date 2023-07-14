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
var reactstrap_2 = require("reactstrap");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = __importDefault(require("axios"));
var sweetalert2_1 = __importDefault(require("sweetalert2"));
var dayjs_1 = __importDefault(require("dayjs"));
var API_URL = process.env.REACT_APP_API_URL;
var API_PORT = process.env.REACT_APP_API_PORT;
var FILES_ENDPOINT = process.env.REACT_APP_API_FILES_ENDPOINT;
var url = "".concat(API_URL).concat(API_PORT).concat(FILES_ENDPOINT);
var FileList = function () {
    var _a = (0, react_1.useState)([]), fileList = _a[0], setFileList = _a[1];
    var _b = (0, react_1.useState)(1), pageNum = _b[0], setPageNum = _b[1];
    var _c = (0, react_1.useState)(0), pageSize = _c[0], setPageSize = _c[1];
    var _d = (0, react_1.useState)(0), totalCount = _d[0], setTotalCount = _d[1];
    var _e = (0, react_1.useState)(0), totalPageCount = _e[0], setTotalPageCount = _e[1];
    var history = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        var getFileList = function () {
            axios_1.default.get("".concat(url, "/fileList.do"))
                .then(function (response) {
                console.log(response.data);
                if (response.data) {
                    setFileList(response.data.list.content);
                    setPageNum(response.data.pageNum + 1);
                    setPageSize(response.data.pageSize);
                    setTotalCount(response.data.totalCount);
                }
            })
                .catch(function (error) {
                //SweetAlert("Error", error, "error", true);
                console.log(error);
            });
        };
        getFileList();
    }, [pageNum, pageSize]);
    var SweetAlert = function (title, content, icon, showCloseButtonFlag) {
        sweetalert2_1.default.fire({
            title: title,
            text: content,
            icon: icon,
            showCloseButton: showCloseButtonFlag
        });
    };
    var paginationItems = [];
    var _loop_1 = function (i) {
        if (i === pageNum) {
            console.log("true");
        }
        else {
            console.log("false");
        }
        paginationItems.push(react_1.default.createElement(reactstrap_2.PaginationItem, { key: i, active: i === pageNum },
            react_1.default.createElement(reactstrap_2.PaginationLink, { onClick: function () { return chgPage(i, pageSize); } }, i)));
    };
    for (var i = 1; i <= totalPageCount; i++) {
        _loop_1(i);
    }
    var chgPage = function (pageNum, pageSize) {
        history("/files/list?pageNum=".concat(pageNum, "&pageSize=").concat(pageSize));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h4", null, "FileList"),
        react_1.default.createElement(reactstrap_1.Table, null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "\uBC88\uD638"),
                    react_1.default.createElement("th", null, "\uD30C\uC77C\uBA85"),
                    react_1.default.createElement("th", null, "\uD06C\uAE30"),
                    react_1.default.createElement("th", null, "\uD0C0\uC785"),
                    react_1.default.createElement("th", null, "\uC5C5\uB85C\uB4DC \uC2DC\uAC04"),
                    react_1.default.createElement("th", null, "\uC218\uC815 \uC2DC\uAC04"))),
            react_1.default.createElement("tbody", null, fileList && fileList.map(function (item) { return (react_1.default.createElement("tr", { key: item.fid },
                react_1.default.createElement("td", null, item.fid),
                react_1.default.createElement("td", null, item.ofname),
                react_1.default.createElement("td", null,
                    item.fileSize,
                    " Bytes"),
                react_1.default.createElement("td", null, item.fileType),
                react_1.default.createElement("td", null, (0, dayjs_1.default)(item.rdate).format('YY.MM.DD hh:MM:ss')),
                react_1.default.createElement("td", null, (0, dayjs_1.default)(item.udate).format('YY.MM.DD hh:MM:ss')))); })),
            react_1.default.createElement("tfoot", null)),
        react_1.default.createElement(reactstrap_2.Pagination, { size: "sm", "aria-label": 'Page navigation example' },
            react_1.default.createElement(reactstrap_2.PaginationItem, { disabled: pageNum === 1 },
                react_1.default.createElement(reactstrap_2.PaginationLink, { previous: true, onClick: function () { return chgPage(pageNum - 1, pageSize); } })),
            paginationItems,
            react_1.default.createElement(reactstrap_2.PaginationItem, { disabled: pageNum === totalPageCount },
                react_1.default.createElement(reactstrap_2.PaginationLink, { next: true, onClick: function () { return chgPage(pageNum + 1, pageSize); } })))));
};
exports.default = FileList;
