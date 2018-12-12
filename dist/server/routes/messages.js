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
Object.defineProperty(exports, "__esModule", { value: true });
// 3p
const express = __importStar(require("express"));
// Project
const { User, Message } = require('../models/index');
const utils_1 = require("../utils");
// import { onlyEmoji } from 'emoji-utils'
const router = express.Router();
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Get latest messages
    const messages = yield Message.findAll({
        limit: 20,
        order: [['createdAt', 'DESC']]
    });
    if (!messages) {
        return res.status(500).send();
    }
    return res.status(200).json(messages);
}));
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // User not authenticated, bail
    const user = yield utils_1.getUser(req, res);
    if (!user) {
        return res.status(400).send('No user');
    }
    // Invalid body, bail
    const { body } = req.body;
    if (!body) {
        return res.status(400).send('No body');
    }
    console.log('ggg');
    // if (onlyEmoji(body) !== body) {
    //   return res.status(400).send('Non emoji characters found');
    // }
    const newMessageDraft = {
        authorId: user.id,
        body: body,
    };
    // Save message to storage
    const newMessage = yield Message.create(newMessageDraft);
    if (!newMessage) {
        return res.status(500).send();
    }
    // Emit to ws
    return res.status(200).json(newMessage);
}));
exports.default = router;
//# sourceMappingURL=messages.js.map