"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const body_parser_1 = __importDefault(require("body-parser"));
const mongodb_1 = require("./src/config/mongodb");
(0, mongodb_1.connect)();
const system_1 = require("./src/config/system");
const index_route_1 = __importDefault(require("./src/routes/admin/index.route"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.locals.prefixAdmin = system_1.systemConfig.prefixAdmin;
(0, index_route_1.default)(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
