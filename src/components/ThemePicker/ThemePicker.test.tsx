// 3p
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { ThemeProviderProps } from 'styled-components';

// Project
import ThemePicker, { ThemePickerProps, ThemeButton } from './ThemePicker';
import { ThemeProvider } from '../../theme/styled-components';
import { createSetup, itRenders } from '../../utils/testUtils';
import { Themes, ThemeShape, lightTheme } from '../../theme/Themes';


/* --- Setup --- */
const getMockFunction = () => {
	return jest.fn((theme) => {}) as (theme: Themes) => void;
}

const getInitialProps = () => ({ 
	theme: lightTheme, 
	onSelect: getMockFunction()
});

const setup = createSetup(ThemePicker, getInitialProps(), {
	themeButton: (wrapper) => wrapper.find(ThemeButton).first()
}, {
	contextComponent: ThemeProvider,
	contextProps: { theme: lightTheme } as ThemeProviderProps<ThemeShape>
});

/* --- Tests --- */
itRenders(setup().wrapper);

it('has at least one button', () => {
	const { wrapper, themeButton } = setup();
	expect(themeButton.exists()).toBe(true);
});

it('changes the theme on click', () => {
	const spyFn = getMockFunction();
	const { wrapper, themeButton } = setup({ onSelect: spyFn });
	themeButton.simulate('click');
	expect(spyFn).toBeCalled();
});
