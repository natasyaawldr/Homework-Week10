const User = require('../models/userModels');

class UserRepository {
    static async delegateToUserMethod(method, ...args) {
        try {
            return await User[method](...args);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static get(limit, page) {
        return UserRepository.delegateToUserMethod('get', limit, page);
    }

    static getById(id) {
        return UserRepository.delegateToUserMethod('getById', id);
    }

    static getByEmail(email) {
        return UserRepository.delegateToUserMethod('getByEmail', email);
    }

    static post(userData) {
        return UserRepository.delegateToUserMethod('post', userData);
    }

    static put(id, userData) {
        return UserRepository.delegateToUserMethod('put', id, userData);
    }

    static delete(id) {
        return UserRepository.delegateToUserMethod('delete', id);
    }
}




module.exports = UserRepository;
