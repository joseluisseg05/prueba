const Sequelize = require('sequelize');

const Holder = require('../models/holder')
const db = require('../config/db');

const Cuenta = db.define('cuenta', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad: {
        type: Sequelize.DECIMAL(20, 2),
        defaultValue: 0.0
    }
})

Cuenta.belongsTo(Holder)

module.exports = Cuenta;
