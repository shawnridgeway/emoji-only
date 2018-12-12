// 3p
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import moment from 'moment';

// Project
import { createSetup, itRenders } from '../../utils/testUtils';
import ChatMessages, { ChatMessagesProps } from './ChatMessages';
import ChatMessage from '../ChatMessage/ChatMessage';
import { Message, User } from '../../types';


/* --- Setup --- */
const mockBody = '📬';
const mockAuthor: User = { id: 11, name: '😱' };
const otherAuthor: User = { id: 12, name: '📬' };
const mockMessages = [
	{ id: 1, body: mockBody, authorId: mockAuthor.id, createdAt: moment(), author: mockAuthor },
	{ id: 2, body: mockBody, authorId: mockAuthor.id, createdAt: moment(), author: mockAuthor },
	{ id: 3, body: mockBody, authorId: mockAuthor.id, createdAt: moment(), author: mockAuthor },
];

const getInitialProps = () => ({ 
	messages: mockMessages
});

const setup = createSetup(ChatMessages, getInitialProps(), {
	chatMessages: (wrapper) => wrapper.find(ChatMessage)
});

/* --- Tests --- */
itRenders(setup().wrapper);

it('renders null if no messages passed in', () => {
	const { wrapper, chatMessages } = setup({ messages: [] });
	expect(chatMessages).toHaveLength(0);
});

it('renders all messages passed in', () => {
	const { wrapper, chatMessages } = setup();
	expect(chatMessages).toHaveLength(3);
});
