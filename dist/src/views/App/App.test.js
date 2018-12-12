"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3p
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
// Project
const App_1 = __importDefault(require("./App"));
it('renders without crashing', () => {
    const div = document.createElement('div');
    react_dom_1.default.render(<App_1.default />, div);
    react_dom_1.default.unmountComponentAtNode(div);
});
//# sourceMappingURL=App.test.js.map