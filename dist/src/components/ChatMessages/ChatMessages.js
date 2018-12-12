"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3p
const react_1 = __importStar(require("react"));
// Project
const ChatMessage_1 = __importDefault(require("../ChatMessage/ChatMessage"));
class ChatMessages extends react_1.Component {
    render() {
        return this.props.messages
            .map(message => (<ChatMessage_1.default key={message.id} message={message}/>));
    }
}
exports.default = ChatMessages;
//# sourceMappingURL=ChatMessages.js.map