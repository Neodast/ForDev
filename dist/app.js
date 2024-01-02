"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const appDataSourse_1 = __importDefault(require("./src/appDataSourse"));
const routes_1 = __importDefault(require("./src/routes/routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/', routes_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield appDataSourse_1.default.initialize();
        }
        catch (e) {
            console.log(e);
        }
        app.listen(port, () => __awaiter(this, void 0, void 0, function* () {
            console.log(`Example app listening on port ${port}!`);
        }));
    });
}
start();
