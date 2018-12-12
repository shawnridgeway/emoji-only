// 3p
import React, { Component } from 'react';

// Project
import styled, { withTheme } from '../../theme/styled-components';
import { Themes, ThemeShape } from '../../theme/Themes';


/* --- ThemePicker --- */
export interface ThemePickerProps {
	onSelect: (theme: Themes) => void;
	theme: ThemeShape;
}

class ThemePicker extends Component<ThemePickerProps> {
	setThemeLight = () => {
		this.props.onSelect(Themes.lightTheme);
	}

	setThemeDark = () => {
		this.props.onSelect(Themes.darkTheme);
	}

	render() {
		return (
			<Container>
				<ThemeButton onClick={this.setThemeLight}>
					<ThemeSample thisTheme={Themes.lightTheme} />
				</ThemeButton>
				<ThemeButton onClick={this.setThemeDark}>
					<ThemeSample thisTheme={Themes.darkTheme} />
				</ThemeButton>
			</Container>
		);
	}
}

export const Container = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	padding: .25rem;
	border-radius: .5rem;
	margin-top: .5rem;
	margin-right: .5rem;
	background-color: rgba(150, 150, 150, .7);
`;

export const ThemeButton = styled.button`
	display: block;
	padding: .25rem;
	border-radius: .5rem;
	border: none;
	outline: none;
	background-color: transparent;
	cursor: pointer;
	-webkit-appearance: none;
	transition: box-shadow .2s, background-color .2s;

	&:hover {
		background-color: #888888;
	}

	&:focus {
		box-shadow: inset 0 0 0 2px #66aaff;
	}
`;

export const ThemeSample = styled.span<{ thisTheme: Themes }>`
	display: inline-block;
	vertical-align: bottom;
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	background-color: ${props => props.theme.themes[props.thisTheme]};
`;

export default withTheme(ThemePicker);
