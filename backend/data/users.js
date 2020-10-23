import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },

    {
        name: 'Aman Amanow',
        email: 'aman@example.com',
        password: bcrypt.hashSync('123456', 10),
    },

    {
        name: 'Selbi Amanova',
        email: 'selbi@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
];

export default users;