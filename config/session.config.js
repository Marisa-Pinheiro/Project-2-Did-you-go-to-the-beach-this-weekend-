// Session configurations 

// require express session 
const session = require('express-session');

const MongoStore = require('connect-mongo');

const mongoose = require('mongoose');

module.exports = app =>{

    // Security Mediator
    // Deploy  
    app.set('trust proxy', 1);

    app.use(
        session({
            secret: process.env.SESS_SECRET,
            resave: true, 
            saveUninitialized:  false,
            cookie: {
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // ternary operators --> make conditions
                secure: process.env.NODE_ENV === 'production', // https instead http
                httpOnly: true, 
                maxAge: 600000, // 600 * 1000ms  === 10 min
            }, 
            store: MongoStore.create({
                mongoUrl:`mongodb+srv://Marisa-Pinheiro:${process.env.MONGODB_PASSWORD}@did-you-go-to-the-beach.04xylms.mongodb.net/?retryWrites=true&w=majority`
            })
        })
    )
}
