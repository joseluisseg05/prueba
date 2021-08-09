const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const db = require('../config/db');

const Users = db.define('user', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            isEmail: { 
                msg: 'Agrega un correo valido'
            }
        },
        unique: {
            args: true,
            msg: 'ESte correo ya esta registrado'
        },
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no debe de ir vacio'
            }
        }
    },
    activo: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }, 
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false 
    }
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = Users.prototype.hashPassword(usuario.password);
        }
    }
});

Users.prototype.validarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}
Users.prototype.hashPassword= function(password) {
    return  bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

module.exports = Users;