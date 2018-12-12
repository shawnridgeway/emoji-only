"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Project
const index_1 = __importDefault(require("./models/index"));
/* --- User Utils --- */
const { User } = index_1.default;
const userNames = [
    '🐮', '🐔', '🐷', '🐶', '🐱', '🐭', '🐻', '🐴', '🐵', '🐸', '🦁', '🐰', '🐨', '🐧', '🐼',
    '🐯', '🐹', '🐺', '🐗', '🦄', '🐦', '🐤', '🐟', '🐠', '🦀', '🐝', '🐌', '🐍', '🐳', '🕷'
];
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.session.userId;
        if (!id) {
            return null;
        }
        const user = yield User.findOne({
            where: {
                id
            }
        });
        if (!user) {
            return null;
        }
        return user;
    });
}
exports.getUser = getUser;
function getRandomUserName() {
    return userNames[Math.floor(Math.random() * userNames.length)];
}
exports.getRandomUserName = getRandomUserName;
//# sourceMappingURL=utils.js.map