"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// 0. トップページ
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// 1. 小説管理システム
let novelList = [
    { id: 1, title: "十角館の殺人", author: "綾辻行人", detective: "島田潔", comment: "衝撃の結末！" },
    { id: 2, title: "容疑者Xの献身", author: "東野圭吾", detective: "湯川学", comment: "泣けるミステリー" },
    { id: 3, title: "オリエント急行の殺人", author: "クリスティ", detective: "ポアロ", comment: "名作中の名作" },
    { id: 4, title: "点と線", author: "松本清張", detective: "鳥飼久蔵", comment: "時刻表トリックの元祖" },
    { id: 5, title: "シャーロック・ホームズの冒険", author: "ドイル", detective: "ホームズ", comment: "世界一有名な探偵" },
    { id: 6, title: "全てがFになる", author: "森博嗣", detective: "犀川・西之園", comment: "理系ミステリの最高峰" }
];

app.get("/novels", (req, res) => {
    res.render('novel_list', { data: novelList });
});
app.get("/novels/create", (req, res) => {
    res.redirect('/public/novel_create.html'); 
});
app.post("/novels", (req, res) => {
    const newId = novelList.length + 1;
    novelList.push({ id: newId, title: req.body.title, author: req.body.author, detective: req.body.detective, comment: req.body.comment });
    res.redirect('/novels');
});
app.get("/novels/:id", (req, res) => {
    const index = req.params.id;
    if (isNaN(index)) return res.next();
    const item = novelList[index];
    if (item) res.render('novel_detail', { data: item, id: index });
});
app.get("/novels/delete/:id", (req, res) => {
    const index = req.params.id;
    if (novelList[index]) novelList.splice(index, 1);
    res.redirect('/novels');
});
app.get("/novels/edit/:id", (req, res) => {
    const index = req.params.id;
    if (novelList[index]) res.render('novel_edit', { data: novelList[index], id: index });
});
app.post("/novels/update/:id", (req, res) => {
    const index = req.params.id;
    if (novelList[index]) {
        novelList[index].title = req.body.title;
        novelList[index].author = req.body.author;
        novelList[index].detective = req.body.detective;
        novelList[index].comment = req.body.comment;
    }
    res.redirect('/novels');
});

// 2. 映画レビューシステム
let movieList = [
    { id: 1, title: "タイタニック", year: 1997, rating: 5, review: "不朽の名作" },
    { id: 2, title: "トップガン マーヴェリック", year: 2022, rating: 5, review: "映画館で観るべき" },
    { id: 3, title: "ショーシャンクの空に", year: 1994, rating: 5, review: "希望を感じる物語" },
    { id: 4, title: "千と千尋の神隠し", year: 2001, rating: 4, review: "世界観が素晴らしい" },
    { id: 5, title: "インセプション", year: 2010, rating: 4, review: "設定が複雑で面白い" },
    { id: 6, title: "マッドマックス 怒りのデス・ロード", year: 2015, rating: 5, review: "ノンストップアクション" }
];

app.get("/movies", (req, res) => {
    res.render('movie_list', { data: movieList });
});
app.get("/movies/create", (req, res) => {
    res.redirect('/public/movie_create.html');
});
app.post("/movies", (req, res) => {
    const newId = movieList.length + 1;
    movieList.push({ id: newId, title: req.body.title, year: req.body.year, rating: req.body.rating, review: req.body.review });
    res.redirect('/movies');
});
app.get("/movies/:id", (req, res) => {
    const index = req.params.id;
    if (isNaN(index)) return res.next();
    const item = movieList[index];
    if (item) res.render('movie_detail', { data: item, id: index });
});
app.get("/movies/delete/:id", (req, res) => {
    const index = req.params.id;
    if (movieList[index]) movieList.splice(index, 1);
    res.redirect('/movies');
});
app.get("/movies/edit/:id", (req, res) => {
    const index = req.params.id;
    if (movieList[index]) res.render('movie_edit', { data: movieList[index], id: index });
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

// 3. 筋トレ記録システム
let workoutList = [
    { id: 1, menu: "ベンチプレス", weight: 60, reps: 10, date: "2025-01-20" },
    { id: 2, menu: "スクワット", weight: 80, reps: 8, date: "2025-01-22" },
    { id: 3, menu: "チンニング", weight: 0, reps: 15, date: "2025-01-23" },
    { id: 4, menu: "デッドリフト", weight: 100, reps: 5, date: "2025-01-25" },
    { id: 5, menu: "ショルダープレス", weight: 40, reps: 12, date: "2025-01-26" },
    { id: 6, menu: "レッグプレス", weight: 120, reps: 10, date: "2025-01-28" }
];

app.get("/training", (req, res) => {
    res.render('training_list', { data: workoutList });
});
app.get("/training/create", (req, res) => {
    res.redirect('/public/training_create.html');
});
app.post("/training", (req, res) => {
    const newId = workoutList.length + 1;
    workoutList.push({ id: newId, menu: req.body.menu, weight: req.body.weight, reps: req.body.reps, date: req.body.date });
    res.redirect('/training');
});
app.get("/training/:id", (req, res) => {
    const index = req.params.id;
    if (isNaN(index)) return res.next();
    const item = workoutList[index];
    if (item) res.render('training_detail', { data: item, id: index });
});
app.get("/training/delete/:id", (req, res) => {
    const index = req.params.id;
    if (workoutList[index]) workoutList.splice(index, 1);
    res.redirect('/training');
});
app.get("/training/edit/:id", (req, res) => {
    const index = req.params.id;
    if (workoutList[index]) res.render('training_edit', { data: workoutList[index], id: index });
});
app.post("/training/update/:id", (req, res) => {
    const index = req.params.id;
    if (workoutList[index]) {
        workoutList[index].menu = req.body.menu;
        workoutList[index].weight = req.body.weight;
        workoutList[index].reps = req.body.reps;
        workoutList[index].date = req.body.date;
    }
    res.redirect('/training');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));