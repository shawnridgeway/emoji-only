"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3p
const react_1 = __importStar(require("react"));
// Project
const styled_components_1 = __importStar(require("../../theme/styled-components"));
const Themes_1 = require("../../theme/Themes");
class ThemePicker extends react_1.Component {
    constructor() {
        super(...arguments);
        this.setThemeLight = () => {
            this.props.onSelect(Themes_1.Themes.lightTheme);
        };
        this.setThemeDark = () => {
            this.props.onSelect(Themes_1.Themes.darkTheme);
        };
    }
    render() {
        return (<Container>
				<ThemeButton onClick={this.setThemeLight}>
					<ThemeSample thisTheme={Themes_1.Themes.lightTheme}/>
				</ThemeButton>
				<ThemeButton onClick={this.setThemeDark}>
					<ThemeSample thisTheme={Themes_1.Themes.darkTheme}/>
				</ThemeButton>
			</Container>);
    }
}
const Container = styled_components_1.default.div `
	position: fixed;
	top: 0;
	right: 0;
	padding: .25rem;
	border-radius: .5rem;
	margin-top: .5rem;
	margin-right: .5rem;
	background-color: rgba(150, 150, 150, .7);
`;
const ThemeButton = styled_components_1.default.button `
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
const ThemeSample = styled_components_1.default.span `
	display: inline-block;
	vertical-align: bottom;
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	background-color: ${props => props.theme.themes[props.thisTheme]};
`;
exports.default = styled_components_1.withTheme(ThemePicker);
//# sourceMappingURL=ThemePicker.js.map