const Sequelize = require('sequelize');
const db = require('../config/db');
const User = require('../models/user')

const Admin = db.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre es un campo requerido'
            }
        },
    },
    lastName: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El apellido es un campo requerido'
            }
        },
    }
})

Admin.belongsTo(User)

module.exports = Admin;
