// 3p
import { createGlobalStyle } from './styled-components';


const GlobalStyles = createGlobalStyle`
	body {
	  margin: 0;
	  padding: 0;
	  background-color: ${props => props.theme.color.bg};

	  font-family: "Helvetica Neue", sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
`;

export default GlobalStyles;