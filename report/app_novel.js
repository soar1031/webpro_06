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


app.listen(8080, () => console.log("Server is running on port 8080"));
