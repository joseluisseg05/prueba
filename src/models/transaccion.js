const Sequelize = require('sequelize');
const db = require('../config/db');

const Transaccion = db.define('transaccion', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    monto: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El monto es requerido'
            }
        },
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    idUser : {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    idCuenta: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Transaccion;