"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing module
const express_1 = __importDefault(require("express"));
const database_service_1 = require("./src/services/database.service");
const countries_router_1 = require("./src/routes/countries.router");
const app = (0, express_1.default)();
const PORT = 4000;
// Handling GET / request
(0, database_service_1.connectToDatabase)()
    .then(() => {
    app.use("/countries", countries_router_1.countriesRouter);
    app.use("/users", countries_router_1.usersRouter);
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
// app.get('/', (req, res) => {
//     res.send('Welcome to typescript backend!');
// })
// // Server setup
// app.listen(PORT, () => {
//     console.log('The application is listening ' + 'on port http://localhost:' +PORT);
// })
