const UserService = require('../services/userServices');
const jwt = require('jsonwebtoken');
const { key } = require('../secretKey.js');

class UserController{
    static async getAllUsers(req, res) {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
    
        try {
            const result = await UserService.getAllUsers(limit, (page - 1) * limit);
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

static async getUserById(req, res) {
        const { id } = req.params;

        try {
            const result = await UserService.getUserById(id);
            if (result.rows.length > 0) {
                res.status(200).json(result.rows);
            } else {
                res.status(404).json({ message: "User not found!" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

static async register(req, res) {
        const { id, email, gender, password, role } = req.body;
    
        const getEmail = await UserService.getUserByEmail(email);
        if (getEmail.rows.length > 0) {
            res.status(400).json({ message: "Email already registered!" });
            return;
        }
    

        const result = await UserService.register({ id, email, gender, password, role });
    
        res.status(200).json({ message: "Successfully registered!" });
    }


static async update(req, res) {
    const { id } = req.params;
    const { email, gender, password, role } = req.body;

    const findById = await UserService.getUserById(id);
    if (findById.rows.length === 0) {
        res.status(404).json({ message: "User not found!" });
        return;
    }


    const result = await UserService.update(id, { email, gender, password, role });

    res.status(200).json({ message: "Successfully updated user!" });
}

static async delete(req, res) {
    const { id } = req.params;

    const findById = await UserService.getUserById(id);
    if (findById.rows.length === 0) {
        res.status(404).json({ message: "User not found!" });
        return;
    }

    const result = await UserService.delete(id);

    res.status(200).json({ message: "Successfully deleted user!" });
}

static async login(req, res) {
    try {
        const { email, password } = req.body;
        const getEmail = await UserService.getUserByEmail(email);
        if (getEmail.rows.length > 0) {
            if (password === getEmail.rows[0].password) { // Perbandingan kata sandi tanpa hash
                const user = {
                    id: getEmail.rows[0].id,
                    email: getEmail.rows[0].email,
                    role: getEmail.rows[0].role
                }
                const token = jwt.sign(user, key, { expiresIn: "1h" });
                res.status(200).json({ ...user, token });
            } else {
                res.status(401).json({ message: "Wrong password!" });
            }
        } else {
            res.status(401).json({ message: "Email not registered!" });
        }
    } catch (error) {
        throw new Error(error.message);
    }
}



}

module.exports = UserController;

