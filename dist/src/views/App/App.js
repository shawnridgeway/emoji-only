"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3p
const react_1 = __importStar(require("react"));
// Project
const styled_components_1 = require("../../theme/styled-components");
const Chat_1 = __importDefault(require("../../components/Chat/Chat"));
const UserContext_1 = __importDefault(require("../../contexts/UserContext/UserContext"));
const GlobalStyles_1 = __importDefault(require("../../theme/GlobalStyles"));
const Themes_1 = require("../../theme/Themes");
const ThemePicker_1 = __importDefault(require("../../components/ThemePicker/ThemePicker"));
class App extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            theme: Themes_1.loadThemeSelection(),
            user: null,
        };
        this.setTheme = (theme) => {
            this.setState({
                theme: Themes_1.ThemeMap[theme]
            });
            Themes_1.saveThemeSelection(theme);
        };
    }
    componentDidMount() {
        fetch('/api/users')
            .then(res => {
            return res.json();
        })
            .then(data => {
            this.setState({
                user: data.user
            });
        })
            .catch(() => {
            // No user?
        });
    }
    render() {
        return (<styled_components_1.ThemeProvider theme={this.state.theme}>
	    	<>
					<UserContext_1.default.Provider value={this.state.user}>
		      	<Chat_1.default />
		      	<ThemePicker_1.default onSelect={this.setTheme}/>
		      </UserContext_1.default.Provider>
		      <GlobalStyles_1.default />
	      </>
      </styled_components_1.ThemeProvider>);
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map