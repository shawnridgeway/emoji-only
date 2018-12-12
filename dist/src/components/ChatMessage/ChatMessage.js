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
const styled_components_1 = __importDefault(require("styled-components"));
const UserContext_1 = __importDefault(require("../../contexts/UserContext/UserContext"));
class ChatMessage extends react_1.Component {
    render() {
        const { message } = this.props;
        return (<UserContext_1.default.Consumer>
	    	{(user) => (<MessageCtr isOwn={user.id === message.author}>
		      	<MessageBubble isOwn={user.id === message.author}>
		        	{message.body}
		      	</MessageBubble>
		      </MessageCtr>)}
  		</UserContext_1.default.Consumer>);
    }
}
const MessageCtr = styled_components_1.default.div `
	display: block;
	margin-top: .25rem;
	margin-bottom: .25rem;
	text-align: ${props => props.isOwn ? 'right' : 'left'};
	padding-left: .5rem;
	padding-right: .5rem;
`;
const MessageBubble = styled_components_1.default.div `
	display: inline-block;
	padding: .25rem .5rem;
	background-color: #f4f4f4;
	border-radius: 
		.5rem 
		.5rem
		${props => props.isOwn ? '0' : '.5rem'} 
		${props => props.isOwn ? '.5rem' : '0'};
	text-align: left;
	font-size: 1.5rem;
	line-height: 1.1;
`;
exports.default = ChatMessage;
//# sourceMappingURL=ChatMessage.js.map