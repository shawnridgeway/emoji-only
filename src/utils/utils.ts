// 3p
import emojiRegexFactory from 'emoji-regex';
import GraphemeSplitter from 'grapheme-splitter';
import moment from 'moment';


// Project
import { Message, RawMessage } from '../types';



const emojiRegex = emojiRegexFactory();
const splitter = new GraphemeSplitter();

// getStringAsChars
export function getStringAsChars(string: string) {
	return splitter.splitGraphemes(string); 
}

// onlyEmoji
export function onlyEmoji(message: string) {
	const chars = getStringAsChars(message);
	return chars
		.filter(char => char.search(emojiRegex) !== -1)
		.join('')
}

// getNonEmojiSubString
export function getNonEmojiSubString(rawStart: number, rawMessage: string) {
	const chars = getStringAsChars(rawMessage);
	const start = getStringAsChars(rawMessage.slice(0, rawStart)).length;
	const stringBefore = getNonEmojiSubStringHelper(start - 1, true, chars);
	const stringAfter = getNonEmojiSubStringHelper(start, false, chars);

	return {
		startIndex: stringBefore.index,
		endIndex: stringAfter.index,
		subString: stringBefore.subString + stringAfter.subString
	};
}

function getNonEmojiSubStringHelper(index: number, backward: boolean, chars: string[]): { index: number, subString: string } {
	// Out of array bounds
	if (index < 0 || index >= chars.length) {
		return { index: index + (backward ? 1 : 0), subString: '' };
	}

	// Encounters an emoji
	if (chars[index].search(emojiRegex) > -1) {
		return { index: index + (backward ? 1 : 0), subString: '' };
	}

	// Continue forward or backward
	const nextResult = backward
		? getNonEmojiSubStringHelper(index - 1, true, chars)
		: getNonEmojiSubStringHelper(index + 1, false, chars);
	return backward 
		? { 
				index: nextResult.index, 
				subString: nextResult.subString + chars[index] 
			}
		: { 
				index: nextResult.index, 
				subString: chars[index] + nextResult.subString 
			};
}

// Prepare Messages
export function prepareMessage(rawMessage: RawMessage): Message {
	return {
		...rawMessage,
		createdAt: moment(rawMessage.createdAt)
	};
}

export function prepareMessages(rawMessages: RawMessage[]): Message[] {
	return rawMessages
			.map(prepareMessage);
}

// Sort Messages
export function sortMessagesByCreatedAt(messages: Message[]): Message[] {
	return messages
    	.slice()
    	.sort((a, b) => a.createdAt.isBefore(b.createdAt) ? -1 : 1);
}
