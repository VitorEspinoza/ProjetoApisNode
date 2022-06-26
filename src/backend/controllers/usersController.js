
import Users from "../models/User.js";

class UserController {
    static getUsers = (req, res) => {
            const page = req.query.page || 1;
            const perPage = 2;
            Users.find()
            .skip((page * perPage) - perPage)
            .limit(perPage).exec(function(err, users) {
                Users.count().exec(function(err, count) {
                    res.set({'Access-Control-Allow-Origin': '*'})
                    res.status(200).send({
                        users: users,
                        page: page,
                        pages: count / perPage,
                        totalRecords: count
                    })
                })
            })

    }

    static getUsersById = (req, res) => {
        const {id} = req.params;
        res.set({'Access-Control-Allow-Origin': '*'})
        Users.findById(id, (err, users)=> {
            if(err){
                res.status(404).send({message: `${err.message} - User not found`})
            }  
            else {
                res.status(200).send(users);
            }
        });
    }

    static addUser = (req, res) => {
        let user = new Users(req.body);
        user.save((err) => {
            if(err)
            {
                res.status(500).send({message : `${err.message} - failure to register user`})
            } else {
                res.status(201).send({message: 'Usuário Registrado com sucesso'});
            }
        });
    }

    static updateUser = (req, res) => {
        const {id} = req.params;
        Users.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(err)
            {
                res.status(404).send({message: `${err.message} - User not found`})
            }
            else {
                res.status(200).send({message: 'User successfully updated'})
            }
        })
    }

    static deleteUser = (req, res) => {
        const {id} = req.params;
        Users.findByIdAndDelete(id, (err) => {
            if (err) {
                res.status(500).send({message: `${err.message} - User not found`})
            } 
            else {
                res.status(204).send({message: 'User successfully removed'})
            }
        })
    }
}

export default UserController
