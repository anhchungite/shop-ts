"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validation {
    static isNumber(value) {
        if (isNaN(value))
            return false;
        return true;
    }
}
exports.Validation = Validation;
