// Type definitions for 'emoji-picker-react' v2.1.1
// Project: emoji-picker-react
// Definitions by: Shawn Ridgeway


declare module 'emoji-picker-react' {
	import * as React from 'react';

	export type Unified = string;

	export type Categories = {
		'people': 'people',
		'foods': 'foods',
		'nature': 'nature',
		'activity': 'activity',
		'objects': 'objects',
		'places': 'places',
		'flags': 'flags',
		'symbols': 'symbols',
	}

	export interface Emoji {
		name: string;
		diversities?: [string];
		category: string;
		unified: Unified;
		order: number;
	}

	export type CustomCategoryNames = {
		[K in keyof Categories]: string;
	}

	export type OnEmojiClick = (unified: Unified, emoji: Emoji, e: Event) => void;

	export type OpenDiversitiesMenu = (name: string) => void;

	export interface EmojiPickerProps {
		onEmojiClick: OnEmojiClick;
	    assetPath?: string;
	    emojiResolution?: number;
	    preload?: boolean;
	    customCategoryNames?: CustomCategoryNames;
	    disableDiversityPicker?: boolean;
	}

	export interface EmojiPickerState {
		filter: string;
        modifier: string;
        activeModifier: string;
        seenCategories: CustomCategoryNames;
        seenInSearch: CustomCategoryNames;
        modifiersSpread: boolean;
	}

	export interface EmojiPickerChidContext {
		customCategoryNames?: CustomCategoryNames;
	    onEmojiClick?: OnEmojiClick;
	    parent?: EmojiPicker;
	    assetPath?: string;
	    activeModifier?: string;
	    emojiResolution?: number;
	    openDiversitiesMenu?: OpenDiversitiesMenu;
	    disableDiversityPicker?: boolean;
	}

	export default class EmojiPicker extends React.Component<EmojiPickerProps, EmojiPickerState, EmojiPickerChidContext> {}
}
