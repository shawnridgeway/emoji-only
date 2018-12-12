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
// Project
const ChatInput_1 = __importDefault(require("../ChatInput/ChatInput"));
const ChatMessages_1 = __importDefault(require("../ChatMessages/ChatMessages"));
class Chat extends react_1.Component {
    constructor(props) {
        super(props);
        this.handleSend = (message, clearInput) => {
            this.setState(prevState => ({
                messages: [...prevState.messages, {
                        body: message,
                        id: Math.random() * 1000 + '',
                        author: '',
                        submittedAt: new Date()
                    }]
            }));
            this.setState({
                messageSending: true,
                messageSendError: false,
            });
            fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ body: message })
            })
                .then(() => {
                this.setState({
                    messageSendError: true,
                });
                clearInput();
            })
                .catch(error => {
                this.setState({
                    messageSendError: true,
                });
            })
                .finally(() => {
                this.setState({
                    messageSending: false
                });
            });
        };
        this.state = {
            messages: [],
            messagesLoading: true,
            messagesLoadError: false,
            messageSending: false,
            messageSendError: false,
        };
    }
    componentDidMount() {
        this.setState({
            messagesLoading: true,
            messagesLoadError: false,
        });
        fetch('/api/messages')
            .then(res => {
            return res.json();
        })
            .then(data => {
            this.setState({
                messages: data.messages,
                messagesLoadError: false,
            });
        })
            .catch(error => {
            this.setState({
                messagesLoadError: true
            });
        })
            .finally(() => {
            this.setState({
                messagesLoading: false
            });
        });
    }
    render() {
        return (<ChatCtr>
      	<ChatMessagesCtr>
      		<ChatMessages_1.default messages={this.state.messages}/>
      	</ChatMessagesCtr>
        <ChatInputCtr>
        	<ChatInput_1.default sending={this.state.messageSending} onSend={this.handleSend}/>	
        </ChatInputCtr>
      </ChatCtr>);
    }
}
const ChatCtr = styled_components_1.default.div `
	display: flex;
	flex-direction: column;

	width: 80vw;
    max-width: 30rem;
    height: 80vh;
    max-height: 200rem;
    border-radius: .25rem;
    margin: 10vh auto;
	background-color: ${props => props.theme.color.fg};
`;
const ChatInputCtr = styled_components_1.default.div `
	flex: 0 0 0;
	padding-bottom: .5rem;
	background-color: ${props => props.theme.color.ui};
`;
const ChatMessagesCtr = styled_components_1.default.div `
	flex: 1 1 100%;
    overflow-y: auto;
`;
exports.default = Chat;
//# sourceMappingURL=Chat.js.map