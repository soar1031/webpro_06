"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// データ配列（変数名: workoutList）
let workoutList = [
    { id: 1, menu: "ベンチプレス", weight: 60, reps: 10, date: "2025-01-20" },
    { id: 2, menu: "スクワット", weight: 80, reps: 8, date: "2025-01-22" },
    { id: 3, menu: "チンニング", weight: 0, reps: 15, date: "2025-01-23" }
];

// 1. 一覧表示
app.get("/training", (req, res) => {
    res.render('training_list', { data: workoutList });
});

// 2. 新規登録画面
app.get("/training/create", (req, res) => {
    res.render('training_create');
});

// 3. 新規登録処理
app.post("/training", (req, res) => {
    const newId = workoutList.length + 1;
    const newWorkout = {
        id: newId,
        menu: req.body.menu,
        weight: req.body.weight,
        reps: req.body.reps,
        date: req.body.date
    };
    workoutList.push(newWorkout);
    res.redirect('/training');
});

// 4. 詳細表示（ここを追加！）
app.get("/training/:id", (req, res) => {
    const index = req.params.id;
    // 数値かどうかチェック
    if (isNaN(index)) return res.next();

    const item = workoutList[index];
    if (item) {
        res.render('training_detail', { data: item, id: index });
    } else {
        res.send("データが見つかりません");
    }
});

app.listen(8080, () => console.log("Muscle App listening on port 8080!"));