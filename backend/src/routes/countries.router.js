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
exports.countriesRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const database_service_1 = require("../services/database.service");
// Gobal Config 
exports.countriesRouter = express_1.default.Router();
exports.countriesRouter.use(express_1.default.json());
// GET
exports.countriesRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (database_service_1.collections.countries != undefined) {
            const countries = (yield database_service_1.collections.countries.find({}).toArray());
            res.status(200).send(countries);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// POST
// PUT
// DELETE
