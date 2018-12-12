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
const express = __importStar(require("express"));
// Project
const users_1 = __importDefault(require("./users"));
const messages_1 = __importDefault(require("./messages"));
/* --- Main Router --- */
const router = express.Router();
router.use('/users', users_1.default);
router.use('/messages', messages_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map