
const Todo = require('../models/Todo')

const creteTodo = async function (req, res) {

    try {
        const todo = new Todo({ ...req.body, userId: req.user.id })
        await todo.save()
        return res.status(201).send(todo)
    }
    catch (e) {
        return res.status(500).send("error", e)
    }

}
const getTodo = async function (req, res) {
    try {
        const todos = await Todo.find({ userId: req.user.id })
        return res.status(200).send(todos)
    }
    catch (e) {
        return res.status(500).send("error", e)
    }

}

const updateTodo = async function (req, res) {
    try {
        const todo = await Todo.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id,
            },
            req.body,
            { new: true }
        )
        return res.status(200).send(todo)
    }
    catch (e) {
        return res.status(500).send("error", e)
    }

}
const deleteTodo = async function (req, res) {
    try {
        await Todo.findOneAndDelete(
            {
                _id: req.params.id,
                userId: req.user.id,
            }
        )
        return res.status(200).send("Todo deleted ")
    }
    catch (e) {
        return res.status(500).send("error", e)
    }

}



module.exports = {
    creteTodo,
    getTodo,
    updateTodo,
    deleteTodo
}