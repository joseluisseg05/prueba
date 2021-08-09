const Sequelize = require('sequelize');
const db = require('../config/db');
const User = require('../models/user')

const Holder = db.define('holder', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
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
    }, 
    age: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La edad es un campo requerido'
            }
        },
    }
})

Holder.belongsTo(User)

module.exports = Holder;
