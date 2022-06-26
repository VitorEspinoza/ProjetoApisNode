import Tasks from "../models/Task.js";

class TaskController {
    static getTasks = (req, res) => {
        const page = req.query.page || 1;
        const perPage = 2;
        Tasks.find()
            .skip((page * perPage) - perPage)
            .limit(perPage)
            .populate('user')
            .exec((err, tasks) => {
                Tasks.count().exec((err, count) => {
                    res.set({'Access-Control-Allow-Origin': '*'})
                    res.status(200).send({
                        tasks: tasks,
                        page: page,
                        pages: count / perPage,
                        totalRecords: count
                    })
                })       
            }) 
    }

    static getTasksById = (req, res) => {
        const { id } = req.params;
        res.set({'Access-Control-Allow-Origin': '*'})
        Tasks.findById(id)
            .populate('users', 'name')
            .exec((err, task) => {
                if(err) {
                    res.status(404).send({message: `${err.message} - Task no found`})
                } else {
                    res.status(200).send(task);
                }
            })
    }

    static addTask = (req, res) => {
        let task = new Tasks(req.body);
        task.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message} - failure to register task`})
            } else {
                res.status(201).send({message: 'Task successfully registered'})
            }
        })
    }

    static updateTask = (req, res) => {
        const {id} = req.params;
        Tasks.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(err) {
                res.status(404).send({message: `${err.message} - Task not found`})
            } else {
                res.status(200).send({message: 'Task successfully updated'})
            }
        })
    }

    static deleteTask = (req, res) => {
        const {id} = req.params;
        Tasks.findByIdAndDelete(id, (err) => {
            if(err) {
                res.status(404).send({message: `${err.message} - Task not found`})
            } else {
                res.status(204).send({message: 'Task successfully removed'})
            }
        })
    }
    
}

export default TaskController