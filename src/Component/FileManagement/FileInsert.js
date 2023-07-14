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
var axios_1 = __importDefault(require("axios"));
var react_1 = __importStar(require("react"));
var reactstrap_1 = require("reactstrap");
var react_router_dom_1 = require("react-router-dom");
var sweetalert2_1 = __importDefault(require("sweetalert2"));
var API_URL = process.env.REACT_APP_API_URL;
var API_PORT = process.env.REACT_APP_API_PORT;
var FILES_ENDPOINT = process.env.REACT_APP_API_FILES_ENDPOINT;
var url = "".concat(API_URL).concat(API_PORT).concat(FILES_ENDPOINT);
var FileInsert = function () {
    var _a = (0, react_1.useState)(null), file = _a[0], setFile = _a[1];
    var fileRef = (0, react_1.useRef)(null);
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        if (file) {
            console.log(file);
        }
    }, [file]);
    var handleSelectedFile = function (event) {
        var file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };
    var onSubmit = function (e) {
        e.preventDefault();
        if (!file) {
            SweetAlert("", "선택된 파일이 없습니다.", 'error', true);
            return;
        }
        ;
        var formData = new FormData();
        formData.append('file', file);
        axios_1.default.post("".concat(url, "/fileUpload.do"), formData)
            .then(function (response) {
            console.log('응답 데이터:', response.data);
            setFile(null);
            if (fileRef.current) {
                fileRef.current.value = '';
            }
            navigate("/files");
        })
            .catch(function (error) {
            console.error('에러:', error);
        });
    };
    var SweetAlert = function (title, content, icon, showCloseButtonFlag) {
        sweetalert2_1.default.fire({
            title: title,
            text: content,
            icon: icon,
            showCloseButton: showCloseButtonFlag
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(reactstrap_1.InputGroup, null,
            react_1.default.createElement(reactstrap_1.Input, { type: "file", innerRef: fileRef, onChange: handleSelectedFile }),
            react_1.default.createElement(reactstrap_1.Button, { type: "button", onClick: onSubmit }, "Upload")),
        react_1.default.createElement("br", null),
        react_1.default.createElement(reactstrap_1.Nav, null,
            react_1.default.createElement(reactstrap_1.NavItem, null,
                react_1.default.createElement(reactstrap_1.NavLink, { href: "/files" }, "\uB4A4\uB85C \uAC00\uAE30")))));
};
exports.default = FileInsert;
