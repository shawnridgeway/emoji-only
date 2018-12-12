"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3p
const dotenv_1 = __importDefault(require("dotenv"));
// Project
const app_1 = __importDefault(require("./app"));
/* --- Main Entry Point --- */
dotenv_1.default.config();
const port = process.env.API_PORT || 8000;
const isProduction = process.env.NODE_ENV === 'production';
const app = new app_1.default(isProduction);
app.listen(port, () => console.log(`Listening on port: ${port}`));
//# sourceMappingURL=index.js.map