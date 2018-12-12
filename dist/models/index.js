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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sequelize_1 = __importDefault(require("sequelize"));
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};
let config;
const data = fs.readFileSync(path.resolve(__dirname, '..', 'config', 'config.json'), 'utf8');
config = JSON.parse(data)[env];
let sequelize;
if (config.use_env_variable) {
    sequelize = new sequelize_1.default(process.env[config.use_env_variable], config);
}
else {
    sequelize = new sequelize_1.default(config.database, config.username, config.password, config);
}
fs
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.default;
exports.default = db;
//# sourceMappingURL=index.js.map