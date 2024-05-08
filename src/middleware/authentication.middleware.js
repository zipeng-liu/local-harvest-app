"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    res.status(401).render("401");
}
exports.default = ensureAuthenticated;
