const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const request = require("request");
const db = require("../models");

module.exports = function(app) {
	app.get("/api/scrape"), function(req, res) {
		request("http://www.nintendolife.com/", function(err, res, html) {
			const $ = cheerio.load(html);
			$("li.item-article").each(function(i, element) {
				const results = {};
				const title = $(element).find("span.title").text();
				const link = $(element).find("a.title").attr("href");
				const description = $(element).find("p.text").text();

				results.title = title;
				results.link = link;
				results.description = description;

				db.Article.create(results)
				.then(function(dbArticle) {
					res.json(dbArticle);
				})
				.catch(function(err) {
					return res.json(err);
				})
			})
		})
	};

}