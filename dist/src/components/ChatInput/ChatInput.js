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
const emojis_list_1 = __importDefault(require("emojis-list"));
const emojis_keywords_1 = __importDefault(require("emojis-keywords"));
// Project
const EmojiSuggestionButton_1 = __importDefault(require("../EmojiSuggestionButton/EmojiSuggestionButton"));
const utils_1 = require("../../utils/utils");
class ChatInput extends react_1.Component {
    constructor(props) {
        super(props);
        this.inputRef = react_1.default.createRef();
        this.handleInputChange = (e) => {
            const { value, selectionStart } = e.target;
            this.setState({
                messageDraft: value,
                cursorStart: selectionStart
            });
        };
        this.handleInputKeyUp = (e) => {
            if ([37, 38, 39, 40].indexOf(e.keyCode) === -1) {
                return;
            }
            this.setState({
                cursorStart: e.target.selectionStart
            });
        };
        this.handleInputClick = (e) => {
            this.setState({
                cursorStart: e.target.selectionStart
            });
        };
        this.handleSuggestionClick = (emoji) => {
            let newCursorLoc = 0;
            this.setState(prevState => {
                const { cursorStart, messageDraft } = prevState;
                if (cursorStart === null) {
                    return null;
                }
                const { startIndex, endIndex } = utils_1.getNonEmojiSubString(cursorStart, messageDraft);
                const draftAsChars = utils_1.getStringAsChars(messageDraft);
                const replacedMessage = [...draftAsChars.slice(0, startIndex), emoji, ...draftAsChars.slice(endIndex)];
                newCursorLoc = [...draftAsChars.slice(0, startIndex), emoji].join('').length;
                return {
                    messageDraft: replacedMessage.join('')
                };
            }, () => {
                if (this.inputRef === null || this.inputRef.current === null) {
                    return;
                }
                this.inputRef.current.focus();
                this.inputRef.current.selectionStart = newCursorLoc;
                this.inputRef.current.selectionEnd = newCursorLoc;
            });
        };
        this.handleSend = (e) => {
            e.preventDefault();
            const emojiOnlyMessage = utils_1.onlyEmoji(this.state.messageDraft);
            if (emojiOnlyMessage.length === 0) {
                return null;
            }
            this.props.onSend(emojiOnlyMessage, this.clearInput);
        };
        this.clearInput = () => {
            this.setState({
                messageDraft: ''
            });
        };
        this.getSuggestedEmoji = () => {
            const cursorLocation = this.state.cursorStart;
            if (cursorLocation === null) {
                return [];
            }
            const value = this.state.messageDraft;
            if (value.length < 3) {
                return [];
            }
            const { subString } = utils_1.getNonEmojiSubString(cursorLocation, value);
            if (subString.length < 3) {
                return [];
            }
            return emojis_keywords_1.default
                .map((keyword, i) => (keyword.indexOf(subString) > -1 ? emojis_list_1.default[i] : ''))
                .filter(emoji => emoji !== '');
        };
        this.renderSuggestions = () => {
            const suggestions = this.getSuggestedEmoji();
            return suggestions
                .slice(0, 10)
                .map(emoji => (<EmojiSuggestionButton_1.default key={emoji} emoji={emoji} onClick={this.handleSuggestionClick}/>));
        };
        this.state = {
            messageDraft: '',
            cursorStart: null
        };
    }
    render() {
        const { messageDraft } = this.state;
        return (<div>
      	<SuggestedEmojiCtr>
      		{this.renderSuggestions()}
      	</SuggestedEmojiCtr>
        <ChatInputForm onSubmit={this.handleSend}>
        	<ChatInputEl ref={this.inputRef} value={messageDraft} onChange={this.handleInputChange} onKeyUp={this.handleInputKeyUp} onClick={this.handleInputClick} placeholder="✏" disabled={this.props.sending} autoFocus/>
        </ChatInputForm>
      </div>);
    }
}
const ChatInputForm = styled_components_1.default.form `
	padding: .25rem .5rem;
`;
const SuggestedEmojiCtr = styled_components_1.default.div `
	padding: .25rem .5rem;
`;
const ChatInputEl = styled_components_1.default.input `
	display: block;
	box-sizing: border-box;
	width: 100%;
	border: none;
	border-radius: 1rem;
	outline: none;
	padding: .25rem 1rem;
	background-color: #ffffff;
	font-size: 1.5rem;
	line-height: 1.1;
	transition: box-shadow .2s;

	&::placeholder {
		opacity: .5;
	}

	&:focus {
		box-shadow: inset 0 0 0 2px #66aaff;
	}
`;
exports.default = ChatInput;
//# sourceMappingURL=ChatInput.js.map