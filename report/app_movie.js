"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let movieList = [
    { id: 1, title: "トップガン マーヴェリック", year: 2022, rating: 5, review: "最高傑作！" },
    { id: 2, title: "ショーシャンクの空に", year: 1994, rating: 5, review: "希望を捨てないこと" },
    { id: 3, title: "タイタニック", year: 1997, rating: 4, review: "音楽が良い" }
];

app.get("/movies", (req, res) => {
    // 画面には 'data' という名前で movieList を渡す
    res.render('movie_list', { data: movieList });
});

app.listen(8080, () => console.log("Movie App listening on port 8080!"));