"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1["default"].Schema({
    username: String,
    password: String
});
exports["default"] = mongoose_1["default"].model("User", userSchema);
