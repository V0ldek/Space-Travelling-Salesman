const sqlite3 = require("sqlite3");

sqlite3.verbose();
const db = new sqlite3.Database("sts.db");

db.run("CREATE TABLE user (userName VARCHAR(255) PRIMARY KEY, password VARCHAR(255) NOT NULL);");

db.run("CREATE TABLE map (id INTEGER PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL, json TEXT NOT NULL);");

db.close();