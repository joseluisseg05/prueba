const express = require('express');
const cors = require('cors');

const db = require('../config/db')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            admin : '/api/admin',
            holder: '/api/holder',
            auth    : '/api/auth'
        }
        this.connectDB();
        this.middleware();
        this.routes();
    }

    async connectDB(){
        db.sync()
            .then(() => console.log('Postgres Database Online '))
            .catch(error => console.log(error))
    }

    middleware(){
        var options = {
            origin: '*',
            optionsSuccessStatus: 200
        }
        this.app.use(cors(options));
        this.app.use( express.json());
    }

    routes(){
        this.app.use(this.paths.admin, require('../routers/admin'));
        this.app.use(this.paths.holder, require('../routers/holder'));
        this.app.use(this.paths.auth, require('../routers/auth'));
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Server Running On: ', this.port);
        });
    }
}

module.exports = Server;
