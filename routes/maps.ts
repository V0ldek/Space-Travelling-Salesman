class Maps {
    private readonly router = require("express").Router();
    private readonly multer = require("multer");
    private readonly storage = this.multer.memoryStorage();
    private readonly upload = this.multer({
        storage: this.storage,
        limits: {
            fieldNameSize: 256,
            fileSize: 1024 * 1024
        }
    });
    private readonly sqlite3 = require("sqlite3");

    public constructor() {
        this.router.get("/", (request, result) => {
            const maps = [];
            const db = new this.sqlite3.Database("sts.db");
            try {
                db.all("SELECT id, name FROM map",
                    (err, rows) => {
                        if (err) {
                            console.error(`SQLite error during get: ${err}`);
                            result.status(500).send("Internal Server Error");
                            return;
                        }
                        rows.forEach(row => {
                            maps.push(row);
                        });
                        result.status(200).send(JSON.stringify(maps));
                    });
            } finally {
                db.close();
            }
        });

        this.router.get("/:id", (request, result) => {
            const id = request.params.id;
            const db = new this.sqlite3.Database("sts.db");
            try {
                db.get("SELECT json FROM map WHERE id = ?",
                    [id],
                    (err, row) => {
                        if (err) {
                            console.error(`SQLite error during get: ${err}`);
                            result.status(500).send("Internal Server Error");
                            return;
                        }
                        if (!row) {
                            result.status(404).send(`Map ${id} not found.`);
                            return;
                        }
                        result.status(200).send(row.json);
                    }
                )
            } finally {
                db.close();
            }
        });

        this.router.post("/upload", this.upload.single("mapFile"), (request, result) => {
            const file = request.file;
            if (!file) {
                result.status(400).send("Select a file.");
                return;
            }
            if (!request.body.mapName) {
                result.status(400).send("Enter a name.");
                return;
            }
            const jsonString = file.buffer.toString();
            try {
                this.validate(JSON.parse(jsonString));
            } catch (error) {
                result.status(400).send("Map is invalid: " + error.message);
                return;
            }
            const db = new this.sqlite3.Database("sts.db");
            try {
                db.run("INSERT INTO map (name, json) VALUES (?, ?)",
                    [request.body.mapName, jsonString],
                    err => {
                        if (err) {
                            if (err.errno == 19) {
                                result.status(400).send("A map with this name already exists.");
                                return;
                            }
                            console.error(`SQLite error during upload: ${err}`);
                            result.status(500).send("Internal Server Error");
                            return;
                        }
                        result.status(200).send("OK");
                    });
            } finally {
                db.close();
            }
        });
    }

    public getRouter() {
        return this.router;
    }

    private validate(json) {
        const gameDuration = json.game_duration;
        const initialCredits = json.initial_credits;
        const items = json.items;
        const planets = json.planets;
        const starships = json.starships;

        if (!gameDuration) {
            throw new Error("no game duration.");
        }
        if (!initialCredits) {
            throw new Error("no initial credits.");
        }
        if (!items || !items.length) {
            throw new Error("no items.");
        }
        if (!planets) {
            throw new Error("no planets.");
        }
        if (!starships) {
            throw new Error("no starships.");
        }
        if (gameDuration <= 0) {
            throw new Error("invalid game duration.");
        }
        if (initialCredits <= 0) {
            throw new Error("invalid initial credits");
        }
        if (items.length > 20) {
            throw new Error("too many items.");
        }
        if (Object.keys(planets).length > 20) {
            throw new Error("too many items.");
        }
        if (Object.keys(starships).length > 20) {
            throw new Error("too many items.");
        }

        for (const planetName in planets) {
            const planet = planets[planetName];
            if (planet.x < 0 || planet.x >= 100 || planet.y < 0 || planet.y >= 100) {
                throw new Error(`planet ${planetName} has invalid coordinates.`);
            }
            for (const itemName in planet.available_items) {
                if (items.every(i => i != itemName)) {
                    throw new Error(`planet ${planetName} has an invalid item ${itemName}.`);
                }
                const item = planet.available_items[itemName];
                if (item.available < 0 || item.buy_price < 0 || item.sell_price < 0) {
                    throw new Error(`availability of ${itemName} on ${planetName} is invalid.`);
                }
            }
        }

        for (const starshipName in starships) {
            const starship = starships[starshipName];
            if (starship.cargo_hold_size < 0) {
                throw new Error(`invalid cargo hold size of ${starshipName}.`);
            }
            if (!planets.hasOwnProperty(starship.position)) {
                throw new Error(`invalid position ${starship.position} of ship ${starshipName}.`);
            }
        }
    }
}

module.exports = Maps;
