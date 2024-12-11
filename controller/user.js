
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const userRegister = async function (req, res) {
    const { email, phone, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        return res.status(400).send("password do not match ")
    }
    try {
        const user = new User({ email, phone, password, role: 'user' })
        await user.save()
        return res.status(201).send("user created successfully")
    }
    catch (e) {
        return res.status(500).send("error creating user", e)
    }

}
const userLogin = async function (req, res) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send("invalid creadentials")
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).send(token)
    }
    catch (e) {
        return res.status(500).send("error logging user", e)
    }

}
// new admin
const createAdmin = async function (req, res) {
    const { email, phone, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        return res.status(400).send("password do not match ")
    }
    try {
        const adminExists = await User.findOne({ email })
        if (adminExists) {
            return res.status(400).send('admin user already exists')
        }
        const admin = new User({ email, phone, password, role: 'admin' })
        await admin.save()
        return res.status(201).send("admin created successfully")
    }
    catch (e) {
        return res.status(500).send("error creating user", e)
    }

}

// profile  
const getUser = async function (req, res) {
    try {
        const user = await User.findById(req.user.id)
        return res.status(200).send(user)
    }
    catch (e) {
        return res.status(500).send("error", e)
    }

}
const updateUser = async function (req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true })
        return res.status(200).send(user)
    }
    catch (e) {
        return res.status(500).send("error logging user", e)
    }

}

//fetch all user 

const allUser = async function (req, res) {
    try {
        const users = await User.find()
        return res.status(200).send(users)
    }
    catch (e) {
        return res.status(500).send("error", e)
    }

}


module.exports = {
    userLogin,
    userRegister,
    getUser,
    updateUser,
    allUser,
    createAdmin
}