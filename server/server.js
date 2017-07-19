
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const config = require('./secrets.js');
const characters_controller = require('./controllers/characters_controller');
const cookieParser = require('cookie-parser');

const app = module.exports = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: config.sessionSecret,
    saveUninitialized: true,
    resave: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// app.use(express.static(__dirname + '/../build'));

massive(config.connectionString).then((dbInstance) => {
    app.set('db', dbInstance);
    
    passport.use(new Auth0Strategy({
        domain: config.domain,
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: 'http://localhost:3000/auth/callback'
    }, function (accessToken, refreshToken, extraParams, profile, done) {
        
        dbInstance.getUserByAuthId([profile.identities[0].user_id]).then((user) => {
            if (user[0]) {
                return done(null, user[0]);
            } else {
                dbInstance.create_user(profile.identities[0].user_id, profile.displayName).then((err, user) => {
                    dbInstance.getUserByAuthId(profile.identities[0].user_id).then((cake) => {
                        return done(null, cake[0]);
                    }).catch(err=>console.log(err));
                })
            }
        })
    }));

    app.get('/auth', passport.authenticate('auth0'));

    app.get('/auth/callback', passport.authenticate('auth0', {
        successRedirect: 'http://localhost:3001/#myteam',
        failureRedirect: '/'
    }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    const userCtrl = require('./controllers/users_controller')
    app.get('/api/myteam', userCtrl.me)
    
    app.get('/api/user', function(req,res) {
        res.status(200).send(req.user)
    })

    app.get('/api/characters', characters_controller.getAllCharacters);
    app.get('/api/characters/:id', characters_controller.getOneCharacter);

    app.get('/auth/logout', function (req, res) {
        req.logout();
        res.redirect('http://localhost:3001/');
    })
})

const port = 3000;
//this is the port that the site comes out in
app.listen(port, () => { console.log(`Server listening on port ${port}.`); });