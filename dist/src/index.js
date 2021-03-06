"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3p
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
// Project
const App_1 = __importDefault(require("./views/App/App"));
const serviceWorker = __importStar(require("./serviceWorker"));
react_dom_1.default.render(<App_1.default />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
//# sourceMappingURL=index.js.map