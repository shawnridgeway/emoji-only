"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3p
const emoji_regex_1 = __importDefault(require("emoji-regex"));
const grapheme_splitter_1 = __importDefault(require("grapheme-splitter"));
const emojiRegex = emoji_regex_1.default();
const splitter = new grapheme_splitter_1.default();
// getStringAsChars
function getStringAsChars(string) {
    return splitter.splitGraphemes(string);
}
exports.getStringAsChars = getStringAsChars;
// onlyEmoji
function onlyEmoji(message) {
    const chars = getStringAsChars(message);
    return chars
        .filter(char => char.search(emojiRegex) !== -1)
        .join('');
}
exports.onlyEmoji = onlyEmoji;
// getNonEmojiSubString
function getNonEmojiSubString(rawStart, rawMessage) {
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
exports.getNonEmojiSubString = getNonEmojiSubString;
function getNonEmojiSubStringHelper(index, backward, chars) {
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
//# sourceMappingURL=utils.js.map