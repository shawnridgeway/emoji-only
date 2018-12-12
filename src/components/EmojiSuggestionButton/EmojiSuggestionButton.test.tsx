// 3p
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';

// Project
import { createSetup, itRenders } from '../../utils/testUtils';
import EmojiSuggestionButton, { SuggestionButton } from './EmojiSuggestionButton';


/* --- Setup --- */
const emoji = '📬';

const getMockFunction = () => {
	return jest.fn((emoji) => {}) as (emoji: string) => void;
}

const getInitialProps = () => ({ 
	emoji: emoji, 
	onClick: getMockFunction()
});

const setup = createSetup(EmojiSuggestionButton, getInitialProps(), {
	suggestionButton: (wrapper) => wrapper.find(SuggestionButton).first()
});

/* --- Tests --- */
itRenders(setup().wrapper);

it('has at least one button', () => {
	const { wrapper, suggestionButton } = setup();
	expect(suggestionButton.exists()).toBe(true);
});

it('changes the theme on click', () => {
	const spyFn = getMockFunction();
	const { wrapper, suggestionButton } = setup({ onClick: spyFn });
	suggestionButton.simulate('click');
	expect(spyFn).toBeCalled();
	expect(spyFn).toBeCalledWith(emoji);
});
