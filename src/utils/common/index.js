import bcrypt from 'bcrypt';

export const comparePassword = (clientPassword, systemPassword) => {
    return bcrypt.compare(clientPassword, systemPassword);
};