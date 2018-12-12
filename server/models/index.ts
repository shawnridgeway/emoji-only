// 3p
import * as fs from 'fs'
import * as path from 'path'
import Sequelize from 'sequelize'


const basename = path.basename(__filename);

interface ConfigObject {
  username: string,
  password: string | null,
  database: string,
  host: string,
  dialect: string
  use_env_variable?: string
}

const env = process.env.NODE_ENV || 'development';
const db = {} as any;

let config: ConfigObject;
const data = fs.readFileSync(path.resolve(__dirname, '..', 'config', 'config.json'), 'utf8')

config = JSON.parse(data)[env] as ConfigObject

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
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
db.Sequelize = Sequelize;

export default db;
