const pool = require ('../models/queries');

class User {
    static async queryDatabase(query, values) {
        try {
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            throw Error(error.message);
        }
    }

    static async get(limit, page) {
        const query = 'SELECT * FROM users LIMIT $1 OFFSET $2';
        const values = [limit, page];
        return User.queryDatabase(query, values);
    }

    static async getById(id) {
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [id];
        return User.queryDatabase(query, values);
    }

    static async getByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        return User.queryDatabase(query, values);
    }

    static async post(userData) {
        const data = [userData.id, userData.email, userData.gender, userData.password, userData.role];
        const query = 'INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)';
        return User.queryDatabase(query, data);
    }

    static async put(id, userData) {
        const data = [userData.email, userData.gender, userData.hashPassword, userData.role, id];
        const query = 'UPDATE users SET email = $1, gender = $2, password = $3, role = $4 WHERE id = $5';
        return User.queryDatabase(query, data);
    }

    static async delete(id) {
        const query = 'DELETE FROM users WHERE id = $1';
        const values = [id];
        return User.queryDatabase(query, values);
    }
}

module.exports = User;
