// 3p
import React, { Component } from 'react';
import styled from 'styled-components';

// Project
import ChatMessage from '../ChatMessage/ChatMessage';
import { Message } from '../../types';
import { sortMessagesByCreatedAt } from '../../utils/utils';


/* --- ChatMessages Component --- */
export interface ChatMessagesProps {
  messages: Message[];
}

class ChatMessages extends Component<ChatMessagesProps> {
  render() {
  	const { messages } = this.props;
  	if (!messages) {
  		return null;
  	}
    return sortMessagesByCreatedAt(this.props.messages)
			.map(message => (
				<ChatMessage key={message.id} message={message} />
			))
  }
}

export default ChatMessages;
