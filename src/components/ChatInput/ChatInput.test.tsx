// 3p
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import moment from 'moment';

// Project
import { createSetup, itRenders } from '../../utils/testUtils';
import ChatInput, { ChatInputProps, SendButton, ChatInputEl, ChatInputForm } from './ChatInput';
import ChatMessage from '../ChatMessage/ChatMessage';
import { Message, User } from '../../types';


/* --- Setup --- */
const mockBody = '📬';
const mockAuthor: User = { id: 11, name: '😱' };

const getMockFunction = () => {
	return jest.fn((message, clearInput) => {}) as (message: string, clearInput: () => void) => void;
}

const getInitialProps = () => ({ 
	onSend: getMockFunction(),
	sending: false
});

const setup = createSetup(ChatInput, getInitialProps(), {
	submitButton: (wrapper) => wrapper.find(SendButton),
	chatInput: (wrapper) => wrapper.find(ChatInputEl),
	chatForm: (wrapper) => wrapper.find(ChatInputForm),
});

/* --- Tests --- */
itRenders(setup().wrapper);

it('does not call onSend when submitting an empty string', () => {
	const spyFn = getMockFunction();
	const { wrapper, chatForm } = setup({ onSend: spyFn }, {}, true);
	chatForm.simulate('submit');
	expect(spyFn).not.toBeCalled();
});

it('calls onSend when submitting', () => {
	const spyFn = getMockFunction();
	const { wrapper, chatForm, chatInput } = setup({ onSend: spyFn }, {}, true);
	chatInput.simulate('change', { target: { value: mockBody } })
	chatForm.simulate('submit');
	expect(spyFn).toBeCalled();
});
