class Users {
    private readonly sqlite3 = require("sqlite3");
    private readonly router = require("express").Router();

    public constructor() {
        this.router.post("/login", (request, result, next) => {
            const userName = request.body.userName;
            const password = request.body.password;
            if (!userName || !password) {
                result.status(400).send("Supply user name and password.");
                return;
            }
            next();
        }, (req, res) => this.login(req, res));

        this.router.post("/logout", (request, result) => {
            result.cookie("STS_USER", "", {maxAge: -1, httpOnly: false});
            result.status(200).send("OK");
        });

        this.router.post("/register", (request, result, next) => {
            const userName = request.body.userName;
            const password = request.body.password;
            const repeatPassword = request.body.repeatPassword;
            if (!userName || !password) {
                result.status(400).send("Supply user name and password.");
                return;
            }
            if (userName == "Guest") {
                result.status(400).send("Cannot create an account with this name.");
                return;
            }
            if (password != repeatPassword) {
                result.status(400).send("Passwords do not match.");
                return;
            }
            next();
        }, (req, res) => this.register(req, res));
    }

    public getRouter() {
        return this.router;
    }

    public static authorize(request, result, next) {
        const cookie = request.cookies.STS_USER;
        if (!cookie) {
            request.status(403).send("Unauthorized");
            return;
        }
        next();
    }

    private login(request, result) {
        const userName = request.body.userName;
        const password = request.body.password;
        this.sqlite3.verbose();
        const db = new this.sqlite3.Database("sts.db");
        try {
            db.get(
                "SELECT password FROM user WHERE userName = (?)",
                [userName],
                (err, row) => {
                    if (err) {
                        console.error(`SQLite error during login: ${err}`);
                        result.status(500).send("Internal Server Error");
                        return;
                    }
                    if (!row) {
                        result.status(400).send("Wrong user name.");
                        return;
                    }
                    if (password != row.password) {
                        result.status(403).send("Wrong password.");
                        return;
                    }
                    result.cookie("STS_USER", userName, {maxAge: 60 * 60 * 1000, httpOnly: false});
                    result.status(200).send("OK");
                });
        } finally {
            db.close();
        }
    }

    private register(request, result) {
        this.sqlite3.verbose();
        const db = new this.sqlite3.Database("sts.db");
        try {
            db.run(
                "INSERT INTO user (userName, password) VALUES (?, ?)",
                [request.body.userName, request.body.password],
                (err) => {
                    if (err) {
                        if(err.errno == 19) {
                            result.status(400).send("An account with this user name already exists.");
                            return;
                        }
                        console.error(`SQLite error during register: ${err}`);
                        result.status(500).send("Internal Server Error");
                        return;
                    }
                    result.status(200).send("OK");
                });
        } finally {
            db.close();
        }
    }
}

module.exports = Users;
