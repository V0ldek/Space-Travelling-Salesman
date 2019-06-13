class Start {
    private readonly router = require('express').Router();
    public constructor() {
        this.router.get('/', function (req, res, next) {
            res.render();
        });
    }

    public getRouter() {
        return this.router;
    }
}

module.exports = Start;
