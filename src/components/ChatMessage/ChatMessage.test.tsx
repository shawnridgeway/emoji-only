// 3p
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Enzyme, { shallow, mount } from 'enzyme';
import moment from 'moment';

// Project
import ChatMessage, { ChatMessageProps, MessageBubble } from './ChatMessage';
import { Message, User } from '../../types';
import { createSetup, itRenders } from '../../utils/testUtils';
import UserContext, { UserContextShape } from '../../contexts/UserContext/UserContext';


/* --- Setup --- */
const mockBody = '📬';
const mockAuthor: User = { id: 11, name: '😱' };
const otherAuthor: User = { id: 12, name: '📬' };
const mockMessage: Message = { id: 1, body: mockBody, authorId: mockAuthor.id, createdAt: moment(), author: mockAuthor };
const initialProps: ChatMessageProps = { message: mockMessage };

const setup = createSetup(ChatMessage, initialProps, {
	messageBubble: (wrapper) => wrapper.find(MessageBubble)
}, {
	contextComponent: UserContext.Provider,
	contextProps: { value: mockAuthor as UserContextShape },
});

/* --- Tests --- */
itRenders(setup().wrapper);

it('displays the body of the message', () => {
	const { wrapper, messageBubble } = setup();
	expect(messageBubble.contains(mockBody)).toBe(true);
});

it('determines if the message is owned by the user', () => {
	const { wrapper, messageBubble } = setup();
	expect(messageBubble.prop('isOwn')).toBe(true);
});

it('determines if the message is not owned by the user', () => {
	const { wrapper, messageBubble } = setup({}, { value: otherAuthor });
	expect(messageBubble.prop('isOwn')).toBe(false);
});

