"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const Url = require("url");
const fs = require("fs");
const database_1 = require("./database");
class API {
    routes = [];
    PrettyPrint = false;
    db = new database_1.DataBase("../data/db.db");
    RouteError = RouteError;
    async process(req) {
        const method = Methods.includes(req.method) ? req.method : "GET";
        if (method == "OPTIONS")
            return { status: 200, body: `"ok"`, type: "application/json" };
        const urlParsed = Url.parse(req.url || "", true);
        if (urlParsed.pathname) {
            for (const route of this.routes) {
                if (route.method == method && this.checkRoute(route, urlParsed.pathname, urlParsed.query)) {
                    try {
                        const routeThis = {
                            reqHeaders: req.headers,
                            resHeaders: {},
                            readBodyJSON: this.readBodyJSON.bind(this, req),
                        };
                        const r = await route.route.bind(routeThis)(urlParsed.query) || "ok";
                        return {
                            status: 200,
                            body: route.stringify ?
                                (route.prettyPrint || this.PrettyPrint ? JSON.stringify(r, undefined, 4) : JSON.stringify(r))
                                : r,
                            type: RouteTypes[route.type],
                            headers: routeThis.resHeaders,
                        };
                    }
                    catch (e) {
                        if (e instanceof RouteError) {
                            return { status: 400, body: JSON.stringify(e.message), type: "application/json" };
                        }
                        console.log(`Error: route: ${route.path + "?" + route.reqParams.join("&")}; path: ${urlParsed.pathname}; query: ${JSON.stringify(urlParsed.query)}`);
                        console.log(e);
                        return { status: 500, body: `"API error"`, type: "application/json" };
                    }
                }
            }
        }
        return { status: 404, body: "Page not found", type: "application/json" };
    }
    addRoute(method, path, type, route, stringify = false, prettyPrint = false) {
        const pathSplited = path.split("?");
        this.routes.push({
            route,
            path: pathSplited[0],
            reqParams: pathSplited.length == 2 ? pathSplited[1].split("&") : [],
            prettyPrint,
            type: type,
            stringify,
            method,
        });
    }
    addRouteJSON(path, route, prettyPrint = false) {
        this.addRoute("GET", path, "json", route, true, prettyPrint);
    }
    addRouteSqlFirst(path, sql, queryParams, postprocess) {
        this.addRouteSql(path, sql, queryParams, true, postprocess);
    }
    addRouteSqlAll(path, sql, queryParams, postprocess) {
        this.addRouteSql(path, sql, queryParams, false, postprocess);
    }
    readFile(relPath, textEncoding = null) {
        const path = __dirname + "/" + relPath;
        if (!fs.existsSync(path))
            throw new exports.Api.RouteError("Not found");
        return new Promise((resolve, reject) => {
            if (textEncoding) {
                fs.readFile(path, { encoding: textEncoding }, (err, data) => {
                    if (err)
                        reject(err);
                    resolve(data);
                });
            }
            else {
                fs.readFile(path, (err, data) => {
                    if (err)
                        reject(err);
                    resolve(data);
                });
            }
        });
    }
    addRouteSql(path, sql, queryParams, first, postprocess) {
        this.addRoute("GET", path, "json", async (q) => {
            const params = [];
            for (const paramKey of queryParams) {
                if (typeof paramKey == "string") {
                    const v = q[paramKey];
                    if (!v)
                        throw new RouteError(`param "${paramKey}" is undefined`);
                    params.push(typeof v == "object" ? v[0] : v);
                }
                else {
                    const v = q[paramKey[0]] || paramKey[1];
                    params.push(typeof v == "object" ? v[0] : v);
                }
            }
            let res;
            if (first)
                res = await exports.Api.db.first(sql, params);
            else
                res = await exports.Api.db.all(sql, params);
            if (res === undefined)
                throw new RouteError(`Not Found`);
            if (postprocess)
                res = await postprocess(res);
            return res;
        }, true);
    }
    checkRoute(route, path, params) {
        if (route.path != path)
            return false;
        for (const param of route.reqParams) {
            if (!Object.prototype.hasOwnProperty.call(params, param))
                return false;
        }
        return true;
    }
    readBodyJSON(req) {
        if (req.headers["content-type"] !== "application/json")
            throw new exports.Api.RouteError("Request content-type is not application/json");
        return new Promise((resolve, reject) => {
            let body = '';
            req.on("error", e => reject(e));
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
}
class RouteError extends Error {
}
;
const RouteTypes = {
    "json": "application/json",
    "png": "image/png",
    "html": "text/html; charset=utf-8",
};
const Methods = ["GET", "POST", "OPTIONS"];
exports.Api = new API();
