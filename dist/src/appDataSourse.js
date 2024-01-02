"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
require("reflect-metadata");
dotenv_1.default.config();
const appDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'neo',
    password: process.env.POSTGRES_PASSWORD || 'pass',
    database: process.env.POSTGRES_DB || 'fordev',
    synchronize: true,
    logging: false,
    entities: [__dirname + '/../**/*Entity.{js,ts}'],
    migrations: [],
    subscribers: [],
});
exports.default = appDataSource;
