const express = require('express')
const route = express.Router()
const userController = require('../controller/user')
const todoController = require('../controller/todo')
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

//user registration 
route.post('/register', userController.userRegister)
route.get('/login', userController.userLogin)


//new admin 
route.post('/add-admin', userController.createAdmin)

//profile  manages by admin only 
route.get('/getUser', authMiddleware, roleMiddleware(['admin']), userController.getUser)
route.get('/updateUser', authMiddleware, roleMiddleware(['admin']), userController.updateUser)
route.get('/getAllUser', authMiddleware, roleMiddleware(['admin']), userController.allUser)

//todo crud operation
route.post('/createTodo', authMiddleware, todoController.creteTodo)
route.post('/getTodo', authMiddleware, todoController.getTodo)
route.post('/updateTodo/:id', authMiddleware, todoController.updateTodo)
route.post('/deleteTodo/:id', authMiddleware, todoController.deleteTodo)


module.exports = route