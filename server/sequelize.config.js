const HOST = 'localhost';
const USER = 'postgres';
const PASSWORD = 'postgres';
const DB = 'store';
const dialect = 'postgres';
const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

import Sequelize from 'sequelize';
import Products from './products.module.js';
import Users from './users.module.js';
import Messages from './messages.module.js';
import Rooms from './rooms.module.js';
import FirebaseTokens from './firebaseTokens.module.js';

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
  operatorsAliases: 0,

  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = Products(sequelize, Sequelize);
db.users = Users(sequelize, Sequelize);
db.messages = Messages(sequelize, Sequelize);
db.rooms = Rooms(sequelize, Sequelize);
db.firebaseTokens = FirebaseTokens(sequelize, Sequelize);

export default db;
