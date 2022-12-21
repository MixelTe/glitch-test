"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const sqlite3_1 = require("sqlite3");
const path = require("path");
const sqlite3 = (0, sqlite3_1.verbose)();
class DataBase {
    db;
    constructor(dbpath) {
        dbpath = path.resolve(__dirname, dbpath);
        this.db = new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE, e => {
            if (e)
                throw e;
            console.log(`Connected to the ${dbpath} database.`);
        });
    }
    all(sql, params) {
        return this.req(this.db.all.bind(this.db, sql, params));
    }
    first(sql, params) {
        return this.req(this.db.get.bind(this.db, sql, params));
    }
    commit(sql, params) {
        return this.req(this.db.run.bind(this.db, sql, params));
    }
    req(f) {
        return createPromise((resolve, reject) => {
            f((err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
}
exports.DataBase = DataBase;
function createPromise(f) {
    return new Promise((resolve, reject) => {
        try {
            f(resolve, reject);
        }
        catch (e) {
            reject(e);
        }
    });
}
