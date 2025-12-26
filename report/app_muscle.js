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

app.get("/training/create", (req, res) => {
    res.render('training_create');
});

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

app.get("/training/:id", (req, res) => {
    const index = req.params.id;
    if (isNaN(index)) return res.next();

    const item = workoutList[index];
    if (item) {
        res.render('training_detail', { data: item, id: index });
    } else {
        res.send("データが見つかりません");
    }
});

app.get("/training/edit/:id", (req, res) => {
    const index = req.params.id;
    const item = workoutList[index];
    if (item) {
        res.render('training_edit', { data: item, id: index });
    } else {
        res.redirect('/training');
    }
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

app.listen(8080, () => console.log("Muscle App listening on port 8080!"));