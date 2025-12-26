"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let workoutList = [
    { id: 1, menu: "ベンチプレス", weight: 60, reps: 10, date: "2025-01-20" },
    { id: 2, menu: "スクワット", weight: 80, reps: 8, date: "2025-01-22" },
    { id: 3, menu: "チンニング", weight: 0, reps: 15, date: "2025-01-23" }
];

app.get("/training", (req, res) => {
    res.render('training_list', { data: workoutList });
});

app.listen(8080, () => console.log("Muscle App listening on port 8080!"));