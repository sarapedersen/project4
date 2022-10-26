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
exports.usersRouter = exports.countriesRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
// Gobal Config 
exports.countriesRouter = express_1.default.Router();
exports.usersRouter = express_1.default.Router();
exports.countriesRouter.use(express_1.default.json());
exports.usersRouter.use(express_1.default.json());
// GET Country
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
exports.countriesRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        if (database_service_1.collections.countries != undefined) {
            const country = (yield ((_b = database_service_1.collections.countries) === null || _b === void 0 ? void 0 : _b.findOne(query)));
            if (country) {
                res.status(200).send(country);
            }
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// GET User
exports.usersRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (database_service_1.collections.users != undefined) {
            const users = (yield database_service_1.collections.users.find({}).toArray());
            res.status(200).send(users);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.usersRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        if (database_service_1.collections.users != undefined) {
            const user = (yield ((_d = database_service_1.collections.users) === null || _d === void 0 ? void 0 : _d.findOne(query)));
            if (user) {
                res.status(200).send(user);
            }
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// POST
// PUT
// DELETE
