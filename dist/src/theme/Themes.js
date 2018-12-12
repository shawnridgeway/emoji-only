"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Color Constants
const white = '#ffffff';
const grey900 = '#eeeeee';
const grey800 = '#d2d2d2';
const grey400 = '#444444';
const grey300 = '#333333';
const grey200 = '#222222';
const black = '#000000';
const blue800 = '#66aaff';
// Types
var Themes;
(function (Themes) {
    Themes["lightTheme"] = "light-theme";
    Themes["darkTheme"] = "dark-theme";
})(Themes = exports.Themes || (exports.Themes = {}));
// Themes
const themes = {
    [Themes.lightTheme]: white,
    [Themes.darkTheme]: grey300,
};
exports.lightTheme = {
    color: {
        accentPrimary: '#',
        fontPrimary: grey300,
        fontSecondary: '#',
        bg: grey800,
        fg: white,
        ui: grey900,
        focus: blue800
    },
    themes
};
exports.darkTheme = {
    color: {
        accentPrimary: '#',
        fontPrimary: white,
        fontSecondary: '#',
        bg: grey200,
        fg: grey400,
        ui: grey300,
        focus: blue800
    },
    themes
};
// Theme Utils
exports.ThemeMap = {
    [Themes.lightTheme]: exports.lightTheme,
    [Themes.darkTheme]: exports.darkTheme,
};
exports.saveThemeSelection = (theme) => {
    window.localStorage.setItem('theme', theme.toString());
};
exports.loadThemeSelection = () => {
    return exports.ThemeMap[window.localStorage.getItem('theme')] || exports.lightTheme;
};
//# sourceMappingURL=Themes.js.map