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
    res.render('movie_list', { data: movieList });
});

app.get("/movies/create", (req, res) => {
    res.render('movie_create');
});

app.post("/movies", (req, res) => {
    const newId = movieList.length + 1;
    const newMovie = {
        id: newId,
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating,
        review: req.body.review
    };
    movieList.push(newMovie);
    res.redirect('/movies');
});

app.get("/movies/:id", (req, res) => {
    const index = req.params.id;
    if (isNaN(index)) return res.next();

    const item = movieList[index];
    if (item) {
        res.render('movie_detail', { data: item, id: index });
    } else {
        res.send("データが見つかりません");
    }
});

app.get("/movies/delete/:id", (req, res) => {
    const index = req.params.id;
    if (movieList[index]) {
        movieList.splice(index, 1);
    }
    res.redirect('/movies');
});

app.get("/movies/edit/:id", (req, res) => {
    const index = req.params.id;
    const item = movieList[index];
    if (item) {
        res.render('movie_edit', { data: item, id: index });
    } else {
        res.redirect('/movies');
    }
});

app.post("/movies/update/:id", (req, res) => {
    const index = req.params.id;
    if (movieList[index]) {
        movieList[index].title = req.body.title;
        movieList[index].year = req.body.year;
        movieList[index].rating = req.body.rating;
        movieList[index].review = req.body.review;
    }
    res.redirect('/movies');
});

app.listen(8080, () => console.log("Movie App listening on port 8080!"));