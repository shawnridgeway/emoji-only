"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const index_1 = __importDefault(require("../models/index"));
const utils_1 = require("../utils");
/* --- Users Routes --- */
const router = express.Router();
const { User, Message } = index_1.default;
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Get the current user and send forward
    const user = yield utils_1.getUser(req, res);
    if (user) {
        return res.status(200).json(user);
    }
    // No user set, make a new one
    const newUser = yield User.create({
        name: utils_1.getRandomUserName()
    });
    if (!newUser) {
        return res.status(500).send();
    }
    req.session.userId = newUser.id;
    req.session.save();
    return res.status(200).json(newUser);
}));
router.get('/:requestedUserId', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { requestedUserId } = req.params;
    const user = yield utils_1.getUser(req, res);
    // User not authenticated, bail
    if (!user) {
        return res.status(400).send();
    }
    // Get the requested user and send forward
    const requestedUser = yield User.findOne({
        where: {
            id: requestedUserId
        }
    });
    if (!requestedUser) {
        return res.status(400).send();
    }
    return res.status(200).json(requestedUser);
}));
exports.default = router;
//# sourceMappingURL=users.js.map