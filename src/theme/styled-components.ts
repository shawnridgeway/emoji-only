/* Solution from https://www.styled-components.com/docs/api#typescript */
// 3p
import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

// Project
import { ThemeShape } from './Themes';


const {
  default: styled,
  css,
  createGlobalStyle,
  withTheme,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeShape>;

export { css, createGlobalStyle, withTheme, keyframes, ThemeProvider };
export default styled;