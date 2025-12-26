"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let novelList = [
    { id: 1, title: "十角館の殺人", author: "綾辻行人", detective: "島田潔", comment: "衝撃の結末！" },
    { id: 2, title: "容疑者Xの献身", author: "東野圭吾", detective: "湯川学", comment: "泣けるミステリー" },
    { id: 3, title: "オリエント急行の殺人", author: "クリスティ", detective: "ポアロ", comment: "名作中の名作" }
];

app.get("/novels", (req, res) => {
    res.render('novel_list', { data: novelList });
});

app.get("/novels/create", (req, res) => {
    res.render('novel_create');
});

app.post("/novels", (req, res) => {
    const newId = novelList.length + 1;
    const newNovel = {
        id: newId,
        title: req.body.title,
        author: req.body.author,
        detective: req.body.detective,
        comment: req.body.comment
    };
    novelList.push(newNovel);
    res.redirect('/novels');
});

app.get("/novels/:id", (req, res) => {
    const index = req.params.id;
    if (isNaN(index)) return res.next(); 

    const item = novelList[index];
    if (item) {
        res.render('novel_detail', { data: item, id: index });
    } else {
        res.send("その小説は見つかりません");
    }
});

app.get("/novels/delete/:id", (req, res) => {
    const index = req.params.id;
    if (novelList[index]) {
        novelList.splice(index, 1);
    }
    res.redirect('/novels');
});

app.get("/novels/edit/:id", (req, res) => {
    const index = req.params.id;
    const item = novelList[index];
    if (item) {
        res.render('novel_edit', { data: item, id: index });
    } else {
        res.redirect('/novels');
    }
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

app.listen(8080, () => console.log("Server is running on port 8080"));