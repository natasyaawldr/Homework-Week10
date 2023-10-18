const UserRepository = require('../repositories/usersRepositories');

class UserService {
    static getAllUsers(limit, page) {
        return UserRepository.get(limit, page);
    }

    static getUserById(id) {
        return UserRepository.getById(id);
    }

    static getUserByEmail(email) {
        return UserRepository.getByEmail(email);
    }

    static register(userData) {
        return UserRepository.post(userData);
    }

    static update(id, userData) {
        return UserRepository.put(id, userData);
    }

    static delete(id) {
        return UserRepository.delete(id);
    }
}

module.exports = UserService;