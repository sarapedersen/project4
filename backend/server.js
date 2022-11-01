"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing module
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const dotenv = __importStar(require("dotenv"));
const schema_1 = require("./src/schema");
const app = (0, express_1.default)();
const cors = require('cors');
const PORT = 3020;
dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONN_STRING);
mongoose.connection.once('open', () => {
    console.log('connected to database');
});
app.use(cors());
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.schema,
    graphiql: true,
}));
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
