"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 3p
const styled_components_1 = require("./styled-components");
const GlobalStyles = styled_components_1.createGlobalStyle `
	body {
	  margin: 0;
	  padding: 0;
	  background-color: ${props => props.theme.color.bg};

	  font-family: "Helvetica Neue", sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
`;
exports.default = GlobalStyles;
//# sourceMappingURL=GlobalStyles.js.map