"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Solution from https://www.styled-components.com/docs/api#typescript */
// 3p
const styledComponents = __importStar(require("styled-components"));
const { default: styled, css, createGlobalStyle, withTheme, keyframes, ThemeProvider } = styledComponents;
exports.css = css;
exports.createGlobalStyle = createGlobalStyle;
exports.withTheme = withTheme;
exports.keyframes = keyframes;
exports.ThemeProvider = ThemeProvider;
exports.default = styled;
//# sourceMappingURL=styled-components.js.map