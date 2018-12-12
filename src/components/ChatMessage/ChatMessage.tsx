// 3p
import React, { Component } from 'react';
import styled from 'styled-components';

// Project
import { Message, User } from '../../types';
import UserContext from '../../contexts/UserContext/UserContext';


/* --- ChatMessage Component --- */
export interface ChatMessageProps {
  message: Message;
}

class ChatMessage extends Component<ChatMessageProps> {
  render() {
  	const { message } = this.props;
    return (
    	<UserContext.Consumer>
	    	{(user: User | null) => {
	    		const isOwn = !!user && user.id === message.author.id;
	    		return (
						<MessageCtr isOwn={isOwn}>
							<MessageAvatar isOwn={isOwn}>
								{message.author.name}
							</MessageAvatar>
			      	<MessageBubble isOwn={isOwn}>
			        	{message.body}
			      	</MessageBubble>
			      </MessageCtr>
	  			);
	  		}}
  		</UserContext.Consumer>
    );
  }
}

interface StyledChatProps {
  isOwn: boolean;
}

export const MessageCtr = styled.div<StyledChatProps>`
	display: flex;
	justify-content: ${props => props.isOwn ? 'flex-start' : 'flex-end'};
	align-items: flex-end;
	padding-left: .5rem;
	padding-right: .5rem;
	margin-top: .25rem;
	margin-bottom: .25rem;
`;

export const MessageBubble = styled.div<StyledChatProps>`
	flex: 0 1 auto;
	order: ${props => props.isOwn ? '1' : '0'};
	max-width: 22rem;
	padding: .25rem .5rem;
	background-color: #f4f4f4;
	border-radius: 
		.5rem 
		.5rem 
		${props => props.isOwn ? '.5rem' : '0'}
		${props => props.isOwn ? '0' : '.5rem'};
	font-size: 1.5rem;
	line-height: 1.1;
`;

export const MessageAvatar = styled.div<StyledChatProps>`
	flex: 0 0 0;
	order: ${props => props.isOwn ? '0' : '1'};
	margin-left: .25rem;
	margin-right: .25rem;
	font-size: .75rem;
	line-height: 1;
	${props => props.isOwn 
		? 'transform: scaleX(-1);' 
		: ''
	};
`;

export default ChatMessage;
