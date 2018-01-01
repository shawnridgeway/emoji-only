// 3p
import React, { Component } from 'react';
import styled from 'styled-components';

// Project
import ChatInput from '../ChatInput/ChatInput';
import ChatMessages from '../ChatMessages/ChatMessages';
import { Message, RawMessage } from '../../types';
import { prepareMessage, sortMessagesByCreatedAt } from '../../utils/utils';
import Api from '../../api/api';


/* --- ChatInput Component --- */
export interface ChatProps {

}

export interface ChatState {
	messages: Message[];
	messagesLoading: boolean;
	messagesLoadError: boolean;
	messageSending: boolean;
	messageSendError: boolean;
}

class Chat extends Component<ChatProps, ChatState> {
	private scrollCtrRef: React.RefObject<HTMLDivElement>;

	constructor(props: ChatProps) {
		super(props);
		this.state = {
			messages: [],
			messagesLoading: true,
			messagesLoadError: false,
			messageSending: false,
			messageSendError: false,
		}
		this.scrollCtrRef = React.createRef();
	}

	componentDidMount() {
		// Get initial messages to display
		this.setState({
			messagesLoading: true,
			messagesLoadError: false,
		})
		Api.getMessages()
			.then(messages => {
				this.setState({
					messages: messages,
					messagesLoadError: false,
				})
			})
			.catch(error => {
				this.setState({
					messagesLoadError: true
				})
			})
			.finally(() => {
				this.setState({
					messagesLoading: false
				})
			})

		// Listen for new messages
    Api.subscribeMessages()
    	.then(messages => {
    		messages.forEach(this.addNewMessage);
    	})
	}

  componentWillUnmount() {
  	// Stop listening for new messages
    Api.unsubscribeMessages();
  }

  componentDidUpdate(prevProps: ChatProps, prevState: ChatState) {
  	if (prevState.messages.length !== this.state.messages.length) {
  		this.scrollMessageToBottom();
  	}
  }

  addNewMessage = (message: Message) => {
  	this.setState(prevState => ({
      messages: sortMessagesByCreatedAt([ ...prevState.messages, message ])
    }))
  }

  scrollMessageToBottom = () => {
		window.requestAnimationFrame(() => {
			if (this.scrollCtrRef && this.scrollCtrRef.current) {
				this.scrollCtrRef.current.scrollTop = this.scrollCtrRef.current.scrollHeight;
			}
		})
  }

	handleSend = (message: string, clearInput: () => void) => {
		this.setState({
			messageSending: true,
			messageSendError: false,
		})
		Api.sendMessage(message)
			.then(res => {
				this.setState({
					messageSendError: false
				})
				clearInput();
			})
			.catch(error => {
				this.setState({
					messageSendError: true
				})
			})
			.finally(() => {
				this.setState({
					messageSending: false
				})
			})
	}

  render() {
    return (
      <ChatCtr>
      	<ChatTitle>🔤👎🏽😃👍🏽</ChatTitle>
      	<ChatMessagesCtr ref={this.scrollCtrRef}>
      		<ChatMessages messages={this.state.messages} />
      	</ChatMessagesCtr>
        <ChatInputCtr>
        	<ChatInput 
	        	sending={this.state.messageSending} 
	        	onSend={this.handleSend} 
        	/>	
        </ChatInputCtr>
      </ChatCtr>
    );
  }
}

export const ChatCtr = styled.div`
	display: flex;
	flex-direction: column;

	width: 80vw;
  max-width: 30rem;
  height: 80vh;
  max-height: 200rem;
  border-radius: .25rem;
  margin: 10vh auto;

	@media (max-width: 500px) {
		width: 100vw;
		height: 100vh;
		max-width: none;
		max-height: none;
  	border-radius: 0;
  	margin: 0;
	}
`;

export const ChatTitle = styled.div`
	flex: 0 0 0;
	padding-top: .5rem;
	padding-bottom: .5rem;
  background-color: ${props => props.theme.color.ui};
  font-size: 1.5rem;
  text-align: center;
`;

export const ChatInputCtr = styled.div`
	flex: 0 0 0;
	padding-bottom: .5rem;
	background-color: ${props => props.theme.color.ui};
`;

export const ChatMessagesCtr = styled.div`
	flex: 1 1 100%;
  padding-top: .5rem;
  padding-bottom: .5rem;
  overflow-y: auto;
  background-color: ${props => props.theme.color.fg};
`;

export default Chat;
