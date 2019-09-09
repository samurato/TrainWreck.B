import { default as User, UserRole, getRole } from '../models/users.mjs';

export const checkPassword = (pw) => {
    if (!pw) throw new Error('No password specified');
    if (pw.toString().length < 8) throw new Error('Password too short');
    return true;
}

export const checkRole = (role) => {
    if (!role) throw new Error('No role specified');
    console.log('hello');
    console.log(typeof role, typeof UserRole.OPERATOR);
    console.log('check', role === UserRole.OPERATOR);
    console.log(!(role === UserRole.OPERATOR || role === UserRole.ADMIN));
    if (!(role === UserRole.OPERATOR || role === UserRole.ADMIN))
        throw new Error('Invalid role specified');
    return true;
}

export const createUser = (name, email, password, role) => {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = getRole(role); //Note: will throw error if role doesn't exist
    user.save((err) => {
        if (err) {
            console.log('failed to save user', err)
            throw new Error('Failed to save user to the database', err);
        }
    });
}

export const getUsers = () => {
    User.find({}, (err, users) => {
        if (!!err) {
            console.log('failed to get users list', err)
            throw new Error('Failed to get users list', err);
        }
        return users;
    })
}