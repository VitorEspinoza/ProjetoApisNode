import express from "express";
import tasks from "./tasksRouts.js";
import users from "./usersRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send()
    })

    app.use(
        express.json(),
        users,
        tasks
    )
}

export default routes