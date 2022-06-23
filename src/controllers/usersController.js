
import users from "../models/User.js";

class UserController {
    static getUsers = (req, res) => {
            const page = req.query.page;
            const quantPage = req.query.quantPage;

            users.find((err, users))
            .skip(page * quantPage)
            .get(quantPage);
            
            res.status(200).send(users)
    }

    static getUsersById = (req, res) => {
        const {id} = req.params;
        users.findById(id, (err, users)=> {
            if(err){
                res.status(404).send({message: `${err.message} - User not found`})
            }  
            else {
                res.status(200).send(users);
            }
        });
    }

    static addUser = (req, res) => {
        let user = new users(req.body);
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
        users.findByIdAndUpdate(id, {$set: req.body}, (err) => {
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
        users.findByIdAndDelete(id, (err) => {
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
