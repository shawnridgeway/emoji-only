// 3p
import React, { Component } from 'react';
import styled from 'styled-components';

// Project


/* --- EmojiSuggestionButton Component --- */
export interface EmojiSuggestionButtonProps {
  emoji: string;
  onClick: (emoji: string) => void;
}

class EmojiSuggestionButton extends Component<EmojiSuggestionButtonProps> {
	handleOnClick = () => {
		this.props.onClick(this.props.emoji);
	}

  render() {
  	const { emoji, onClick } = this.props;
    return (
      <SuggestionButton 
      	type="button"
      	onClick={this.handleOnClick}>
        {emoji}
      </SuggestionButton>
    );
  }
}

export const SuggestionButton = styled.button`
	display: inline-block;
	padding: .25rem .5rem;
	margin-right: .1rem;
	margin-left: .1rem;
    margin-top: .25rem;
	border-radius: .5rem;
	background-color: #ffffff;
	border: none;
	outline: none;
	font-size: 1.5rem;
	line-height: 1;
	cursor: pointer;
	-webkit-appearance: none;
	transition: box-shadow .2s, background-color .2s;

	&:hover {
		background-color: #dddddd;
	}

	&:focus {
		box-shadow: inset 0 0 0 2px #66aaff;
	}
`;

export default EmojiSuggestionButton;
