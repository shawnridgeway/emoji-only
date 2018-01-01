// 3p
import React, { Component } from 'react';
import styled from 'styled-components';
import emojis from 'emojis-list';
import emojiKeywords from 'emojis-keywords';

// Project
import EmojiSuggestionButton from '../EmojiSuggestionButton/EmojiSuggestionButton';
import { onlyEmoji, getNonEmojiSubString, getStringAsChars, bannedEmoji } from '../../utils/utils';
import { Message, User } from '../../types';
import UserContext from '../../contexts/UserContext/UserContext';


/* --- ChatInput Component --- */
export interface ChatInputProps {
	onSend: (message: string, clearInput: () => void) => void;
	sending: boolean;
}

export interface ChatInputState {
	messageDraft: string;
	cursorStart: number | null;
}

class ChatInput extends Component<ChatInputProps, ChatInputState> {
	private inputRef: React.RefObject<HTMLInputElement>;
	private readonly emojiSuggestionCount = 10;
	private readonly minCharacterForSuggestions = 2;
	private readonly arrowKeys = [37, 38, 39, 40];

	constructor(props: ChatInputProps) {
		super(props);
		this.state = {
			messageDraft: '',
			cursorStart: null
		};
		this.inputRef = React.createRef();
	}

	handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, selectionStart } = (e.target as HTMLInputElement);
		this.setState({
			messageDraft: value,
			cursorStart: selectionStart
		});
	}

	handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (this.arrowKeys.indexOf(e.keyCode) === -1) {
			return;
		}
		this.setState({
			cursorStart: (e.target as HTMLInputElement).selectionStart
		});
	}

	handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
		this.setState({
			cursorStart: (e.target as HTMLInputElement).selectionStart
		});
	}

	handleSuggestionClick = (emoji: string) => {
		let newCursorLoc = 0;
		this.setState(prevState => {
			const { cursorStart, messageDraft } = prevState;
			if (cursorStart === null) {
				return null;
			}
			const { startIndex, endIndex } = getNonEmojiSubString(cursorStart, messageDraft);
			const draftAsChars = getStringAsChars(messageDraft);
			const replacedMessage = [ ...draftAsChars.slice(0, startIndex), emoji, ...draftAsChars.slice(endIndex) ];
			newCursorLoc = [ ...draftAsChars.slice(0, startIndex), emoji ].join('').length;
			return {
				messageDraft: replacedMessage.join('')
			}
		}, () => {
			if (this.inputRef === null || this.inputRef.current === null) {
				return;
			}
			this.inputRef.current.focus();
			this.inputRef.current.selectionStart = newCursorLoc;
			this.inputRef.current.selectionEnd = newCursorLoc;
		})
	}

	handleSend = (e: React.FormEvent) => {
		e.preventDefault();
		const emojiOnlyMessage = onlyEmoji(this.state.messageDraft);
		if (emojiOnlyMessage.length === 0) {
			return;
		}
		this.props.onSend(emojiOnlyMessage, this.clearInput);
	}

	clearInput = () => {
		this.setState({
			messageDraft: ''
		}, () => {
			window.requestAnimationFrame(() => {
				if (this.inputRef === null || this.inputRef.current === null) {
					return;
				}
				this.inputRef.current.focus();
			})
		})
	}

	getSuggestedEmoji = () => {
		const cursorLocation = this.state.cursorStart;
		if (cursorLocation === null) {
			return [];
		}
		const value = this.state.messageDraft;
		if (value.length < this.minCharacterForSuggestions) {
			return [];
		}
		const { subString } = getNonEmojiSubString(cursorLocation, value);
		if (subString.length < this.minCharacterForSuggestions) {
			return [];
		}
		return emojiKeywords
			.map((keyword, i) => keyword.indexOf(subString) > -1 ? emojis[i] : '')
			.filter(emoji => emoji !== '' && bannedEmoji.indexOf(emoji) === -1)
	}

	renderSuggestions = () => {
		const suggestions = this.getSuggestedEmoji();
		return suggestions
			.slice(0, this.emojiSuggestionCount)
			.map(emoji => (
				<EmojiSuggestionButton 
					key={emoji}
					emoji={emoji} 
					onClick={this.handleSuggestionClick} 
				/>
			));
	}

  render() {
  	const { messageDraft } = this.state;
    return (
      <div>
      	<SuggestedEmojiCtr>
      		{this.renderSuggestions()}
      	</SuggestedEmojiCtr>
        <ChatInputForm
        	onSubmit={this.handleSend}>
        	<UserContext.Consumer>
			    	{(user: User | null) => (
			    			<ChatAvatar loading={!user}>{user ? user.name : '❔'}</ChatAvatar>
	    			)}
    			</UserContext.Consumer>
        	<ChatInputEl
        		ref={this.inputRef}
        		value={messageDraft}
        		onChange={this.handleInputChange}
        		onKeyUp={this.handleInputKeyUp}
        		onClick={this.handleInputClick}
        		placeholder="✏"
        		disabled={this.props.sending}
        		autoFocus
        	/>
        	<SendButton 
        		type="submit"
        		disabled={onlyEmoji(messageDraft).length === 0}
        	>
        		📬
      		</SendButton>
        </ChatInputForm>
      </div>
    );
  }
}

export const ChatInputForm = styled.form`
	display: flex;
	align-items: flex-end;
	padding: .25rem .5rem;
`;

export const SuggestedEmojiCtr = styled.div`
	padding: .25rem .5rem;
`;

export const ChatAvatar = styled.div<{ loading: boolean }>`
	flex: 0 0 0;
  padding-right: .1rem;
  padding-left: .5rem;
  font-size: 2rem;
  line-height: .7;
	transform: scaleX(${props => props.loading ? '1' : '-1'});
`;

export const ChatInputEl = styled.input`
	flex: 1 1 auto;
	box-sizing: border-box;
	width: 100%;
	border: none;
	border-radius: .5rem .5rem .5rem 0;
	outline: none;
	padding: .5rem 1rem;
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

export const SendButton = styled.button`
	flex: 0 0 0;

	padding: .5rem .75rem;
	margin-left: .5rem;
	border-radius: .5rem;
	background-color: #ffffff;
	border: none;
	outline: none;
	font-size: 1.5rem;
	line-height: 1.1;
	cursor: pointer;
	-webkit-appearance: none;
	transition: box-shadow .2s, background-color .2s;

	&:hover {
		background-color: #dddddd;
	}

	&:focus {
		box-shadow: inset 0 0 0 2px #66aaff;
	}

	&[disabled] {
		cursor: auto;
		background-color: #dddddd;
		color: rgba(0, 0, 0, .6);
	}
`;

export default ChatInput;
