import { default as User, UserRole, getRole } from '../models/users.mjs';

export const checkPassword = (pw) => {
    if (!pw) throw new Error('No password specified');
    if (pw.toString().length < 8) throw new Error('Password too short');
    return true;
}

export const checkRole = (role) => {
    if (!role) throw new Error('No role specified');
    // if (role !== UserRole.)
}

export const getUsers = () => {
    return "cool";
}

export const makeUser = (name, email, password, role) => {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = getRole(role); //Note: will throw error if role doesn't exist

    
    // UsersModel.s
}