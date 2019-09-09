import mongoose from 'mongoose';
import crypto from 'crypto';

export const UserRole = {
    OPERATOR: 'operator',
    ADMIN: 'admin'
}

export const getRole = (role) => {
    switch (role) {
        case 'operator':
            return UserRole.OPERATOR;
        case 'admin':
            return UserRole.ADMIN;
        default:
            throw Error('invalid');
    }
}

const usersSchema = mongoose.Schema({
    'name': {type: String, required: true},
    'email': {type: String, required: true},
    'password': {type: String, required: true},
    'salt': {type: String},
    'role': {
        type: String,
        enum: [UserRole.OPERATOR, UserRole.ADMIN],
        default: UserRole.OPERATOR,
        required: true
    }
});

const makeSalt = async () => {
    return await crypto.randomBytes(16).toString('base64');
}

const hashPassword = async (password, currSalt) => {
    console.log(currSalt);
    const salt = Buffer.from(currSalt, 'base64');
    return await crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

}

usersSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await makeSalt();
        this.salt = salt;
        this.password = await hashPassword(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

usersSchema.methods.validatePassword = async function validatePassword(data) {
    const salt = Buffer.from(currSalt, 'base64');
    return await crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

};

export default mongoose.model('Users', usersSchema);