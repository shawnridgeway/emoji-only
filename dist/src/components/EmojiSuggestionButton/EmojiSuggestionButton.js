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
class EmojiSuggestionButton extends react_1.Component {
    constructor() {
        super(...arguments);
        this.handleOnClick = () => {
            this.props.onClick(this.props.emoji);
        };
    }
    render() {
        const { emoji, onClick } = this.props;
        return (<SuggestionButton type="button" onClick={this.handleOnClick}>
        {emoji}
      </SuggestionButton>);
    }
}
const SuggestionButton = styled_components_1.default.button `
	display: inline-block;
	padding: .25rem .5rem;
	margin-right: .1rem;
	margin-left: .1rem;
    margin-top: .25rem;
	border-radius: .5rem;
	background-color: #ffffff;
	border: none;
	outline: none;
	font-size: 1.5rem;
	line-height: 1;
	cursor: pointer;
	-webkit-appearance: none;
	transition: box-shadow .2s, background-color .2s;

	&:hover {
		background-color: #dddddd;
	}

	&:focus {
		box-shadow: inset 0 0 0 2px #66aaff;
	}
`;
exports.default = EmojiSuggestionButton;
//# sourceMappingURL=EmojiSuggestionButton.js.map