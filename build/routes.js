"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
api_1.Api.addRouteJSON("/", async (q) => {
    return {
        "?lang=en": "Use 'en' lang",
        "?lang=ru": "Use 'ru' lang",
        "image?id": "PNG image",
        "texts?lang": "JSON with texts",
        "/persons": [{ id: "number", name: "string", descriptionShort: "string", imageId: "string", telegram: "string", github: "string", description: "string", technologies: "string[]" }],
        "/places": [{ person: "string", places: [{ address: "string", coods: ["number", "number"] }] }],
        "/projects": [{ id: "number", title: "string", date: "string", imageId: "string | null", link: "string", description: "string", type: "string", authors: "string[]", technologies: "string[]", }],
        "/feedbacks": [{ id: "string", author: "string", email: "string", text: "string" }],
        "POST /feedback": { author: "string", email: "string", text: "string" },
        "/feedbacks/list": "Page with feedbacks list",
        "/feedbacks/form": "Page with send feedback form",
        "/comments": [{ id: "string", author: "string", email: "string", text: "string" }],
        "POST /comment": { author: "string", email: "string", text: "string" },
        "/comments/list": "Page with comments list",
        "/comments/form": "Page with send comment form",
    };
}, true);
api_1.Api.addRouteSqlAll("/persons", `select p.id,
		(select text
			from Text as t
			inner join TextType as tt on t.typeId = tt.id and tt.name = 'personName'
			inner join Lang as l on t.langId = l.id and l.name = $1
			where t.objId = p.id) as name,
		(select text
			from Text as t
			inner join TextType as tt on t.typeId = tt.id and tt.name = 'personDescriptionShort'
			inner join Lang as l on t.langId = l.id and l.name = $1
			where t.objId = p.id) as descriptionShort,
		imageId,
		telegram,
		github,
		(select text
			from Text as t
			inner join TextType as tt on t.typeId = tt.id and tt.name = 'personDescription'
			inner join Lang as l on t.langId = l.id and l.name = $1
			where t.objId = p.id) as description,
		(select json_group_array(t.name)
			from Person_Technology as t
			inner join Technology as t
			on t.id = t.technologyId
			where t.personId = p.id) as technology
	from Person as p
	order by p.id
`, [["lang", "ru"]], rows => rows.map(row => ({
    ...row,
    technology: JSON.parse(row.technology),
})));
api_1.Api.addRouteSqlAll("/places", `select (select text
		from Text as t
		inner join TextType as tt on t.typeId = tt.id and l.name = $1
		inner join Lang as l on t.langId = l.id and tt.name = 'personName'
		where t.objId = p.personId) as person,
		json_group_array(
			(json_object('address',
				(select text
				from Text as t
				inner join TextType as tt on t.typeId = tt.id and l.name = $1
				inner join Lang as l on t.langId = l.id and tt.name = 'address'
				where t.objId = p.id),
			'coords', coords))) as places
	from Place as p
	group By person
	order by p.id
`, [["lang", "ru"]], rows => rows.map(row => ({
    ...row,
    places: JSON.parse(row.places).map((place) => ({
        ...place,
        coords: place.coords.split(";").map(parseFloat),
    })),
})));
api_1.Api.addRouteSqlAll("/projects", `select id,
		(select text
			from Text as t
			inner join TextType as tt on t.typeId = tt.id and tt.name = 'projectName'
			inner join Lang as l on t.langId = l.id and l.name = $1
			where t.objId = p.id) as title,
		date, image as imageId, link,
		(select text
			from Text as t
			inner join TextType as tt on t.typeId = tt.id and tt.name = 'projectDescription'
			inner join Lang as l on t.langId = l.id and l.name = $1
			where t.objId = p.id) as description,
		(select text
			from Text as t
			inner join TextType as tt on t.typeId = tt.id and tt.name = 'projectType'
			inner join Lang as l on t.langId = l.id and l.name = $1
			where t.objId = p.typeId) as type,
		(select json_group_array(text)
			from Text as t
			inner join TextType as tt on t.typeId = tt.id and tt.name = 'personName'
			inner join Lang as l on t.langId = l.id and l.name = $1
			inner join Project_Person as pp on pp.personId = t.objId and pp.projectId = p.id) as authors,
		(select json_group_array(name)
			from Project_Technology as pt
			inner join Technology as t on pt.technologyId = t.id
			where projectId = p.id) as technologies
	from Project as p
`, [["lang", "ru"]], rows => rows.map(row => ({
    ...row,
    authors: JSON.parse(row.authors),
    technologies: JSON.parse(row.technologies),
})));
api_1.Api.addRoute("GET", "/image?id", "png", async function (q) {
    const id = parseParam(q.id, "id");
    if (id == "")
        throw new api_1.Api.RouteError(`param "id" is undefined`);
    if (id.indexOf("/") >= 0)
        throw new api_1.Api.RouteError(`bad param "id"`);
    this.resHeaders["Content-Disposition"] = `inline; filename="${id}"`;
    this.resHeaders["Cache-Control"] = `public, max-age=${360 * 24 * 60 * 60 * 1000}`;
    return await api_1.Api.readFile(`../data/imgs/${id}`, null);
});
const Langs = ["ru", "en"];
api_1.Api.addRoute("GET", "/texts", "json", async (q) => {
    let lang = parseParam(q.lang, "lang", Langs[0]);
    if (Langs.indexOf(lang) < 0)
        lang = Langs[0];
    return await api_1.Api.readFile(`../data/texts/${lang}.json`, "utf8");
});
api_1.Api.addRoute("GET", "/comments/form", "html", () => api_1.Api.readFile(`../data/pages/comments_form.html`, "utf8"));
api_1.Api.addRoute("GET", "/comments/list", "html", () => api_1.Api.readFile(`../data/pages/comments.html`, "utf8"));
api_1.Api.addRoute("GET", "/feedbacks/form", "html", () => api_1.Api.readFile(`../data/pages/feedbacks_form.html`, "utf8"));
api_1.Api.addRoute("GET", "/feedbacks/list", "html", () => api_1.Api.readFile(`../data/pages/feedbacks.html`, "utf8"));
api_1.Api.addRouteSqlAll("/comments", `select id, author, rate, text from Comment order by id desc`, []);
api_1.Api.addRouteSqlAll("/feedbacks", `select id, author, email, text from FeedBack order by id desc`, []);
api_1.Api.addRoute("POST", "/comment", "json", async function () {
    const data = await this.readBodyJSON();
    const author = parseParam(data.author, "author");
    const rate = parseParam(data.rate, "rate");
    const text = parseParam(data.text, "text");
    api_1.Api.db.commit(`insert into Comment (author, rate, text)
		values (?, ?, ?)`, [author, rate, text]);
}, true);
api_1.Api.addRoute("POST", "/feedback", "json", async function () {
    const data = await this.readBodyJSON();
    const author = parseParam(data.author, "author");
    const email = parseParam(data.email, "email");
    const text = parseParam(data.text, "text");
    api_1.Api.db.commit(`insert into FeedBack (author, email, text)
		values (?, ?, ?)`, [author, email, text]);
}, true);
function parseParam(param, paramName, defaultV) {
    if (param === undefined) {
        if (defaultV !== undefined)
            return defaultV;
        throw new api_1.Api.RouteError(`param "${paramName}" is undefined`);
    }
    if (param instanceof Array)
        param = param[0];
    if (typeof param == "string")
        param = param.trim();
    return param;
}
